import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from '@/utils/session';


// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const session = await getSession();

  if (request.nextUrl.pathname.startsWith("/auth") && session.isLogged) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // TODO - This line of code may be remove in the future.
  if (request.nextUrl.pathname === "/" && !session.isLogged) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  // return NextResponse.redirect(new URL('/home', request.url))
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)', '/auth']
}