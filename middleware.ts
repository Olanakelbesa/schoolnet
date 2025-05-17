import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Define protected routes and their required roles
const protectedRoutes = {
  parent: {
    paths: [
      '/dashboard',
      '/parentquestionnaire',
      '/dashboard/schools',
      '/dashboard/my-list',
      '/dashboard/school-details',
      '/dashboard/analytics'
    ],
    role: 'parent'
  },
  school: {
    paths: [
      '/school-dashboard',
      '/school-dashboard/profile',
      '/school-dashboard/messages',
      '/school-dashboard/analytics'
    ],
    role: 'school'
  }
}

// Public routes that don't require authentication
const publicRoutes = [
  '/',
  '/login',
  '/signup',
  '/forgot-pwd',
  '/verify-otp',
  '/api/auth'
]

// Role selection route
const roleSelectionRoute = '/role-selection'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || 
    pathname.startsWith(route + '/') ||
    pathname.startsWith('/api/auth/')
  )

  // Allow access to public routes
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Get the session token
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  })

  console.log("Middleware - Token:", {
    hasToken: !!token,
    role: token?.role,
    pathname
  });

  // If no token, redirect to login
  if (!token) {
    console.log("Middleware - No token found, redirecting to login");
    const url = new URL('/login', request.url)
    url.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(url)
  }

  // If user is authenticated but hasn't selected a role, redirect to role selection
  if ((!token.role || token.role === 'user') && pathname !== roleSelectionRoute) {
    console.log("Middleware - No valid role found, redirecting to role selection");
    const url = new URL(roleSelectionRoute, request.url)
    return NextResponse.redirect(url)
  }

  // If user has a role and tries to access role selection, redirect to appropriate dashboard
  if (token.role && token.role !== 'user' && pathname === roleSelectionRoute) {
    console.log("Middleware - User already has role, redirecting to dashboard");
    const url = new URL(
      token.role === 'parent' ? '/dashboard' : '/school-dashboard',
      request.url
    )
    return NextResponse.redirect(url)
  }

  // Check role-based access
  const userRole = token.role as string

  // Check parent routes
  if (protectedRoutes.parent.paths.some(path => pathname.startsWith(path))) {
    if (userRole !== 'parent') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Check school routes
  if (protectedRoutes.school.paths.some(path => pathname.startsWith(path))) {
    if (userRole !== 'school') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Add user role and ID to request headers for API routes
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-user-role', userRole)
  requestHeaders.set('x-user-id', token.sub as string)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    // Match all paths except static files and API routes
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
} 