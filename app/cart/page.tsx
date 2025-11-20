'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import Navbar from '@/components/sections/Navbar';
import { useCartStore } from '@/lib/store/cartStore';
import Image from 'next/image';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotal, getItemCount } = useCartStore();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const handlePromoCode = () => {
    if (promoCode.toUpperCase() === 'SAVE10') {
      setPromoApplied(true);
    }
  };

  const subtotal = getTotal();
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = (subtotal - discount) * 0.1;
  const total = subtotal - discount + shipping + tax;

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r pt-26 md:pt-32 pb-12 md:pb-18 from-blue-50 to-indigo-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue shopping
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">
            You have <strong>{getItemCount()}</strong> item{getItemCount() !== 1 ? 's' : ''} in your cart
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-sm divide-y">
                {items.map((item) => (
                  <div key={item.id} className="p-6 flex gap-6">
                    {/* Product image */}
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Image src={`/images/products_image/${item.image}`} alt={`${item.image}`} width={500} height={500} className='w-full h-full object-cover'/>
                    </div>

                    {/* Product info */}
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">SKU: #{item.productId}</p>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="w-8 text-center font-semibold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>

                    {/* Price and remove */}
                    <div className="flex flex-col items-end">
                      <div className="text-right mb-4">
                        <p className="text-sm text-gray-600 mb-1">
                          ${item.price.toFixed(2)} each
                        </p>
                        <p className="text-xl font-bold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </Card>

              {/* Promo code */}
              <div className="mt-6 flex gap-3">
                <Input
                  type="text"
                  placeholder="Enter promo code (try SAVE10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  disabled={promoApplied}
                  className="bg-gray-50 border-gray-200"
                />
                <Button
                  onClick={handlePromoCode}
                  disabled={!promoCode || promoApplied}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                >
                  Apply
                </Button>
              </div>

              {promoApplied && (
                <div className="mt-3 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                  <span className="text-green-700 font-semibold">✓ Promo code applied successfully</span>
                  <button
                    onClick={() => {
                      setPromoApplied(false);
                      setPromoCode('');
                    }}
                    className="text-green-600 hover:text-green-700 text-sm font-semibold"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Summary */}
            <div>
              <Card className="border-0 shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (10%)</span>
                      <span className="font-semibold">-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold text-gray-900">
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-blue-600">${total.toFixed(2)}</span>
                </div>

                <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg">
                  Proceed to Checkout
                </Button>

                <button
                  onClick={() => clearCart()}
                  className="w-full mt-3 py-2 text-red-600 hover:bg-red-50 rounded-lg font-semibold transition-colors"
                >
                  Clear Cart
                </button>

                {/* Info boxes */}
                <div className="mt-6 space-y-3">
                  <div className="flex gap-3 p-3 bg-blue-50 rounded-lg">
                    <span className="text-lg">🚚</span>
                    <div className="text-sm">
                      <p className="font-semibold text-blue-900">Free shipping</p>
                      <p className="text-blue-700">on orders over $100</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-3 bg-green-50 rounded-lg">
                    <span className="text-lg">✓</span>
                    <div className="text-sm">
                      <p className="font-semibold text-green-900">Secure checkout</p>
                      <p className="text-green-700">with SSL encryption</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Start shopping to add items to your cart</p>
            <Link href="/products">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Continue Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
