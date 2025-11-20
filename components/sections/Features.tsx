'use client';

import { Card } from '@/components/ui/card';
import { Zap, Shield, Truck, Headphones, CreditCard, TrendingUp } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const features = [
    {
      icon: Zap,
      title: 'Gratis Ongkir',
      description: 'Gratis ongkos kirim untuk pembelian pertama Anda ke seluruh Indonesia',
    },
    {
      icon: Shield,
      title: 'Pembayaran Aman',
      description: 'Transaksi dijamin aman dengan enkripsi tingkat bank dan berbagai metode pembayaran',
    },
    {
      icon: Truck,
      title: 'Pengiriman Cepat',
      description: 'Pengiriman express tersedia, sampai dalam 24 jam untuk area tertentu',
    },
    {
      icon: Headphones,
      title: 'Dukungan Pelanggan',
      description: 'Tim customer service kami siap membantu 24/7 melalui chat, email, dan telepon',
    },
    {
      icon: CreditCard,
      title: 'Cashback & Promo',
      description: 'Dapatkan cashback hingga 50%, voucher eksklusif, dan penawaran spesial setiap hari',
    },
    {
      icon: TrendingUp,
      title: 'Produk Terbaru',
      description: 'Koleksi produk selalu diperbarui dengan tren terkini dan brand ternama',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger animation for cards
      gsap.fromTo(
        cardsRef.current,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: false,
            markers: false,
          },
        }
      );

      // Hover animation - lift effect
      cardsRef.current.forEach((card) => {
        if (card) {
          gsap.set(card, { transformOrigin: 'center' });

          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -10,
              duration: 0.3,
              ease: 'power2.out',
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              duration: 0.3,
              ease: 'power2.out',
            });
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-20 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Mengapa Memilih ShopHub?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kami berkomitmen memberikan pengalaman berbelanja terbaik dengan layanan unggulan dan produk berkualitas
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
              >
                <Card className="p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group bg-gradient-to-br from-white to-blue-50">
                  <div className="mb-4 inline-flex p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg group-hover:from-blue-200 group-hover:to-indigo-200 transition-colors">
                    <Icon className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 text-lg mb-4">
            Ratusan ribu pelanggan telah mempercayai ShopHub untuk kebutuhan belanja online mereka
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            {['Terpercaya', 'Berkualitas', 'Cepat', 'Aman'].map((tag, index) => (
              <span key={index} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                ✓ {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
