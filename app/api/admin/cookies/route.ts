import { NextRequest, NextResponse } from 'next/server';
import { getCookies, upsertCookie, deleteCookie } from '../../../../lib/db';

export async function GET() {
  try {
    const cookies = await getCookies();
    return NextResponse.json(cookies);
  } catch {
    return NextResponse.json({ error: 'Failed to read cookies' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await upsertCookie(body);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed to save cookie' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await deleteCookie(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete cookie' }, { status: 500 });
  }
}
