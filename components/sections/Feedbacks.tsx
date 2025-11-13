'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';

export default function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      name: 'Eka Prasetya',
      email: 'eka@example.com',
      message: 'Saran: Tambahkan fitur wishlist yang bisa di-share dengan teman. Ide bagus!',
      category: 'Saran',
      timestamp: '2 jam yang lalu',
    },
    {
      id: 2,
      name: 'Maya Santoso',
      email: 'maya@example.com',
      message: 'Produk laptop saya sampai dengan cepat dan dalam kondisi sempurna. Sangat puas!',
      category: 'Pujian',
      timestamp: '5 jam yang lalu',
    },
    {
      id: 3,
      name: 'Rudi Hermawan',
      email: 'rudi@example.com',
      message: 'Mohon tambahkan metode pembayaran cicilan untuk produk-produk tertentu.',
      category: 'Saran',
      timestamp: '1 hari yang lalu',
    },
  ]);

  const [newFeedback, setNewFeedback] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFeedback.name && newFeedback.email && newFeedback.message) {
      setFeedbacks([
        {
          id: feedbacks.length + 1,
          ...newFeedback,
          category: 'Feedback',
          timestamp: 'Baru saja',
        },
        ...feedbacks,
      ]);
      setNewFeedback({ name: '', email: '', message: '' });
    }
  };

  return (
    <section id="feedback" className="py-20 md:py-32 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Feedback Pelanggan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Suara Anda penting bagi kami. Bagikan pengalaman, saran, atau pertanyaan Anda
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Feedback Form */}
          <div className="lg:col-span-1">
            <Card className="p-8 border border-gray-200 bg-white sticky top-32">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MessageCircle className="text-blue-600" />
                Kirim Feedback
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nama Anda
                  </label>
                  <input
                    type="text"
                    value={newFeedback.name}
                    onChange={(e) => setNewFeedback({ ...newFeedback, name: e.target.value })}
                    placeholder="Masukkan nama Anda"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Anda
                  </label>
                  <input
                    type="email"
                    value={newFeedback.email}
                    onChange={(e) => setNewFeedback({ ...newFeedback, email: e.target.value })}
                    placeholder="Masukkan email Anda"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pesan Anda
                  </label>
                  <textarea
                    value={newFeedback.message}
                    onChange={(e) => setNewFeedback({ ...newFeedback, message: e.target.value })}
                    placeholder="Tulis feedback, saran, atau pertanyaan Anda..."
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors resize-none"
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold"
                >
                  <Send size={16} className="mr-2" />
                  Kirim Feedback
                </Button>
              </form>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  💡 Feedback Anda membantu kami meningkatkan layanan dan produk.
                </p>
              </div>
            </Card>
          </div>

          {/* Feedback List */}
          <div className="lg:col-span-2 space-y-4">
            {feedbacks.length > 0 ? (
              feedbacks.map((feedback) => (
                <Card
                  key={feedback.id}
                  className="p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 bg-white"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900">{feedback.name}</h4>
                      <p className="text-xs text-gray-500">{feedback.email}</p>
                    </div>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${feedback.category === 'Pujian'
                          ? 'bg-green-100 text-green-700'
                          : feedback.category === 'Saran'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}
                    >
                      {feedback.category}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-4">{feedback.message}</p>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <span className="text-xs text-gray-500">{feedback.timestamp}</span>
                    <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                      👍 Setuju
                    </button>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-12 text-center border border-gray-200 bg-white">
                <p className="text-gray-500">Belum ada feedback. Jadilah yang pertama!</p>
              </Card>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-8 text-center bg-white border border-gray-200 hover:shadow-lg transition-shadow">
            <p className="text-4xl font-bold text-blue-600 mb-2">
              {feedbacks.reduce((sum) => sum + 1, 0)}+
            </p>
            <p className="text-gray-600">Feedback Diterima</p>
          </Card>
          <Card className="p-8 text-center bg-white border border-gray-200 hover:shadow-lg transition-shadow">
            <p className="text-4xl font-bold text-green-600 mb-2">95%</p>
            <p className="text-gray-600">Kepuasan Pelanggan</p>
          </Card>
          <Card className="p-8 text-center bg-white border border-gray-200 hover:shadow-lg transition-shadow">
            <p className="text-4xl font-bold text-purple-600 mb-2">48 Jam</p>
            <p className="text-gray-600">Response Time</p>
          </Card>
        </div>
      </div>
    </section>
  );
}
