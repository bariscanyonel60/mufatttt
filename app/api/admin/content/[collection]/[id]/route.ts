import { NextResponse } from "next/server";
import { requireApiSession, unauthorized } from "@/lib/admin/auth";
import { deleteCollectionItem, getContent, upsertCollectionItem } from "@/lib/admin/store";
import { collections } from "@/lib/admin/schema";
import type { CollectionKey } from "@/lib/admin/types";
import { revalidatePath } from "next/cache";

type Params = { params: Promise<{ collection: string; id: string }> };

export async function PUT(req: Request, { params }: Params) {
  const session = await requireApiSession();
  if (!session) return unauthorized();
  const { collection, id } = await params;
  const meta = collections[collection as CollectionKey];
  if (!meta) return NextResponse.json({ error: "Bilinmeyen koleksiyon." }, { status: 404 });

  let item: Record<string, unknown>;
  try {
    item = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz JSON." }, { status: 400 });
  }

  item[meta.idKey] = decodeURIComponent(id);
  const saved = upsertCollectionItem(collection as CollectionKey, item, meta.idKey, session.user);
  revalidatePath("/", "layout");
  return NextResponse.json(saved);
}

export async function DELETE(_req: Request, { params }: Params) {
  const session = await requireApiSession();
  if (!session) return unauthorized();
  const { collection, id } = await params;
  const meta = collections[collection as CollectionKey];
  if (!meta) return NextResponse.json({ error: "Bilinmeyen koleksiyon." }, { status: 404 });

  const before = getContent();
  const list = before[collection as CollectionKey] as Record<string, unknown>[];
  if (!list.some((x) => String(x[meta.idKey]) === decodeURIComponent(id))) {
    return NextResponse.json({ error: "Kayıt bulunamadı." }, { status: 404 });
  }

  const saved = deleteCollectionItem(
    collection as CollectionKey,
    meta.idKey,
    decodeURIComponent(id),
    session.user,
  );
  revalidatePath("/", "layout");
  return NextResponse.json(saved);
}
