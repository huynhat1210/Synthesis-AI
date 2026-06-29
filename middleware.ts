import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define pages that require authentication
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/profile(.*)",
  "/projects(.*)",
  "/pitches(.*)",
  "/analytics(.*)",
  "/settings(.*)",
  "/help(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.[^?]*$).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
