import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Function to verify JWT token
function verifyToken(token: string): { id: string; email: string; role: string } | null {
  try {
    // Split the token into parts
    const [headerB64, payloadB64, signature] = token.split('.');
    
    // Decode the payload
    const payload = JSON.parse(
      Buffer.from(payloadB64, 'base64').toString()
    );

    // Check if token is expired
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  // Public paths that don't require authentication
  const publicPaths = ['/login', '/register', '/', '/api/auth/login'];
  const isPublicPath = publicPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (isPublicPath) {
    return NextResponse.next();
  }

  // Get token from cookie
  const token = request.cookies.get('auth-token')?.value;

  if (!token) {
    // Redirect to login for page requests
    if (!request.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // Verify token
  const payload = verifyToken(token);

  if (!payload) {
    // Clear invalid token
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('auth-token');
    return response;
  }

  // Check role for protected routes
  if (request.nextUrl.pathname.startsWith('/admin') && payload.role !== 'ADMIN') {
    // Redirect to dashboard for page requests
    if (!request.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.json(
      { error: 'Forbidden' },
      { status: 403 }
    );
  }

  // Add user info to headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('user', JSON.stringify(payload));

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/dashboard/:path*',
    '/api/protected/:path*',
  ],
}; 