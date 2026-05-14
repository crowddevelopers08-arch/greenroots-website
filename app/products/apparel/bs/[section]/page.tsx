import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BsSectionPage } from "@/components/store/bs-section-page";
import { BS_GALLERY_IMAGES, BS_HIDDEN_PAGES, PRODS, getBsSectionById } from "@/lib/store-data";

type PageProps = {
  params: Promise<{
    section: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { section: sectionId } = await params;
  const section = getBsSectionById(sectionId);

  if (!section) {
    return {
      title: "BS Collection Not Found | Green Roots",
    };
  }

  return {
    title: `${section.label} | BS Collection | Green Roots`,
    description: `Browse ${section.label} products from the BS collection.`,
  };
}

export default async function BsSectionRoutePage({ params }: PageProps) {
  const { section: sectionId } = await params;
  const section = getBsSectionById(sectionId);

  if (!section) {
    notFound();
  }

  const items = BS_GALLERY_IMAGES.slice(section.start - 1, section.end)
    .map((image, index) => ({
      image,
      pageNumber: section.start + index,
    }))
    .filter((item) => !BS_HIDDEN_PAGES.has(item.pageNumber))
    .map((item) => ({
      image: item.image,
      globalIndex: item.pageNumber - 1,
    }));

  const bsProduct = PRODS.Apparel.find((product) => product.sub === "BS");

  if (!bsProduct) {
    notFound();
  }

  return (
    <BsSectionPage
      category="Apparel"
      section={section}
      items={items}
      bsProduct={bsProduct}
    />
  );
}
