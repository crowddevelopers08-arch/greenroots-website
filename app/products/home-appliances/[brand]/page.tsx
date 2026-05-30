import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HaBrandPage } from "@/components/store/ha-brand-page";
import { getHaBrandBySlug, getHaBrandImages, HA_BRAND_GALLERY_MAP } from "@/lib/store-data";

type PageProps = {
  params: Promise<{ brand: string }>;
};

export async function generateStaticParams() {
  return Object.keys(HA_BRAND_GALLERY_MAP).map((brand) => ({ brand }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { brand: slug } = await params;
  const product = getHaBrandBySlug(slug);
  if (!product) return { title: "Brand Not Found | Green Roots" };
  return {
    title: `${product.name} Catalogue | Home Appliances | Green Roots`,
    description: product.desc,
  };
}

export default async function HaBrandRoutePage({ params }: PageProps) {
  const { brand: slug } = await params;
  const product = getHaBrandBySlug(slug);
  const images = getHaBrandImages(slug);

  if (!product || !images) notFound();

  return <HaBrandPage brandProduct={product} images={images} />;
}
