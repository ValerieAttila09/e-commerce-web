'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Search, ShoppingCart, Heart, Star, Filter, Grid3X3, List } from 'lucide-react';
import { useCartStore } from '@/lib/store/cartStore';

// Sample products data
const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 199.99,
    originalPrice: 299.99,
    category: 'Electronics',
    rating: 4.8,
    reviews: 234,
    image: '🎧',
    inStock: true,
    description: 'High-quality wireless headphones with noise cancellation',
  },
  {
    id: 2,
    name: 'Smart Watch Pro',
    price: 299.99,
    originalPrice: 399.99,
    category: 'Wearables',
    rating: 4.6,
    reviews: 189,
    image: '⌚',
    inStock: true,
    description: 'Advanced fitness tracking and notifications',
  },
  {
    id: 3,
    name: 'USB-C Fast Charger',
    price: 49.99,
    originalPrice: 79.99,
    category: 'Accessories',
    rating: 4.9,
    reviews: 512,
    image: '🔌',
    inStock: true,
    description: 'Fast charging with multiple ports',
  },
  {
    id: 4,
    name: 'Wireless Mouse',
    price: 39.99,
    originalPrice: 59.99,
    category: 'Accessories',
    rating: 4.5,
    reviews: 156,
    image: '🖱️',
    inStock: true,
    description: 'Ergonomic wireless mouse',
  },
  {
    id: 5,
    name: 'Portable Speaker',
    price: 89.99,
    originalPrice: 129.99,
    category: 'Electronics',
    rating: 4.7,
    reviews: 267,
    image: '🔊',
    inStock: true,
    description: 'Waterproof portable speaker',
  },
  {
    id: 6,
    name: 'Phone Stand',
    price: 19.99,
    originalPrice: 29.99,
    category: 'Accessories',
    rating: 4.4,
    reviews: 89,
    image: '📱',
    inStock: true,
    description: 'Adjustable phone stand',
  },
  {
    id: 7,
    name: 'Laptop Bag',
    price: 79.99,
    originalPrice: 119.99,
    category: 'Bags',
    rating: 4.6,
    reviews: 178,
    image: '👜',
    inStock: true,
    description: 'Professional laptop bag',
  },
  {
    id: 8,
    name: 'USB Hub',
    price: 59.99,
    originalPrice: 89.99,
    category: 'Accessories',
    rating: 4.5,
    reviews: 134,
    image: '🔀',
    inStock: false,
    description: '7-in-1 USB hub',
  },
];

const CATEGORIES = ['All', 'Electronics', 'Accessories', 'Wearables', 'Bags'];

export default function ProductsPage() {
  const { addItem } = useCartStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [wishlist, setWishlist] = useState<number[]>([]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = SAMPLE_PRODUCTS;

    // Filter by category
    if (selectedCategory !== 'All') {
      products = products.filter((p) => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        products = [...products].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products = [...products].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products = [...products].sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        products = [...products].reverse();
        break;
      default:
        break;
    }

    return products;
  }, [selectedCategory, searchQuery, sortBy]);

  const handleAddToCart = (product: any) => {
    addItem(product);
  };

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const discount = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Products</h1>
            <p className="text-gray-600">Discover our amazing collection of products</p>
          </div>

          {/* Search bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 bg-white shadow-lg border-0 rounded-lg h-12"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-48 flex-shrink-0">
            {/* Categories */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5 text-blue-600" />
                Categories
              </h3>
              <div className="space-y-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${selectedCategory === category
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rating</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {/* Results header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing <strong>{filteredProducts.length}</strong> products
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'grid'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'list'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Products grid/list */}
            {filteredProducts.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    className={`group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 ${viewMode === 'list'
                        ? 'flex gap-4 p-4'
                        : ''
                      }`}
                  >
                    {/* Product image */}
                    <div
                      className={`relative bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden ${viewMode === 'list'
                          ? 'w-32 h-32 flex-shrink-0 rounded-lg'
                          : 'w-full h-48 rounded-lg'
                        }`}
                    >
                      <div className="text-6xl">{product.image}</div>

                      {/* Discount badge */}
                      {product.originalPrice > product.price && (
                        <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          -{discount(product.originalPrice, product.price)}%
                        </div>
                      )}

                      {/* Stock badge */}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-bold">Out of Stock</span>
                        </div>
                      )}

                      {/* Wishlist button */}
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className={`absolute top-3 left-3 p-2 rounded-full transition-all ${wishlist.includes(product.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                          }`}
                      >
                        <Heart
                          className="w-5 h-5"
                          fill={wishlist.includes(product.id) ? 'currentColor' : 'none'}
                        />
                      </button>
                    </div>

                    {/* Product info */}
                    <div className={viewMode === 'list' ? 'flex-1' : 'p-4'}>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                          {product.name}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(product.rating)
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-300'
                                  }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="text-xl font-bold text-gray-900">
                            ${product.price}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="text-sm text-gray-500 line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Add to cart button */}
                      <Button
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock}
                        className={`w-full h-10 rounded-lg font-semibold transition-all ${product.inStock
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-gray-200 text-gray-500'
                          }`}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600 mb-4">No products found</p>
                <Button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
