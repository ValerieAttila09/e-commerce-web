'use client';

import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { X, Star, ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store/cartStore';
import Image from 'next/image';

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

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { addItem, isProductInCart } = useCartStore();

  const isInCart = product ? isProductInCart(product.id) : false;

  useGSAP(
    () => {
      if (isOpen && modalRef.current) {
        // Animasi overlay
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: 'power2.out' }
        );

        // Animasi content dengan scale dan translateY
        gsap.fromTo(
          contentRef.current,
          {
            scale: 0.95,
            translateY: 20,
            opacity: 0,
          },
          {
            scale: 1,
            translateY: 0,
            opacity: 1,
            duration: 0.4,
            ease: 'back.out',
          }
        );
      } else if (!isOpen && modalRef.current) {
        // Animasi keluar
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.in',
        });

        gsap.to(
          contentRef.current,
          {
            scale: 0.95,
            translateY: 20,
            opacity: 0,
            duration: 0.3,
            ease: 'back.in',
          }
        );
      }
    },
    { dependencies: [isOpen], scope: modalRef }
  );

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addItem(product);
    // Toast akan muncul otomatis dari CartToast component
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ display: isOpen ? 'flex' : 'none' }}
    >
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        ref={contentRef}
        className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {/* Image Section */}
          <div className="flex items-center justify-center">
            <div className="w-full h-64 md:h-80 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl flex items-center justify-center text-8xl">
              <Image src={`/images/products_image/${product.image}`} width={200} height={200} alt={""} className=''/>
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-between">
            {/* Header */}
            <div>
              <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">
                {product.category}
              </p>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h2>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                        }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Description */}
              {product.description && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Price */}
              <div className="mb-6">
                <p className="text-4xl font-bold text-blue-600 mb-2">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">
                  {product.inStock ? (
                    <span className="text-green-600 font-semibold">
                      ✓ In Stock ({product.stock} available)
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold">Out of Stock</span>
                  )}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock || isInCart}
                className={`w-full h-12 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${isInCart
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : product.inStock
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
              >
                {isInCart ? (
                  <>
                    <Check className="w-5 h-5" />
                    Already in Cart
                  </>
                ) : product.inStock ? (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </>
                ) : (
                  'Out of Stock'
                )}
              </Button>

              <Button
                onClick={onClose}
                variant="outline"
                className="w-full h-12 border-2 border-gray-200 text-gray-900 hover:bg-gray-50 rounded-lg font-semibold"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
