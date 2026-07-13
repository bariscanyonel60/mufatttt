import AboutAdmin from "@/components/admin/AboutAdmin";
import { getContent } from "@/lib/admin/store";

export const dynamic = "force-dynamic";

export default function Page() {
  const c = getContent();
  return (
    <AboutAdmin
      values={c.values as unknown as Record<string, unknown>[]}
      milestones={c.milestones as unknown as Record<string, unknown>[]}
      team={c.team as unknown as Record<string, unknown>[]}
    />
  );
}
