import { Suspense } from "react";
import AdminLoginPage from "./LoginForm";

export default function Page() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[#0f1115] text-white/50">Yükleniyor…</div>}>
      <AdminLoginPage />
    </Suspense>
  );
}
