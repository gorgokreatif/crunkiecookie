import { auth } from './auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoginPage = pathname === '/admin/login';
  const isApiRoute = pathname.startsWith('/api/admin');

  if (req.auth) return NextResponse.next();
  if (isLoginPage) return NextResponse.next();
  if (isApiRoute) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const loginUrl = new URL('/admin/login', req.url);
  loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
});

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
