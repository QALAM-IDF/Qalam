import { currentUser } from "@clerk/nextjs/server";

export async function isAdmin(): Promise<boolean> {
  try {
    const user = await currentUser();
    if (!user) return false;

    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) return false;

    return user.emailAddresses.some(
      (e) => e.emailAddress === adminEmail
    );
  } catch {
    return false;
  }
}

export async function requireAdmin(): Promise<void> {
  const admin = await isAdmin();
  if (!admin) {
    throw new Error("Accès non autorisé");
  }
}
