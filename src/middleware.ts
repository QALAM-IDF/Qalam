import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/espace-membre(.*)",
  "/choisir-forfait(.*)",
  "/api/progression(.*)",
  "/api/reservation(.*)",
  // NE PAS ajouter /auth-redirect : après login Clerk redirige ici, puis la page redirige selon forfait
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
