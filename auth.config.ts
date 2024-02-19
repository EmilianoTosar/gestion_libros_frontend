import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const protectedRoutes = ['/edit', '/create'];

      const isAccessingProtectedRoute = protectedRoutes.some(route => nextUrl.pathname.startsWith(route) || nextUrl.pathname.endsWith(route));

      if (isAccessingProtectedRoute) {
        if (isLoggedIn) return true;
        return false; 
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl));
      }
      return true;
    },
  },
  providers: [], 
} satisfies NextAuthConfig;