'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Star, ShoppingCart, X, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store/cartStore';
import gsap from 'gsap';

interface ProductDetailsDrawerProps {
  product: any | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailsDrawer({
  product,
  isOpen,
  onClose,
}: ProductDetailsDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem, isProductInCart } = useCartStore();

  // Fetch product details and related products
  useEffect(() => {
    if (!isOpen || !product) return;

    let mounted = true;

    async function load() {
      setLoading(true);
      try {
        const [detailRes, relRes] = await Promise.all([
          fetch(`/api/products/${product.id}`),
          fetch(`/api/products/related?productId=${product.id}`),
        ]);

        if (!mounted) return;

        if (detailRes.ok) {
          const data = await detailRes.json();
          setReviews(Array.isArray(data.recentReviews) ? data.recentReviews : []);
        }

        if (relRes.ok) {
          const data = await relRes.json();
          setRelated(Array.isArray(data) ? data : data.products || []);
        }
      } catch (err) {
        console.error('Failed to load product details', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [isOpen, product]);

  // GSAP animation for drawer open/close
  useEffect(() => {
    if (!drawerRef.current || !overlayRef.current || !contentRef.current) return;

    if (isOpen) {
      // Lock body scroll
      document.body.style.overflow = 'hidden';

      // Animate overlay fade in
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );

      // Animate drawer slide in from left with spring effect
      gsap.fromTo(
        contentRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(1.2)',
        }
      );
    } else {
      // Animate drawer slide out to left
      gsap.to(contentRef.current, {
        x: 100,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          document.body.style.overflow = 'auto';
        },
      });

      // Animate overlay fade out
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    }

    // Cleanup: ensure scrolling is restored and cancel any running tweens
    return () => {
      try {
        document.body.style.overflow = 'auto';
      } catch (e) {
        // ignore in case document is not available
      }

      try {
        if (overlayRef.current) gsap.killTweensOf(overlayRef.current);
        if (contentRef.current) gsap.killTweensOf(contentRef.current);
      } catch (e) {
        // fail silently if GSAP killTweensOf is not available for some reason
      }
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const inCart = isProductInCart(product.id);

  return (
    <div ref={drawerRef} className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer Content */}
      <div
        ref={contentRef}
        className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header with close button */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h2 className="text-xl font-bold text-gray-900">Product Details</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-6 space-y-4">
              <div className="h-64 bg-gray-100 rounded-lg animate-pulse" />
              <div className="h-6 bg-gray-100 rounded animate-pulse" />
              <div className="h-6 bg-gray-100 rounded animate-pulse w-3/4" />
              <div className="space-y-2">
                <div className="h-12 bg-gray-100 rounded animate-pulse" />
                <div className="h-12 bg-gray-100 rounded animate-pulse" />
              </div>
            </div>
          ) : (
            <div className="p-6">
              {/* Product image */}
              <div className="mb-6 rounded-lg bg-gray-50 overflow-hidden flex items-center justify-center h-64">
                <Image
                  src={`/images/products_image/${product.image}`}
                  width={400}
                  height={400}
                  alt={product.name}
                  className="object-contain"
                  priority
                />
              </div>

              {/* Product info */}
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-sm text-gray-500 mb-4">{product.category}</p>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
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
                  {product.rating} ({reviews.length} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="text-3xl font-extrabold text-blue-600 mb-6">
                ${(product.price ?? 0).toFixed(2)}
              </div>

              {/* Stock status */}
              <div className="mb-6">
                <p
                  className={`text-sm font-semibold ${product.inStock
                    ? 'text-green-600'
                    : 'text-red-600'
                    }`}
                >
                  {product.inStock
                    ? '✓ In Stock'
                    : '✗ Out of Stock'}
                </p>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Reviews section */}
              {reviews.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Customer Reviews
                  </h3>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {reviews.map((review: any) => (
                      <div
                        key={review.id}
                        className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold text-sm text-gray-900">
                            {review.user?.firstName || 'Customer'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-1 mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < review.rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                                }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related products */}
              {related.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Related Products
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {related.slice(0, 4).map((p: any) => (
                      <div
                        key={p.id}
                        className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                      >
                        <div className="h-24 flex items-center justify-center mb-2 bg-white rounded">
                          <Image
                            src={`/images/products_image/${p.image}`}
                            width={100}
                            height={100}
                            alt={p.name}
                            className="object-contain"
                          />
                        </div>
                        <p className="text-xs font-semibold text-gray-900 truncate">
                          {p.name}
                        </p>
                        <p className="text-xs text-gray-600 mb-2">
                          ${p.price.toFixed(2)}
                        </p>
                        <Button
                          size="sm"
                          onClick={() => addItem(p)}
                          className="w-full text-xs h-7"
                          disabled={!p.inStock}
                        >
                          Add
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer with action buttons */}
        <div className="border-t border-gray-200 bg-gray-50 p-6 space-y-3">
          <Button
            onClick={() => addItem(product)}
            disabled={!product.inStock || inCart}
            className="w-full h-12 text-base font-semibold"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            {inCart ? 'Already in Cart' : 'Add to Cart'}
          </Button>

          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="w-full h-10 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
          >
            <Heart
              className={`w-5 h-5 ${isWishlisted
                ? 'fill-red-500 text-red-500'
                : 'text-gray-600'
                }`}
            />
            {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
          </button>

          <Button
            onClick={onClose}
            variant="outline"
            className="w-full h-10"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
