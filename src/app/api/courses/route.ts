export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getCoursesByForfait } from "@/lib/courses";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
    const forfait = req.nextUrl.searchParams.get("forfait");
    if (!forfait) {
      return NextResponse.json(
        { error: "Paramètre forfait requis" },
        { status: 400 }
      );
    }
    const courses = await getCoursesByForfait(forfait);
    return NextResponse.json(courses);
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
