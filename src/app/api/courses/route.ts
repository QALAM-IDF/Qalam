export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getUserForfait, getUserRole } from "@/lib/user";
import { isAdmin } from "@/lib/admin";
import { getCoursesByForfait } from "@/lib/courses";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
    let forfait = await getUserForfait(userId);
    if (!forfait) {
      const role = await getUserRole(userId);
      const admin = await isAdmin();
      if (role === "professeur" || admin) forfait = "intensif";
    }
    if (!forfait) {
      return NextResponse.json({ courses: [], reason: "no_forfait" });
    }
    const courses = await getCoursesByForfait(forfait);
    return NextResponse.json({ courses, forfait });
  } catch (error) {
    console.error("GET courses error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
