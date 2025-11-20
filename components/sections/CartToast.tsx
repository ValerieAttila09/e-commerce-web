'use client';

import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Toaster, toast } from 'sonner';
import { ShoppingCart, CheckCircle } from 'lucide-react';
import { useCartStore } from '@/lib/store/cartStore';

export default function CartToast() {
  const toastRef = useRef<HTMLDivElement>(null);
  const { lastAddedItem } = useCartStore();
  const hasShownRef = useRef<string | null>(null);

  useEffect(() => {
    // Jika ada item yang baru ditambahkan dan belum ditampilkan
    if (lastAddedItem && hasShownRef.current !== lastAddedItem.id) {
      hasShownRef.current = lastAddedItem.id;

      // Trigger toast notification
      const toastId = toast.custom(
        (t) => (
          <div
            ref={toastRef}
            className="flex items-center gap-3 bg-green-100 text-white px-4 py-3 rounded-lg shadow-lg border border-green-400"
          >
            <CheckCircle className="w-5 h-5 flex-shrink-0" color={"#15803d"} />
            <div className="flex-1 me-10">
              <p className="font-semibold text-green-700 text-md">{lastAddedItem.name}</p>
              <p className="text-xs text-green-600">Ditambahkan ke cart</p>
            </div>
            <ShoppingCart className="w-4 h-4 flex-shrink-0" color={"#15803d"} />
          </div>
        ),
        {
          duration: 3000, // 4 detik
        }
      );
    }
  }, [lastAddedItem]);

  useGSAP(() => {
    if (toastRef.current) {
      // Animasi masuk
      gsap.from(toastRef.current, {
        duration: 0.5,
        x: 300,
        opacity: 0,
        ease: 'back.out',
      });

      // Animasi keluar setelah 4 detik
      gsap.to(toastRef.current, {
        duration: 0.5,
        delay: 3.5,
        x: 300,
        opacity: 0,
        ease: 'back.in',
      });
    }
  }, { scope: toastRef });

  return <Toaster position="bottom-right" />;
}
