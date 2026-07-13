import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/admin/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminPage = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");
  const isLoginPage = pathname === "/admin/login";
  const isPublicApi = pathname === "/api/admin/login";

  if (isPublicApi || isLoginPage) {
    if (isLoginPage && (await getSessionFromRequest(req))) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.next();
  }

  if (isAdminPage || isAdminApi) {
    const session = await getSessionFromRequest(req);
    if (!session) {
      if (isAdminApi) {
        return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
      }
      const login = new URL("/admin/login", req.url);
      login.searchParams.set("next", pathname);
      return NextResponse.redirect(login);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
