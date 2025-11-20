'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animations (on page load)
      const tl = gsap.timeline();

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        0
      )
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          0.1
        )
        .fromTo(
          descriptionRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          0.2
        )
        .fromTo(
          buttonsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          0.3
        )
        .fromTo(
          statsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          0.4
        )
        .fromTo(
          imageRef.current,
          { opacity: 0, x: 50, scale: 0.95 },
          { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: 'power2.out' },
          0.2
        );

      // Floating cards animation
      gsap.to(card1Ref.current, {
        y: -10,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(card2Ref.current, {
        y: -15,
        duration: 3.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 0.3,
      });

      // ScrollTrigger animations - content parallax
      gsap.to('[data-parallax]', {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
          markers: false,
        },
        y: (index: number) => -index * 50,
        ease: 'none',
      });

      // Image subtle zoom on scroll
      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: 1.5,
          markers: false,
        },
        scale: 1.05,
        ease: 'none',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-br from-blue-50 via-white to-indigo-50"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-pulse"></div>
      <div
        className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-pulse"
        style={{ animationDelay: '2s' }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full w-fit"
              data-parallax
            >
              <Sparkles size={16} />
              <span className="text-sm font-semibold">Toko Online Terpercaya #1</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1
                ref={headingRef}
                className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight"
                data-parallax
              >
                Belanja Produk Favorit Anda dengan
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Mudah & Terpercaya
                </span>
              </h1>
              <p
                ref={descriptionRef}
                className="text-lg text-gray-600 leading-relaxed"
                data-parallax
              >
                Temukan ribuan produk pilihan dengan harga terbaik. Gratis ongkir untuk pembelian pertama Anda dan dapatkan
                cashback hingga 50%.
              </p>
            </div>

            {/* CTA Buttons */}
            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 pt-4" data-parallax>
              <Link href="#products">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold transition-all duration-300 hover:shadow-lg"
                >
                  Belanja Sekarang
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
              >
                Pelajari Lebih Lanjut
              </Button>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="flex flex-wrap gap-8 pt-8 border-t border-gray-200" data-parallax>
              <div>
                <p className="text-3xl font-bold text-gray-900">10K+</p>
                <p className="text-gray-600">Produk Tersedia</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">50K+</p>
                <p className="text-gray-600">Pelanggan Puas</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">4.9⭐</p>
                <p className="text-gray-600">Rating Kepuasan</p>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div ref={imageRef} className="relative" data-parallax>
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src={`/images/hero_image/happy-people-shopping-online.png`}
                alt="gambar hero"
                width={600}
                height={600}
                className="w-full h-full absolute object-cover inset-0 rounded-lg"
              />

              {/* Floating cards */}
              <div
                ref={card1Ref}
                className="absolute top-8 left-8 bg-white rounded-xl p-4 shadow-xl transform hover:scale-105 transition-transform"
              >
                <p className="text-2xl">✨</p>
                <p className="text-sm font-semibold text-gray-800 mt-2">Kualitas Terjamin</p>
              </div>
              <div
                ref={card2Ref}
                className="absolute bottom-12 right-8 bg-white rounded-xl p-4 shadow-xl transform hover:scale-105 transition-transform"
              >
                <p className="text-2xl">🚚</p>
                <p className="text-sm font-semibold text-gray-800 mt-2">Pengiriman Cepat</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
