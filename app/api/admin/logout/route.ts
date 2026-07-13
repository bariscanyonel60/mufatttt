import { NextResponse } from "next/server";
import { destroySession, getSession } from "@/lib/admin/auth";
import { logActivity } from "@/lib/admin/store";

export async function POST() {
  const session = await getSession();
  if (session) {
    logActivity({ action: "logout", entity: "auth", detail: "Çıkış", user: session.user });
  }
  await destroySession();
  return NextResponse.json({ ok: true });
}
