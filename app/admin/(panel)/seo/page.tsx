import SeoForm from "@/components/admin/SeoForm";
import { getContent } from "@/lib/admin/store";

export const dynamic = "force-dynamic";

export default async function Page() {
  return <SeoForm initial={(await getContent()).seo} />;
}
