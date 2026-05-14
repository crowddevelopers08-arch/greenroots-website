import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/components/store/product-detail-page";
import { PRODS, getCategoryBySlug, getProductBySlug } from "@/lib/store-data";

type PageProps = {
  params: Promise<{
    category: string;
    product: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug, product: productSlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return {
      title: "Product Not Found | Green Roots",
    };
  }

  const product = getProductBySlug(category, productSlug);

  if (!product) {
    return {
      title: "Product Not Found | Green Roots",
    };
  }

  return {
    title: `${product.name} | Green Roots`,
    description: product.desc,
  };
}

export default async function ProductRoutePage({ params }: PageProps) {
  const { category: categorySlug, product: productSlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const product = getProductBySlug(category, productSlug);

  if (!product) {
    notFound();
  }

  const prioritizedRelatedProducts = [
    ...PRODS[category].filter((item) => item.sub === product.sub && item.id !== product.id),
    ...PRODS[category].filter((item) => item.sub !== product.sub && item.id !== product.id),
  ].slice(0, 8);

  return (
    <ProductDetailPage
      category={category}
      product={product}
      relatedProducts={prioritizedRelatedProducts}
    />
  );
}
