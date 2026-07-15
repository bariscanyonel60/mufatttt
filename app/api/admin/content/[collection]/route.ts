import { NextResponse } from "next/server";
import { requireApiSession, unauthorized } from "@/lib/admin/auth";
import { getContent, patchContent } from "@/lib/admin/store";
import type { CollectionKey, ContentStore } from "@/lib/admin/types";
import { collections } from "@/lib/admin/schema";
import { revalidatePath } from "next/cache";

type Params = { params: Promise<{ collection: string }> };

const VALID = new Set(Object.keys(collections));

export async function GET(_req: Request, { params }: Params) {
  const session = await requireApiSession();
  if (!session) return unauthorized();
  const { collection } = await params;
  if (!VALID.has(collection) && collection !== "site" && collection !== "seo" && collection !== "projectFilters") {
    return NextResponse.json({ error: "Bilinmeyen koleksiyon." }, { status: 404 });
  }
  const content = await getContent();
  return NextResponse.json({ items: content[collection as keyof ContentStore] });
}

export async function PUT(req: Request, { params }: Params) {
  const session = await requireApiSession();
  if (!session) return unauthorized();
  const { collection } = await params;

  let body: { items?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz JSON." }, { status: 400 });
  }

  if (body.items === undefined) {
    return NextResponse.json({ error: "items gerekli." }, { status: 400 });
  }

  const key = collection as keyof ContentStore;
  const saved = await patchContent(key, body.items as ContentStore[typeof key], session.user);
  revalidatePath("/", "layout");
  return NextResponse.json(saved);
}

export async function POST(req: Request, { params }: Params) {
  const session = await requireApiSession();
  if (!session) return unauthorized();
  const { collection } = await params;
  if (!VALID.has(collection)) {
    return NextResponse.json({ error: "Bu koleksiyona ekleme yapılamaz." }, { status: 400 });
  }

  let item: Record<string, unknown>;
  try {
    item = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz JSON." }, { status: 400 });
  }

  const meta = collections[collection as CollectionKey];
  const content = await getContent();
  const list = [...(content[collection as CollectionKey] as Record<string, unknown>[])];
  const id = String(item[meta.idKey] ?? "");
  if (!id) return NextResponse.json({ error: `${meta.idKey} zorunlu.` }, { status: 400 });
  if (list.some((x) => String(x[meta.idKey]) === id)) {
    return NextResponse.json({ error: "Bu kimlik zaten var." }, { status: 409 });
  }
  list.push(item);
  const saved = await patchContent(collection as CollectionKey, list as never, session.user);
  revalidatePath("/", "layout");
  return NextResponse.json(saved);
}
