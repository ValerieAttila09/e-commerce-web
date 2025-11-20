'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart, Search, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/store/authStore';
import { useCartStore } from '@/lib/store/cartStore';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout, checkAuth } = useAuthStore();
  const { getItemCount } = useCartStore();
  const cartCount = getItemCount();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await logout();
    setIsDropdownOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-[10px]">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Image src={`/images/web_logo/web_logo.jpg`} alt='' width={40} height={40} className='rounded-lg'/>
            <span className="hidden sm:block font-bold text-xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              ShopHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Products
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              About
            </Link>
            <a href="/#reviews" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Reviews
            </a>
            <a href="/#feedback" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Feedback
            </a>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
              <Search size={20} />
            </button>
            <Link href="/cart" className="relative">
              <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors relative">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    •
                  </span>
                )}
              </button>
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <User size={20} />
                  <span className="text-sm font-medium hidden sm:inline">{user.firstName || user.email}</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                    <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 first:rounded-t-lg">
                      My Profile
                    </Link>
                    <Link href="/cart" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 last:rounded-b-lg flex items-center gap-2 border-t border-gray-200"
                    >
                      <LogOut size={16} />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    Sign in
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Link href="/cart" className="relative">
              <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    •
                  </span>
                )}
              </button>
            </Link>
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2 pt-4">
              <Link
                href="/"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/about"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <a
                href="/#reviews"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Reviews
              </a>
              <a
                href="/#feedback"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Feedback
              </a>

              {user ? (
                <>
                  <div className="border-t border-gray-200 pt-2">
                    <Link
                      href="/profile"
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <User size={18} />
                      My Profile
                    </Link>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <LogOut size={18} />
                    Sign out
                  </button>
                </>
              ) : (
                <div className="flex gap-2 px-4 pt-2 border-t border-gray-200">
                  <Link href="/login" className="flex-1">
                    <Button variant="outline" className="w-full border-blue-600 text-blue-600">
                      Sign in
                    </Button>
                  </Link>
                  <Link href="/signup" className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700">
                      Sign up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}