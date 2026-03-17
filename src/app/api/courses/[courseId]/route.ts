export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getCourseById, forfaitAccess } from "@/lib/courses";
import { getUserForfait, getUserRole } from "@/lib/user";
import { isAdmin } from "@/lib/admin";
import { logAccess, LOG_ACTIONS } from "@/lib/logging";

type Params = { params: Promise<{ courseId: string }> };

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
    const { courseId } = await params;
    let forfait = await getUserForfait(userId);
    if (!forfait) {
      const role = await getUserRole(userId);
      const admin = await isAdmin();
      if (role === "professeur" || admin) forfait = "intensif";
    }
    if (!forfait) {
      await logAccess(userId, LOG_ACTIONS.ACCESS_DENIED, `course:${courseId}`, req);
      return NextResponse.json({ error: "Pas de forfait actif" }, { status: 403 });
    }
    const course = await getCourseById(courseId);
    if (!course) {
      return NextResponse.json({ error: "Cours introuvable" }, { status: 404 });
    }
    const allowed = forfaitAccess[forfait] ?? [];
    if (!allowed.includes(course.forfait)) {
      await logAccess(userId, LOG_ACTIONS.ACCESS_DENIED, `course:${courseId}`, req);
      return NextResponse.json({ error: "Accès non autorisé à ce cours" }, { status: 403 });
    }
    await logAccess(userId, LOG_ACTIONS.VIEW_COURSE, `course:${courseId}`, req);
    return NextResponse.json(course);
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
