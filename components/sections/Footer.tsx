'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 group mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="font-bold text-xl text-white">ShopHub</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Toko online terpercaya dengan jutaan produk berkualitas dan harga terbaik.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Kategori */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Kategori</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Elektronik
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Fashion
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Rumah & Dapur
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Olahraga & Outdoor
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Kecantikan & Perawatan
                </Link>
              </li>
            </ul>
          </div>

          {/* Layanan */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Layanan</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Pusat Bantuan
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Bantuan */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Bantuan</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Cara Berbelanja
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Pembayaran
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Pengiriman
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Pengembalian Barang
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Garansi
                </Link>
              </li>
            </ul>
          </div>

          {/* Hubungi Kami */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Hubungi Kami</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={20} className="text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm">+62 812 3456 7890</p>
                  <p className="text-xs text-gray-500">Senin - Jumat, 08:00 - 18:00</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={20} className="text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm">support@shophub.com</p>
                  <p className="text-xs text-gray-500">Respon dalam 24 jam</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm">Jl. Teknologi No. 123</p>
                  <p className="text-xs text-gray-500">Jakarta, Indonesia</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Newsletter */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 mb-8">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-white text-2xl font-bold mb-2">Berlangganan Newsletter</h3>
            <p className="text-blue-100 mb-4">
              Dapatkan penawaran eksklusif, tips belanja, dan update produk terbaru langsung ke email Anda
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="flex-1 px-4 py-3 rounded-lg focus:outline-none"
              />
              <button className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors">
                Berlangganan
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Payment Methods */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4">Metode Pembayaran</h4>
              <div className="flex flex-wrap gap-2">
                <div className="bg-gray-800 px-3 py-2 rounded text-xs text-gray-400">💳 Kartu Kredit</div>
                <div className="bg-gray-800 px-3 py-2 rounded text-xs text-gray-400">🏦 Transfer Bank</div>
                <div className="bg-gray-800 px-3 py-2 rounded text-xs text-gray-400">📱 E-Wallet</div>
                <div className="bg-gray-800 px-3 py-2 rounded text-xs text-gray-400">💰 Cicilan</div>
              </div>
            </div>

            {/* Shipping Partners */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4">Mitra Pengiriman</h4>
              <div className="flex flex-wrap gap-2">
                <div className="bg-gray-800 px-3 py-2 rounded text-xs text-gray-400">📦 JNE</div>
                <div className="bg-gray-800 px-3 py-2 rounded text-xs text-gray-400">🚚 Gojek</div>
                <div className="bg-gray-800 px-3 py-2 rounded text-xs text-gray-400">🏍️ Grab</div>
                <div className="bg-gray-800 px-3 py-2 rounded text-xs text-gray-400">✈️ J&T</div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4">Sertifikasi</h4>
              <div className="flex flex-wrap gap-2">
                <div className="bg-gray-800 px-3 py-2 rounded text-xs text-gray-400">🔒 Secure SSL</div>
                <div className="bg-gray-800 px-3 py-2 rounded text-xs text-gray-400">✓ Terverifikasi</div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-8 border-t border-gray-800">
            <p className="text-gray-500 text-sm">
              © {currentYear} ShopHub Indonesia. Hak Cipta Dilindungi. Semua hak dilindungi.
            </p>
            <p className="text-gray-600 text-xs mt-2">
              Made with ❤️ by ShopHub Team | Kualitas Terbaik, Harga Kompetitif
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110 z-40"
      >
        ↑
      </button>
    </footer>
  );
}
