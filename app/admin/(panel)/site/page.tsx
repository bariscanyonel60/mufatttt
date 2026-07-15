import SiteSettingsForm from "@/components/admin/SiteSettingsForm";
import { getContent } from "@/lib/admin/store";

export const dynamic = "force-dynamic";

export default async function Page() {
  return <SiteSettingsForm initial={(await getContent()).site} />;
}
