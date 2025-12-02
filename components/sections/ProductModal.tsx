'use client';

import ProductDetailsDrawer from './ProductDetailsDrawer';

interface ProductDetail {
  id: number;
  name: string;
  price: number;
  description?: string;
  image?: string;
  category: string;
  rating: number;
  reviews: number;
  stock: number;
  inStock: boolean;
}

interface ProductModalProps {
  product: ProductDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * ProductModal now delegates to ProductDetailsDrawer
 * which shows a side drawer with product details,
 * reviews, and related products with GSAP animations.
 */
export default function ProductModal({
  product,
  isOpen,
  onClose,
}: ProductModalProps) {
  return (
    <ProductDetailsDrawer
      product={product}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
}
