import ProductDetailsClient from './ProductDetailsClient';

interface PageProps {
  params: any;
}

export default async function Page({ params }: PageProps) {
  // Normalize params: Next may provide params as a Promise in some typings
  const resolved = await params;
  const id = resolved?.id ?? params?.id;
  return <ProductDetailsClient productId={String(id)} />;
}
