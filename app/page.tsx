import { Storefront } from "@/components/store/storefront";
import { CAT, getCategoryBySlug, slugifySegment, type CategoryKey } from "@/lib/store-data";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const categoryParam = typeof params.category === "string" ? params.category : "";
  const subcategoryParam = typeof params.subcategory === "string" ? params.subcategory : "";

  const initialCategory = getCategoryBySlug(categoryParam);
  const initialSubcategory = getInitialSubcategory(initialCategory, subcategoryParam);

  return <Storefront initialCategory={initialCategory} initialSubcategory={initialSubcategory} />;
}

function getInitialSubcategory(category: CategoryKey | null, subcategorySlug: string) {
  if (!category || !subcategorySlug) return null;

  return CAT[category].subs.find((sub) => slugifySegment(sub) === subcategorySlug) ?? null;
}
