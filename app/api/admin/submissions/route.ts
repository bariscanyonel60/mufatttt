import { NextResponse } from "next/server";
import { requireApiSession, unauthorized } from "@/lib/admin/auth";
import { deleteSubmission, getSubmissions, updateSubmission } from "@/lib/admin/store";
import type { SubmissionStatus } from "@/lib/admin/types";

export async function GET(req: Request) {
  const session = await requireApiSession();
  if (!session) return unauthorized();

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const status = searchParams.get("status");
  const q = (searchParams.get("q") || "").toLowerCase();

  let items = getSubmissions().items;
  if (type === "contact" || type === "career") items = items.filter((i) => i.type === type);
  if (status) items = items.filter((i) => i.status === status);
  if (q) {
    items = items.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.email.toLowerCase().includes(q) ||
        i.message.toLowerCase().includes(q) ||
        ("subject" in i && i.subject.toLowerCase().includes(q)) ||
        ("jobTitle" in i && i.jobTitle.toLowerCase().includes(q)),
    );
  }

  return NextResponse.json({ items });
}

export async function PATCH(req: Request) {
  const session = await requireApiSession();
  if (!session) return unauthorized();

  let body: { id?: string; status?: SubmissionStatus; note?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz JSON." }, { status: 400 });
  }

  if (!body.id) return NextResponse.json({ error: "id gerekli." }, { status: 400 });
  const updated = updateSubmission(
    body.id,
    {
      ...(body.status ? { status: body.status } : {}),
      ...(body.note !== undefined ? { note: body.note } : {}),
    },
    session.user,
  );
  if (!updated) return NextResponse.json({ error: "Bulunamadı." }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request) {
  const session = await requireApiSession();
  if (!session) return unauthorized();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id gerekli." }, { status: 400 });
  deleteSubmission(id, session.user);
  return NextResponse.json({ ok: true });
}
