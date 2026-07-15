import { NextResponse } from "next/server";
import { requireApiSession, unauthorized } from "@/lib/admin/auth";
import { getContent, saveContent } from "@/lib/admin/store";
import type { ContentStore } from "@/lib/admin/types";
import { revalidatePath } from "next/cache";

export async function GET() {
  const session = await requireApiSession();
  if (!session) return unauthorized();
  return NextResponse.json(await getContent());
}

export async function PUT(req: Request) {
  const session = await requireApiSession();
  if (!session) return unauthorized();

  let body: ContentStore;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz JSON." }, { status: 400 });
  }

  const saved = await saveContent(body, session.user);
  revalidatePath("/", "layout");
  return NextResponse.json(saved);
}
