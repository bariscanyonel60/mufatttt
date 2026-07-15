import { NextResponse } from "next/server";
import { requireApiSession, unauthorized } from "@/lib/admin/auth";
import { logActivity } from "@/lib/admin/store";
import {
  deleteCloudinaryImage,
  listCloudinaryMedia,
  uploadCloudinaryImage,
} from "@/lib/cloudinary";

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_BYTES = 8 * 1024 * 1024;

function cloudinaryError(e: unknown) {
  const msg = e instanceof Error ? e.message : "Cloudinary hatası";
  const status = msg.includes("yapılandırılmamış") ? 503 : 500;
  return NextResponse.json({ error: msg }, { status });
}

export async function GET() {
  const session = await requireApiSession();
  if (!session) return unauthorized();

  try {
    const files = await listCloudinaryMedia();
    return NextResponse.json({ files, provider: "cloudinary" });
  } catch (e) {
    return cloudinaryError(e);
  }
}

export async function POST(req: Request) {
  const session = await requireApiSession();
  if (!session) return unauthorized();

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Dosya gerekli." }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Maksimum 8 MB." }, { status: 400 });
  }

  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json(
      { error: "Sadece JPEG, PNG, WebP veya GIF yükleyebilirsiniz." },
      { status: 400 }
    );
  }

  try {
    const buf = Buffer.from(await file.arrayBuffer());
    const { url, name } = await uploadCloudinaryImage(buf, file.name);

    await logActivity({
      action: "upload",
      entity: "media",
      detail: name,
      user: session.user,
    });

    return NextResponse.json({ url, name, provider: "cloudinary" });
  } catch (e) {
    return cloudinaryError(e);
  }
}

export async function DELETE(req: Request) {
  const session = await requireApiSession();
  if (!session) return unauthorized();

  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  if (!name || name.includes("..")) {
    return NextResponse.json({ error: "Geçersiz dosya." }, { status: 400 });
  }

  try {
    await deleteCloudinaryImage(name);
    await logActivity({ action: "delete", entity: "media", detail: name, user: session.user });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return cloudinaryError(e);
  }
}
