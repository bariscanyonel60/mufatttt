import CollectionManager from "@/components/admin/CollectionManager";
import { collections } from "@/lib/admin/schema";
import { getContent } from "@/lib/admin/store";

export const dynamic = "force-dynamic";

export default async function Page() {
  const items = (await getContent()).references as unknown as Record<string, unknown>[];
  return <CollectionManager meta={collections.references} initialItems={items} />;
}
