import { NextResponse } from 'next/server';
import { ensureSchema, getCookies, upsertCookie, getSiteContent, setSiteContent } from '../../../../lib/db';
import cookiesJson from '../../../../data/cookies.json';
import contentJson from '../../../../data/content.json';
import type { Cookie, SiteContent } from '../../../../types';

export async function POST() {
  try {
    await ensureSchema();

    const existingCookies = await getCookies();
    if (existingCookies.length === 0) {
      for (const cookie of cookiesJson as Cookie[]) {
        await upsertCookie(cookie);
      }
    }

    const existingContent = await getSiteContent();
    const hasContent = Object.keys(existingContent).length > 0;
    if (!hasContent) {
      await setSiteContent(contentJson as unknown as SiteContent);
    }

    return NextResponse.json({
      ok: true,
      seeded: {
        cookies: existingCookies.length === 0 ? cookiesJson.length : 0,
        content: hasContent ? 0 : 'all',
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Seed failed', detail: String(err) },
      { status: 500 },
    );
  }
}
