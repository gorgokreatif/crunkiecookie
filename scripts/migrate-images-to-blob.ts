import { put } from '@vercel/blob';
import { sql } from '@vercel/postgres';
import fs from 'fs';
import path from 'path';

const ASSETS_DIR = path.join(process.cwd(), 'public', 'assets');

async function main() {
  const files = fs.readdirSync(ASSETS_DIR).filter(
    f => f.startsWith('cookie-') && f.endsWith('.png')
  );

  console.log(`Found ${files.length} cookie images to migrate.`);

  for (const file of files) {
    const filePath = path.join(ASSETS_DIR, file);
    const buffer = fs.readFileSync(filePath);
    const blobName = `cookies/${file}`;

    console.log(`Uploading ${file}...`);
    const blob = await put(blobName, buffer, {
      access: 'public',
      contentType: 'image/png',
    });

    const oldPath = `/assets/${file}`;
    const { rowCount } = await sql`
      UPDATE cookies SET image = ${blob.url} WHERE image = ${oldPath}
    `;

    console.log(`  → ${blob.url} (${rowCount} DB row updated)`);
  }

  console.log('\nMigration complete.');
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
