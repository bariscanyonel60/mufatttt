import { NextResponse } from "next/server";
import { requireApiSession, unauthorized } from "@/lib/admin/auth";
import { getActivity } from "@/lib/admin/store";

export async function GET() {
  const session = await requireApiSession();
  if (!session) return unauthorized();
  return NextResponse.json(getActivity());
}
