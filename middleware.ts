// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { persistor } from './utils/appStore';

export function middleware(request: NextRequest) {
  const userCookie = request.cookies.get('token');
  const isLoggedIn = !!userCookie?.value;
  const { pathname } = request.nextUrl;

  const protectedPaths = ['/', '/feed'];
  const isProtected = protectedPaths.some((path) =>
    pathname === path || pathname.startsWith(path + '/')
  );
  

  if (isProtected && !isLoggedIn) {
    persistor.purge()
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname === '/' && isLoggedIn) {
    return NextResponse.redirect(new URL('/feed', request.url));
  }

  if(isLoggedIn && pathname === '/login'){
    return NextResponse.redirect(new URL('/feed', request.url));
  }

  return NextResponse.next();
}
