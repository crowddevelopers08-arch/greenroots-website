import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EdibleBrandPage } from "@/components/store/edible-brand-page";
import { getEdibleBrandBySlug, getEdibleBrandImages, EDIBLE_BRAND_GALLERY_MAP } from "@/lib/store-data";

type PageProps = {
  params: Promise<{ brand: string }>;
};

export async function generateStaticParams() {
  return Object.keys(EDIBLE_BRAND_GALLERY_MAP).map((brand) => ({ brand }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { brand: slug } = await params;
  const product = getEdibleBrandBySlug(slug);
  if (!product) return { title: "Brand Not Found | Green Roots" };
  return {
    title: `${product.name} | Edible | Green Roots`,
    description: product.desc,
  };
}

export default async function EdibleBrandRoutePage({ params }: PageProps) {
  const { brand: slug } = await params;
  const product = getEdibleBrandBySlug(slug);
  const images = getEdibleBrandImages(slug);

  if (!product || !images) notFound();

  return <EdibleBrandPage brandProduct={product} images={images} />;
}
