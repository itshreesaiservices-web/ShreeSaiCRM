import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { getSession } from '@/lib/auth';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Initialize Redis only if URLs are present to prevent crashes locally
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

// Create a new ratelimiter that allows 5 requests per 10 seconds
const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '10 s'),
      analytics: true,
    })
  : null;

// Paths that don't require authentication
const publicPaths = ['/login', '/signup', '/about', '/services', '/contact', '/book-consultation', '/'];

// Create intl middleware for localization
const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'hi', 'mr'],
  defaultLocale: 'en',
  localePrefix: 'never', // Use 'never' to keep existing URLs working without breaking the app right now
});

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Rate Limiting on Login/Signup endpoints
  const isAuthPath = pathname === '/login' || pathname === '/signup';
  
  if (ratelimit && isAuthPath && request.method === 'POST') {
    const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
    const { success } = await ratelimit.limit(ip);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
  }
  
  // 1. Extract and verify session
  const session = await getSession(request);

  // 2. Prevent authenticated users from accessing login/signup
  if (session && isAuthPath) {
    const role = session.role as string;
    if (role === 'CLIENT') {
      return NextResponse.redirect(new URL('/portal/dashboard', request.url));
    } else {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // 3. Allow public paths to bypass middleware
  if (publicPaths.some(path => pathname === path || pathname.startsWith('/_next') || pathname.startsWith('/api/public'))) {
    return NextResponse.next();
  }

  // 4. Handle unauthenticated users trying to access protected routes
  if (!session) {
    // Redirect unauthenticated users to login, except if they're on a public page
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 4. Role-Based Access Control (RBAC)
  const role = session.role as string;
  
  // If a CLIENT tries to access CRM (Advisor) pages
  if (role === 'CLIENT' && (pathname.startsWith('/dashboard') || pathname.startsWith('/leads') || pathname.startsWith('/clients') || pathname.startsWith('/tax') || pathname.startsWith('/portfolios') || pathname.startsWith('/reports') || pathname.startsWith('/documents') || pathname.startsWith('/tasks') || pathname.startsWith('/calendar') || pathname.startsWith('/settings'))) {
    return NextResponse.redirect(new URL('/portal/dashboard', request.url));
  }
  
  // If an ADVISOR/STAFF tries to access CLIENT portal
  if (role !== 'CLIENT' && pathname.startsWith('/portal')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 5. Bypass Next-Intl Middleware temporarily to prevent 404s
  // const response = intlMiddleware(request);
  const response = NextResponse.next();
  
  // Add security headers to the response
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
