'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, CheckCircle2, Users, Award, Heart } from 'lucide-react';
import Navbar from '@/components/sections/Navbar';
import Image from 'next/image';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'John Doe',
      role: 'CEO & Pendiri',
      image: '👨‍💼',
      bio: 'Pemimpin visioner dengan pengalaman 10+ tahun di e-commerce',
    },
    {
      name: 'Sarah Smith',
      role: 'CTO',
      image: '👩‍💻',
      bio: 'Ahli teknologi yang passionate tentang inovasi',
    },
    {
      name: 'Mike Johnson',
      role: 'Kepala Penjualan',
      image: '👨‍💼',
      bio: 'Profesional penjualan yang fokus pada pelanggan',
    },
    {
      name: 'Emma Wilson',
      role: 'Kepala Operasional',
      image: '👩‍💼',
      bio: 'Spesialis keunggulan operasional',
    },
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: 'Pelanggan Pertama',
      description: 'Kami memprioritaskan kepuasan pelanggan dalam segala hal yang kami lakukan',
    },
    {
      icon: <Award className="w-8 h-8 text-yellow-500" />,
      title: 'Kualitas',
      description: 'Produk dan layanan berkualitas tinggi adalah standar kami',
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: 'Komunitas',
      description: 'Membangun komunitas yang kuat dari pelanggan setia',
    },
  ];

  const milestones = [
    { year: '2018', event: 'Perusahaan Didirikan' },
    { year: '2020', event: '10.000+ Pelanggan' },
    { year: '2022', event: 'Pencapaian Jutaan Dolar' },
    { year: '2024', event: 'Ekspansi Global' },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Header */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 py-16 pb-4">
          <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke beranda
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Tentang ShopHub</h1>
            <p className="text-xl text-gray-600">
              Destinasi terpercaya Anda untuk produk premium dan layanan luar biasa sejak 2018
            </p>
          </div>
        </section>

        {/* Hero section with story */}
        <section className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Kisah Kami</h2>
              <p className="text-gray-600 mb-4">
                Didirikan pada tahun 2018, ShopHub dimulai dengan misi sederhana: membuat produk berkualitas
                dapat diakses oleh semua orang. Apa yang dimulai sebagai startup kecil telah berkembang menjadi
                platform e-commerce yang berkembang dan dipercaya oleh ribuan pelanggan di seluruh dunia.
              </p>
              <p className="text-gray-600 mb-4">
                Kami percaya pada kekuatan kualitas, layanan pelanggan, dan inovasi. Setiap produk
                yang kami tawarkan dipilih dengan hati-hati untuk memastikan memenuhi standar keunggulan kami.
              </p>
              <p className="text-gray-600">
                Hari ini, kami bangga melayani komunitas pelanggan yang beragam yang berbagi nilai-nilai kami
                dan menghargai komitmen kami terhadap kualitas dan layanan.
              </p>
            </div>
            <div className="bg-gradient-to-br overflow-hidden relative from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center h-80">
              <Image src={`/images/office_image/office-image.jpg`} alt='gambar office' width={800} height={680} className='w-full h-full object-cover'/>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-sm p-8 bg-gradient-to-br from-blue-50 to-blue-100">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Misi Kami</h3>
              <p className="text-blue-800">
                Menyediakan pelanggan dengan produk berkualitas tinggi, layanan luar biasa, dan pengalaman
                berbelanja yang mulus yang melebihi harapan dan membangun hubungan jangka panjang.
              </p>
            </Card>
            <Card className="border-0 shadow-sm p-8 bg-gradient-to-br from-indigo-50 to-indigo-100">
              <h3 className="text-2xl font-bold text-indigo-900 mb-4">Visi Kami</h3>
              <p className="text-indigo-800">
                Menjadi platform e-commerce yang paling berpusat pada pelanggan di dunia, yang dikenal karena inovasi,
                kualitas, dan komitmen yang teguh terhadap kepuasan pelanggan.
              </p>
            </Card>
          </div>
        </section>

        {/* Values */}
        <section className="bg-gradient-to-b from-white to-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Nilai Inti Kami</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="border-0 shadow-sm p-8 text-center">
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Berdasarkan Angka</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '50K+', label: 'Pelanggan Puas' },
              { number: '100K+', label: 'Produk Terjual' },
              { number: '98%', label: 'Tingkat Kepuasan' },
              { number: '6', label: 'Tahun Berdiri' },
            ].map((stat, index) => (
              <Card key={index} className="border-0 shadow-sm p-6 text-center">
                <p className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</p>
                <p className="text-gray-600 font-semibold">{stat.label}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="bg-gradient-to-b from-white to-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Perjalanan Kami</h2>
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {milestone.year}
                  </div>
                  <div className="flex-1">
                    <Card className="border-0 shadow-sm p-6">
                      <h3 className="text-xl font-bold text-gray-900">{milestone.event}</h3>
                      <p className="text-gray-600 mt-2">
                        Saat yang pivotal dalam sejarah perusahaan kami
                      </p>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Kenal Tim Kami</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border-0 shadow-sm p-8 text-center">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-gradient-to-b from-white to-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Mengapa Memilih ShopHub?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Produk berkualitas premium yang dipilih dengan hati-hati',
                'Pengiriman cepat dan andal ke seluruh dunia',
                'Dukungan pelanggan 24/7 yang luar biasa',
                'Jaminan uang kembali 30 hari',
                'Pembayaran aman dengan enkripsi SSL',
                'Penjualan reguler dan penawaran eksklusif',
              ].map((reason, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-700 font-semibold">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-lg p-12 bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Siap Berbelanja?</h2>
              <p className="text-blue-100 mb-8">
                Temukan ribuan produk berkualitas yang dikurasi khusus untuk Anda
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products">
                  <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 h-12 font-semibold">
                    Jelajahi Produk
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="border-white text-blue-600 hover:bg-white/30 px-8 h-12 font-semibold">
                    Kembali ke Beranda
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </section>

        {/* Contact */}
        <section className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Hubungi Kami</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-sm p-6 text-center">
              <p className="text-3xl mb-3">✉️</p>
              <h3 className="font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">support@shophub.com</p>
            </Card>
            <Card className="border-0 shadow-sm p-6 text-center">
              <p className="text-3xl mb-3">📞</p>
              <h3 className="font-bold text-gray-900 mb-2">Telepon</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </Card>
            <Card className="border-0 shadow-sm p-6 text-center">
              <p className="text-3xl mb-3">📍</p>
              <h3 className="font-bold text-gray-900 mb-2">Alamat</h3>
              <p className="text-gray-600">123 Commerce St, NY 10001</p>
            </Card>
          </div>
        </section>
      </main>
    </>
  );
}
