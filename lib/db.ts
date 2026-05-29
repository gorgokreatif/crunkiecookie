import { sql } from '@vercel/postgres';
import type { Cookie, SiteContent } from '../types';

// ─── Schema ────────────────────────────────────────────────────────────────

export async function ensureSchema() {
  await sql`
    CREATE TABLE IF NOT EXISTS cookies (
      id         TEXT PRIMARY KEY,
      name       TEXT NOT NULL,
      image      TEXT NOT NULL,
      category   TEXT[] NOT NULL DEFAULT '{}',
      price      TEXT NOT NULL DEFAULT '5,00 €',
      vegan      BOOLEAN NOT NULL DEFAULT false,
      de_desc    TEXT NOT NULL DEFAULT '',
      de_tags    TEXT[] NOT NULL DEFAULT '{}',
      de_mood    TEXT DEFAULT '',
      en_desc    TEXT NOT NULL DEFAULT '',
      en_tags    TEXT[] NOT NULL DEFAULT '{}',
      en_mood    TEXT DEFAULT '',
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS site_content (
      section TEXT NOT NULL,
      lang    TEXT NOT NULL,
      key     TEXT NOT NULL,
      value   TEXT NOT NULL DEFAULT '',
      PRIMARY KEY (section, lang, key)
    )
  `;
}

// ─── Cookies ───────────────────────────────────────────────────────────────

function rowToCookie(row: Record<string, unknown>): Cookie {
  return {
    id: row.id as string,
    name: row.name as string,
    image: row.image as string,
    category: row.category as string[],
    price: row.price as string,
    vegan: row.vegan as boolean,
    de: {
      desc: row.de_desc as string,
      tags: row.de_tags as string[],
      mood: (row.de_mood as string) || undefined,
    },
    en: {
      desc: row.en_desc as string,
      tags: row.en_tags as string[],
      mood: (row.en_mood as string) || undefined,
    },
  };
}

export async function getCookies(): Promise<Cookie[]> {
  const { rows } = await sql`SELECT * FROM cookies ORDER BY created_at`;
  return rows.map(rowToCookie);
}

export async function upsertCookie(cookie: Cookie): Promise<void> {
  await sql`
    INSERT INTO cookies (id, name, image, category, price, vegan,
      de_desc, de_tags, de_mood, en_desc, en_tags, en_mood)
    VALUES (
      ${cookie.id}, ${cookie.name}, ${cookie.image},
      ${cookie.category as unknown as string}, ${cookie.price}, ${cookie.vegan},
      ${cookie.de.desc}, ${cookie.de.tags as unknown as string},
      ${cookie.de.mood ?? ''},
      ${cookie.en.desc}, ${cookie.en.tags as unknown as string},
      ${cookie.en.mood ?? ''}
    )
    ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name,
      image = EXCLUDED.image,
      category = EXCLUDED.category,
      price = EXCLUDED.price,
      vegan = EXCLUDED.vegan,
      de_desc = EXCLUDED.de_desc,
      de_tags = EXCLUDED.de_tags,
      de_mood = EXCLUDED.de_mood,
      en_desc = EXCLUDED.en_desc,
      en_tags = EXCLUDED.en_tags,
      en_mood = EXCLUDED.en_mood
  `;
}

export async function deleteCookie(id: string): Promise<void> {
  await sql`DELETE FROM cookies WHERE id = ${id}`;
}

// ─── Site Content ──────────────────────────────────────────────────────────

export async function getSiteContent(): Promise<SiteContent> {
  const { rows } = await sql`SELECT * FROM site_content`;

  const content: Record<string, Record<string, Record<string, string>>> = {};
  for (const row of rows) {
    const section = row.section as string;
    const lang = row.lang as string;
    const key = row.key as string;
    const value = row.value as string;

    if (!content[section]) content[section] = {};
    if (!content[section][lang]) content[section][lang] = {};
    content[section][lang][key] = value;
  }

  return content as unknown as SiteContent;
}

export async function setSiteContent(content: SiteContent): Promise<void> {
  for (const [section, langs] of Object.entries(content)) {
    for (const [lang, keys] of Object.entries(langs as Record<string, Record<string, string>>)) {
      for (const [key, value] of Object.entries(keys)) {
        await sql`
          INSERT INTO site_content (section, lang, key, value)
          VALUES (${section}, ${lang}, ${key}, ${value})
          ON CONFLICT (section, lang, key) DO UPDATE SET value = EXCLUDED.value
        `;
      }
    }
  }
}
