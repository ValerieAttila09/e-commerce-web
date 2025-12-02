"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store/cartStore';

interface Props {
  productId: string;
}

export default function ProductDetailsClient({ productId }: Props) {
  const [product, setProduct] = useState<any | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem, isProductInCart } = useCartStore();

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const [pRes, relRes] = await Promise.all([
          fetch(`/api/products/${productId}`),
          fetch(`/api/products/related?productId=${productId}`),
        ]);

        if (!mounted) return;

        if (pRes.ok) {
          const data = await pRes.json();
          setProduct(data);
          // use recentReviews coming from product endpoint when available
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
    return () => { mounted = false };
  }, [productId]);

  if (loading)
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-96 rounded bg-gray-100 animate-pulse" />
          <div>
            <div className="h-8 w-3/4 bg-gray-100 rounded mb-4 animate-pulse" />
            <div className="h-6 w-1/2 bg-gray-100 rounded mb-6 animate-pulse" />
            <div className="h-12 w-full bg-gray-100 rounded mb-4 animate-pulse" />
            <div className="space-y-3">
              <div className="h-12 bg-gray-100 rounded animate-pulse" />
              <div className="h-40 bg-gray-100 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );

  if (!product) return <div className="p-8">Product not found.</div>;

  const inCart = isProductInCart(product.id);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
          <div className="rounded-lg bg-white shadow-sm p-4">
            <div className="flex items-center justify-center h-96 bg-gray-50 rounded">
              <Image src={`/images/products_image/${product.image}`} width={600} height={600} alt={product.name} className="object-contain" />
            </div>
            {/* thumbnails could go here */}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-sm text-gray-500 mb-4">{product.category}</p>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <div className="text-sm text-gray-600">{product.rating} • {reviews.length} reviews</div>
          </div>

          <div className="text-4xl font-extrabold text-blue-600 mb-4">${product.price.toFixed(2)}</div>

          <div className="mb-6">
            <Button onClick={() => addItem(product)} disabled={!product.inStock || inCart} className="w-full h-12">
              {inCart ? 'In cart' : 'Add to cart'}
            </Button>
          </div>

          <div className="prose mb-6">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Reviews</h3>
            <div className="space-y-3 max-h-60 overflow-auto">
              {reviews.length === 0 ? (
                <div className="text-sm text-gray-500">No reviews yet.</div>
              ) : (
                reviews.map((r: any) => (
                  <div key={r.id} className="p-3 bg-gray-50 rounded">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-semibold text-sm">{r.user?.firstName || 'User'}</div>
                      <div className="text-xs text-gray-500">{new Date(r.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div className="text-sm text-yellow-500">{Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="w-3 h-3 inline" />)}</div>
                    <p className="text-sm text-gray-700 mt-1">{r.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Related</h3>
            <div className="grid grid-cols-2 gap-4">
              {related.length === 0 ? (
                <div className="text-sm text-gray-500">No related products found.</div>
              ) : (
                related.map((p: any) => (
                  <div key={p.id} className="p-2 bg-white rounded shadow-sm">
                    <div className="h-28 flex items-center justify-center mb-2 bg-gray-50">
                      <Image src={`/images/products_image/${p.image}`} width={200} height={120} alt={p.name} className="object-contain" />
                    </div>
                    <div className="text-sm font-semibold">{p.name}</div>
                    <div className="text-sm text-gray-600">${p.price.toFixed(2)}</div>
                    <div className="mt-2">
                      <Button size="sm" onClick={() => addItem(p)} className="w-full">Add</Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
