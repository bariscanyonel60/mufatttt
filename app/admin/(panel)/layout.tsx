import { redirect } from "next/navigation";
import { getSession } from "@/lib/admin/auth";
import AdminShell from "@/components/admin/AdminShell";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return <AdminShell user={session.user}>{children}</AdminShell>;
}
