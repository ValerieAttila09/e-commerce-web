'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-pulse"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full w-fit">
              <Sparkles size={16} />
              <span className="text-sm font-semibold">Toko Online Terpercaya #1</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Belanja Produk Favorit Anda dengan
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Mudah & Terpercaya
                </span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Temukan ribuan produk pilihan dengan harga terbaik. Gratis ongkir untuk pembelian pertama Anda dan dapatkan cashback hingga 50%.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="#products">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold">
                  Belanja Sekarang
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 font-semibold hover:border-blue-600 hover:text-blue-600"
              >
                Pelajari Lebih Lanjut
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-gray-200">
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
          <div className="relative">
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden">
              {/* Gradient background placeholder */}
              {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-300 to-indigo-400 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🛍️</div>
                  <p className="text-white text-lg font-semibold">Shopping Experience</p>
                </div>
              </div> */}
              <Image src={`/images/hero_image/happy-people-shopping-online.png`} alt='gambar hero' width={600} height={600} className='w-full h-full absolute object-cover inset-0 rounded-lg'/>

              {/* Floating cards */}
              <div className="absolute top-8 left-8 bg-white rounded-xl p-4 shadow-xl transform hover:scale-105 transition-transform">
                <p className="text-2xl">✨</p>
                <p className="text-sm font-semibold text-gray-800 mt-2">Kualitas Terjamin</p>
              </div>
              <div className="absolute bottom-12 right-8 bg-white rounded-xl p-4 shadow-xl transform hover:scale-105 transition-transform">
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
