'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TrendingProducts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  const products = [
    {
      id: 1,
      name: 'Smartphone Premium X12',
      price: 'Rp 5.999.000',
      originalPrice: 'Rp 8.999.000',
      rating: 4.9,
      reviews: 2543,
      image: '📱',
      badge: 'Bestseller',
      discount: '-33%',
    },
    {
      id: 2,
      name: 'Laptop Ultrabook Pro 15"',
      price: 'Rp 12.999.000',
      originalPrice: 'Rp 15.999.000',
      rating: 4.8,
      reviews: 1876,
      image: '💻',
      badge: 'Flash Sale',
      discount: '-18%',
    },
    {
      id: 3,
      name: 'Headphone Wireless Premium',
      price: 'Rp 1.299.000',
      originalPrice: 'Rp 1.999.000',
      rating: 4.7,
      reviews: 945,
      image: '🎧',
      badge: 'Trending',
      discount: '-35%',
    },
    {
      id: 4,
      name: 'Smartwatch Elite Series',
      price: 'Rp 2.499.000',
      originalPrice: 'Rp 3.499.000',
      rating: 4.9,
      reviews: 1234,
      image: '⌚',
      badge: 'Best Deal',
      discount: '-28%',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Product cards staggered entrance
      gsap.fromTo(
        productsRef.current,
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: false,
            markers: false,
          },
        }
      );

      // CTA section slide up
      gsap.fromTo(
        ctaRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
            end: 'top 70%',
            scrub: false,
            markers: false,
          },
        }
      );

      // Hover animations for products
      productsRef.current.forEach((product) => {
        if (product) {
          const imageEmoji = product.querySelector('[data-emoji]');

          product.addEventListener('mouseenter', () => {
            gsap.to(product, {
              y: -15,
              duration: 0.3,
              ease: 'power2.out',
            });

            if (imageEmoji) {
              gsap.to(imageEmoji, {
                scale: 1.2,
                duration: 0.3,
                ease: 'power2.out',
              });
            }
          });

          product.addEventListener('mouseleave', () => {
            gsap.to(product, {
              y: 0,
              duration: 0.3,
              ease: 'power2.out',
            });

            if (imageEmoji) {
              gsap.to(imageEmoji, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
              });
            }
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="py-20 md:py-32 bg-gradient-to-b from-blue-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              Produk Trending
            </h2>
            <p className="text-lg text-gray-600">
              Produk pilihan dengan penjualan terbaik dan rating tertinggi
            </p>
          </div>
          <Link href="#products">
            <Button variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
              Lihat Semua Produk
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => {
                if (el) productsRef.current[index] = el;
              }}
            >
              <Card className="border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group bg-white hover:-translate-y-1">
                {/* Product Image Container */}
                <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 h-48 flex items-center justify-center">
                  <div
                    data-emoji
                    className="text-6xl group-hover:scale-110 transition-transform duration-300"
                  >
                    {product.image}
                  </div>

                  {/* Badge */}
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {product.badge}
                  </div>

                  {/* Discount Badge */}
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {product.discount}
                  </div>

                  {/* Wishlist Button */}
                  <button className="absolute bottom-3 right-3 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    <Heart size={18} className="text-gray-400 hover:text-red-500 transition-colors" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-3">
                  <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-gray-900">{product.price}</p>
                    <p className="text-sm text-gray-500 line-through">{product.originalPrice}</p>
                  </div>

                  {/* Add to Cart Button */}
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold">
                    <ShoppingCart size={16} className="mr-2" />
                    Tambah ke Keranjang
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div
          ref={ctaRef}
          className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white text-center space-y-4"
        >
          <h3 className="text-3xl md:text-4xl font-bold">
            Belanja Sekarang, Hemat Lebih Banyak
          </h3>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Dapatkan diskon tambahan 15% untuk setiap pembelian 2 produk atau lebih hari ini
          </p>
          <Link href="#products">
            <Button size="lg" variant="secondary" className="font-semibold">
              Lihat Penawaran Spesial
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
