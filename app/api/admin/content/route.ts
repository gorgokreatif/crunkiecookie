import { NextRequest, NextResponse } from 'next/server';
import { getSiteContent, setSiteContent } from '../../../../lib/db';

export async function GET() {
  try {
    const content = await getSiteContent();
    return NextResponse.json(content);
  } catch {
    return NextResponse.json({ error: 'Failed to read content' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await setSiteContent(body);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}
