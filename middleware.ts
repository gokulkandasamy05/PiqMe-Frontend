// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { persistor } from './utils/appStore';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  const isLoggedIn = !!token;

  // If not logged in and trying to access a protected page
  if (!isLoggedIn && pathname.startsWith('/feed')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If logged in and trying to access login page
  if (isLoggedIn && pathname === '/login') {
    return NextResponse.redirect(new URL('/feed', request.url));
  }

  return NextResponse.next();
}

