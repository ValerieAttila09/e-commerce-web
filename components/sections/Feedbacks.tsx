'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Send } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Feedbacks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const feedbacksRef = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [newFeedback, setNewFeedback] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newFeedback.name || !newFeedback.email || !newFeedback.message) {
      alert('Mohon isi semua field yang diperlukan')
      return
    }

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newFeedback, category: 'Feedback' }),
      })

      const data = await res.json()

      if (!res.ok) {
        const errorMsg = data?.error || `Error: ${res.status}`
        console.error('[Feedbacks] Submit failed:', errorMsg, data)
        alert(`Gagal mengirim feedback: ${errorMsg}`)
        return
      }

      console.log('[Feedbacks] Feedback berhasil dikirim:', data.id)
      setFeedbacks((prev) => [data, ...prev])
      setNewFeedback({ name: '', email: '', message: '' })
      alert('Feedback berhasil dikirim! Terima kasih.')
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error)
      console.error('[Feedbacks] Submit error:', msg)
      alert(`Error: ${msg}`)
    }
  };

  useEffect(() => {
    // fetch feedbacks from API
    let mounted = true
      ; (async () => {
        try {
          setLoading(true)
          const res = await fetch('/api/feedback')
          if (!res.ok) return
          const data = await res.json()
          if (mounted) setFeedbacks(data)
        } catch (error) {
          console.error('Failed to load feedbacks', error)
        } finally {
          if (mounted) setLoading(false)
        }
      })()

    const ctx = gsap.context(() => {
      // Form entrance from left
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 55%',
            scrub: false,
            markers: false,
          },
        }
      );

      // Feedbacks staggered entrance from right
      gsap.fromTo(
        feedbacksRef.current,
        {
          opacity: 0,
          x: 60,
          rotateY: -15,
        },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: false,
            markers: false,
          },
        }
      );

      // Stats counter animation
      gsap.fromTo(
        statsRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'bottom 25%',
            end: 'bottom 10%',
            scrub: false,
            markers: false,
          },
        }
      );
    }, sectionRef);

    return () => {
      mounted = false
      ctx.revert()
    }
  }, []);

  return (
    <section ref={sectionRef} id="feedback" className="py-20 md:py-32 bg-gradient-to-br from-blue-50 to-indigo-50">
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
          <div ref={formRef} className="lg:col-span-1">
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
            {loading ? (
              <Card className="p-8 text-center border border-gray-200 bg-white">
                <p className="text-gray-500">Memuat feedback...</p>
              </Card>
            ) : feedbacks.length > 0 ? (
              feedbacks.map((feedback, index) => (
                <div
                  key={feedback.id}
                  ref={(el) => {
                    if (el) feedbacksRef.current[index] = el
                  }}
                >
                  <Card className="p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 bg-white">
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
                      <span className="text-xs text-gray-500">{new Date(feedback.createdAt).toLocaleString()}</span>
                      <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                        👍 Setuju
                      </button>
                    </div>
                  </Card>
                </div>
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
          {[
            { value: `${feedbacks.length}+`, label: 'Feedback Diterima', color: 'blue' },
            { value: '95%', label: 'Kepuasan Pelanggan', color: 'green' },
            { value: '48 Jam', label: 'Response Time', color: 'purple' },
          ].map((stat, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) statsRef.current[index] = el;
              }}
            >
              <Card className={`p-8 text-center bg-white border border-gray-200 hover:shadow-lg transition-shadow bg-gradient-to-br ${stat.color === 'blue'
                ? 'from-blue-50 to-blue-100'
                : stat.color === 'green'
                  ? 'from-green-50 to-green-100'
                  : 'from-purple-50 to-purple-100'
                }`}>
                <p
                  className={`text-4xl font-bold mb-2 ${stat.color === 'blue'
                    ? 'text-blue-600'
                    : stat.color === 'green'
                      ? 'text-green-600'
                      : 'text-purple-600'
                    }`}
                >
                  {stat.value}
                </p>
                <p className="text-gray-600">{stat.label}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
