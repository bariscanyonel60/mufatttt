import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { requireApiSession, unauthorized } from "@/lib/admin/auth";
import { logActivity } from "@/lib/admin/store";

export async function GET() {
  const session = await requireApiSession();
  if (!session) return unauthorized();

  const dir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const files = fs
    .readdirSync(dir)
    .filter((f) => !f.startsWith("."))
    .map((name) => {
      const stat = fs.statSync(path.join(dir, name));
      return {
        name,
        url: `/uploads/${name}`,
        size: stat.size,
        updatedAt: stat.mtime.toISOString(),
      };
    })
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  return NextResponse.json({ files });
}

export async function POST(req: Request) {
  const session = await requireApiSession();
  if (!session) return unauthorized();

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Dosya gerekli." }, { status: 400 });
  }

  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "Maksimum 8 MB." }, { status: 400 });
  }

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: "Sadece görsel yükleyebilirsiniz." }, { status: 400 });
  }

  const dir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const ext = path.extname(file.name) || ".bin";
  const safe = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80)}`;
  const filename = safe.includes(".") ? safe : `${safe}${ext}`;
  const buf = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(dir, filename), buf);

  logActivity({
    action: "upload",
    entity: "media",
    detail: filename,
    user: session.user,
  });

  return NextResponse.json({ url: `/uploads/${filename}`, name: filename });
}

export async function DELETE(req: Request) {
  const session = await requireApiSession();
  if (!session) return unauthorized();
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  if (!name || name.includes("..") || name.includes("/")) {
    return NextResponse.json({ error: "Geçersiz dosya." }, { status: 400 });
  }
  const file = path.join(process.cwd(), "public", "uploads", name);
  if (fs.existsSync(file)) fs.unlinkSync(file);
  logActivity({ action: "delete", entity: "media", detail: name, user: session.user });
  return NextResponse.json({ ok: true });
}
