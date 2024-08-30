import { updateSession } from '@/utils/supabase/middleware'
import { createClient } from '@/utils/supabase/server';
import {NextResponse} from "next/server"

export async function middleware(request) {
  // update user's auth session
  const res = NextResponse.next()
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res;
  }

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
