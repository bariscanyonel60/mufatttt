import { NextResponse } from "next/server";
import { createSession, verifyPassword } from "@/lib/admin/auth";
import { logActivity } from "@/lib/admin/store";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (!rateLimit(`admin-login:${ip}`, 8, 15 * 60_000)) {
    return NextResponse.json(
      { error: "Çok fazla deneme. 15 dakika sonra tekrar deneyin." },
      { status: 429 }
    );
  }

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
  await logActivity({ action: "login", entity: "auth", detail: "Yönetici girişi", user });
  return NextResponse.json({ ok: true, user });
}
