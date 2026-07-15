import AboutAdmin from "@/components/admin/AboutAdmin";
import { getContent } from "@/lib/admin/store";

export const dynamic = "force-dynamic";

export default async function Page() {
  const c = await getContent();
  return (
    <AboutAdmin
      values={c.values as unknown as Record<string, unknown>[]}
      milestones={c.milestones as unknown as Record<string, unknown>[]}
      team={c.team as unknown as Record<string, unknown>[]}
    />
  );
}
