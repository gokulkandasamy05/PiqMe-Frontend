import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  const isLoggedIn = !!token;

  const isProtectedPath = ['/feed', '/'].includes(pathname);

  // Redirect to login if not logged in and accessing a protected route
  if (!isLoggedIn && isProtectedPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Prevent logged-in users from visiting /login or /
  if (isLoggedIn && (pathname === '/login' || pathname === '/')) {
    return NextResponse.redirect(new URL('/feed', request.url));
  }

  return NextResponse.next();
}
