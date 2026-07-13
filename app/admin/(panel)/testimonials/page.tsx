import CollectionManager from "@/components/admin/CollectionManager";
import { collections } from "@/lib/admin/schema";
import { getContent } from "@/lib/admin/store";

export const dynamic = "force-dynamic";

export default function Page() {
  const items = getContent().testimonials as unknown as Record<string, unknown>[];
  return <CollectionManager meta={collections.testimonials} initialItems={items} />;
}
