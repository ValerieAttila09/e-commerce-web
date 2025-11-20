'use client';

import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Review() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  const reviews = [
    {
      id: 1,
      author: 'Budi Santoso',
      avatar: '👨',
      rating: 5,
      title: 'Belanja yang sangat memuaskan!',
      content: 'Produk sampai dengan cepat dan kondisi sangat baik. Customer service ShopHub sangat responsif dan membantu. Pasti belanja lagi!',
      date: '2 hari yang lalu',
      verified: true,
    },
    {
      id: 2,
      author: 'Siti Nurhaliza',
      avatar: '👩',
      rating: 5,
      title: 'Kualitas terbaik dengan harga bersaing',
      content: 'Saya sudah belanja berkali-kali di ShopHub dan selalu puas. Produk original, harga kompetitif, dan pengiriman tepat waktu. Recommended!',
      date: '1 minggu yang lalu',
      verified: true,
    },
    {
      id: 3,
      author: 'Ahmad Wijaya',
      avatar: '👨',
      rating: 4,
      title: 'Pengalaman berbelanja yang baik',
      content: 'Produk sesuai dengan deskripsi. Gratis ongkir membuat belanja lebih hemat. Sedikit lambat dalam respon chat tapi akhirnya terselesaikan dengan baik.',
      date: '2 minggu yang lalu',
      verified: true,
    },
    {
      id: 4,
      author: 'Ratih Kusuma',
      avatar: '👩',
      rating: 5,
      title: 'Toko online terpercaya dan profesional',
      content: 'Pertama kali berbelanja di ShopHub dan tidak menyesal. Proses checkout mudah, banyak pilihan pembayaran, dan garansi uang kembali 100% jika tidak puas.',
      date: '3 minggu yang lalu',
      verified: true,
    },
  ];

  const averageRating = (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 70%',
            scrub: false,
            markers: false,
          },
        }
      );

      // Reviews staggered entrance
      gsap.fromTo(
        reviewsRef.current,
        {
          opacity: 0,
          x: (index: number) => (index % 2 === 0 ? -60 : 60),
          rotateY: 10,
        },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: false,
            markers: false,
          },
        }
      );

      // Rating bars animation
      gsap.fromTo(
        '[data-rating-bar]',
        {
          width: 0,
        },
        {
          width: (index: number) => {
            const ratings = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
            return `${(reviews.filter(r => r.rating === 5 - index).length / reviews.length) * 100}%`;
          },
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 60%',
            scrub: false,
            markers: false,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="reviews" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Ulasan Pelanggan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Ribuan pelanggan telah memberikan ulasan positif tentang pengalaman berbelanja mereka di ShopHub
          </p>

          {/* Rating Summary */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12">
            <div className="text-center">
              <p className="text-5xl font-bold text-gray-900">{averageRating}</p>
              <div className="flex justify-center my-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={24}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-600">Berdasarkan {reviews.length} ulasan</p>
            </div>

            <div className="space-y-2 text-left">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 w-8">{rating}⭐</span>
                  <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500"
                      data-rating-bar
                      style={{
                        width: `${(reviews.filter(r => r.rating === rating).length / reviews.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">
                    {reviews.filter(r => r.rating === rating).length}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              ref={(el) => {
                if (el) reviewsRef.current[index] = el;
              }}
            >
              <Card className="p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-blue-50">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{review.avatar}</div>
                    <div>
                      <p className="font-bold text-gray-900">{review.author}</p>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                  </div>
                  {review.verified && (
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                      ✓ Terverifikasi
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>

                {/* Review Content */}
                <h3 className="font-bold text-gray-900 mb-2">{review.title}</h3>
                <p className="text-gray-600 leading-relaxed">{review.content}</p>

                {/* Footer */}
                <div className="mt-4 pt-4 border-t border-gray-200 flex gap-4 text-sm text-gray-600">
                  <button className="hover:text-blue-600 font-semibold">👍 Membantu</button>
                  <button className="hover:text-blue-600 font-semibold">💬 Balas</button>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors">
            Lihat Semua Ulasan
          </button>
        </div>
      </div>
    </section>
  );
}
