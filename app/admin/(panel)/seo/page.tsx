import SeoForm from "@/components/admin/SeoForm";
import { getContent } from "@/lib/admin/store";

export const dynamic = "force-dynamic";

export default function Page() {
  return <SeoForm initial={getContent().seo} />;
}
