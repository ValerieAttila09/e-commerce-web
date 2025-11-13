'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, CheckCircle2, Users, Award, Heart } from 'lucide-react';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'John Doe',
      role: 'CEO & Founder',
      image: '👨‍💼',
      bio: 'Visionary leader with 10+ years in e-commerce',
    },
    {
      name: 'Sarah Smith',
      role: 'CTO',
      image: '👩‍💻',
      bio: 'Tech expert passionate about innovation',
    },
    {
      name: 'Mike Johnson',
      role: 'Head of Sales',
      image: '👨‍💼',
      bio: 'Customer-focused sales professional',
    },
    {
      name: 'Emma Wilson',
      role: 'Head of Operations',
      image: '👩‍💼',
      bio: 'Operations excellence specialist',
    },
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: 'Customer First',
      description: 'We prioritize customer satisfaction in everything we do',
    },
    {
      icon: <Award className="w-8 h-8 text-yellow-500" />,
      title: 'Quality',
      description: 'High-quality products and services are our standard',
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: 'Community',
      description: 'Building a strong community of loyal customers',
    },
  ];

  const milestones = [
    { year: '2018', event: 'Company Founded' },
    { year: '2020', event: '10,000+ Customers' },
    { year: '2022', event: 'Million Dollar Milestone' },
    { year: '2024', event: 'Global Expansion' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About ShopHub</h1>
          <p className="text-xl text-gray-600">
            Your trusted destination for premium products and exceptional service since 2018
          </p>
        </div>
      </section>

      {/* Hero section with story */}
      <section className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2018, ShopHub started with a simple mission: to make quality products
              accessible to everyone. What began as a small startup has grown into a thriving
              e-commerce platform trusted by thousands of customers worldwide.
            </p>
            <p className="text-gray-600 mb-4">
              We believe in the power of quality, customer service, and innovation. Every product
              we offer is carefully selected to ensure it meets our high standards for excellence.
            </p>
            <p className="text-gray-600">
              Today, we're proud to serve a diverse community of customers who share our values
              and appreciate our commitment to quality and service.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8 flex items-center justify-center h-80">
            <div className="text-7xl">🏢</div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-0 shadow-sm p-8 bg-gradient-to-br from-blue-50 to-blue-100">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Our Mission</h3>
            <p className="text-blue-800">
              To provide customers with high-quality products, exceptional service, and a seamless
              shopping experience that exceeds expectations and builds lasting relationships.
            </p>
          </Card>
          <Card className="border-0 shadow-sm p-8 bg-gradient-to-br from-indigo-50 to-indigo-100">
            <h3 className="text-2xl font-bold text-indigo-900 mb-4">Our Vision</h3>
            <p className="text-indigo-800">
              To become the world's most customer-centric e-commerce platform, known for innovation,
              quality, and unwavering commitment to customer satisfaction.
            </p>
          </Card>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Core Values</h2>
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
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">By The Numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: '50K+', label: 'Happy Customers' },
            { number: '100K+', label: 'Products Sold' },
            { number: '98%', label: 'Satisfaction Rate' },
            { number: '6', label: 'Years Strong' },
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
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Journey</h2>
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
                      A pivotal moment in our company's history
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
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet Our Team</h2>
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
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose ShopHub?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              'Premium quality products carefully selected',
              'Fast and reliable shipping worldwide',
              'Exceptional 24/7 customer support',
              '30-day money-back guarantee',
              'Secure payment with SSL encryption',
              'Regular sales and exclusive offers',
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
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Shop?</h2>
            <p className="text-blue-100 mb-8">
              Discover thousands of quality products curated just for you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 h-12 font-semibold">
                  Browse Products
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 h-12 font-semibold">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </section>

      {/* Contact */}
      <section className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Get in Touch</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-sm p-6 text-center">
            <p className="text-3xl mb-3">✉️</p>
            <h3 className="font-bold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600">support@shophub.com</p>
          </Card>
          <Card className="border-0 shadow-sm p-6 text-center">
            <p className="text-3xl mb-3">📞</p>
            <h3 className="font-bold text-gray-900 mb-2">Phone</h3>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </Card>
          <Card className="border-0 shadow-sm p-6 text-center">
            <p className="text-3xl mb-3">📍</p>
            <h3 className="font-bold text-gray-900 mb-2">Address</h3>
            <p className="text-gray-600">123 Commerce St, NY 10001</p>
          </Card>
        </div>
      </section>
    </main>
  );
}
