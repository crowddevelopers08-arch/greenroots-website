import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HaBrandPage } from "@/components/store/ha-brand-page";
import { getElecBrandBySlug, getElecBrandImages, ELEC_GALLERY_MAP } from "@/lib/store-data";

type PageProps = {
  params: Promise<{ brand: string }>;
};

export async function generateStaticParams() {
  return Object.keys(ELEC_GALLERY_MAP).map((brand) => ({ brand }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { brand: slug } = await params;
  const product = getElecBrandBySlug(slug);
  if (!product) return { title: "Brand Not Found | Green Roots" };
  return {
    title: `${product.name} Catalogue | Electronics | Green Roots`,
    description: product.desc,
  };
}

export default async function ElecBrandRoutePage({ params }: PageProps) {
  const { brand: slug } = await params;
  const product = getElecBrandBySlug(slug);
  const images = getElecBrandImages(slug);

  if (!product || !images) notFound();

  return <HaBrandPage brandProduct={product} images={images} />;
}
