import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// Specify which paths should run the middleware
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
    '/api/(.*)',
  ],
};
