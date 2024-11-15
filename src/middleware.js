import { auth } from "@/auth"

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;
  console.log('Is Authenticated', isAuthenticated);
  

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute && !isPublicRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isAuthenticated) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return null;
  }

  if (!isAuthenticated && !isPublicRoute) {
    return Response.redirect(new URL('/sign-in', nextUrl))
  }

});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg$).*)"],
};

