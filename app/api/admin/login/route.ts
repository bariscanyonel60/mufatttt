import { NextResponse } from "next/server";
import { createSession, verifyPassword } from "@/lib/admin/auth";
import { logActivity } from "@/lib/admin/store";

export async function POST(req: Request) {
  let body: { user?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const user = (body.user || "").trim();
  const password = body.password || "";

  if (!verifyPassword(user, password)) {
    return NextResponse.json({ error: "Kullanıcı adı veya şifre hatalı." }, { status: 401 });
  }

  await createSession(user);
  logActivity({ action: "login", entity: "auth", detail: "Yönetici girişi", user });
  return NextResponse.json({ ok: true, user });
}
