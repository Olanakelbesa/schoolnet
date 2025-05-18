import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Helper to get a cookie value
function getCookie(request: NextRequest, name: string) {
  const cookie = request.cookies.get(name);
  return cookie ? cookie.value : undefined;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes
  const publicRoutes = [
    '/',
    '/login',
    '/signup',
    '/forgot-pwd',
    '/verify-otp',
    '/api/auth',
  ];
  const roleSelectionRoute = '/role-selection';

  // Allow access to public routes
  const isPublicRoute = publicRoutes.some(route =>
    pathname === route ||
    pathname.startsWith(route + '/') ||
    pathname.startsWith('/api/auth/')
  );
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Get JWT and user info from cookies
  const token = getCookie(request, 'auth_token');
  const userInfoRaw = getCookie(request, 'user_info');
  let user: any = {};
  try {
    user = userInfoRaw ? JSON.parse(decodeURIComponent(userInfoRaw)) : {};
  } catch {
    user = {};
  }


  // If no token, redirect to login
  if (!token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  // Route based on backend user role
  if (!user.role || user.role === 'user') {
    if (pathname !== roleSelectionRoute) {
      const url = new URL(roleSelectionRoute, request.url);
      return NextResponse.redirect(url);
    }
  } else if (user.role === 'parent') {
    if (pathname !== '/parentquestionnaire') {
      const url = new URL('/parentquestionnaire', request.url);
      return NextResponse.redirect(url);
    }
  } else if (user.role === 'school') {
    if (pathname !== '/school-dashboard') {
      const url = new URL('/school-dashboard', request.url);
      return NextResponse.redirect(url);
    }
  }

  // If user has a role and tries to access role selection, redirect to appropriate dashboard
  if (user.role && user.role !== 'user' && pathname === roleSelectionRoute) {
    const url = new URL(
      user.role === 'parent' ? '/dashboard' : '/school-dashboard',
      request.url
    );
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};