export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getCourseById, forfaitAccess } from "@/lib/courses";
import { getUserForfait } from "@/lib/user";

type Params = { params: Promise<{ courseId: string }> };

export async function GET(
  _req: NextRequest,
  { params }: Params
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
    const { courseId } = await params;
    const [course, forfait] = await Promise.all([
      getCourseById(courseId),
      getUserForfait(userId),
    ]);
    if (!course) {
      return NextResponse.json({ error: "Cours introuvable" }, { status: 404 });
    }
    const allowed = forfait ? (forfaitAccess[forfait] ?? []) : [];
    if (!allowed.includes(course.forfait)) {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 });
    }
    return NextResponse.json(course);
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
