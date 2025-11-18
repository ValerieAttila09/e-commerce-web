'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { Loader2, Package, ShoppingCart, TrendingUp, AlertCircle } from 'lucide-react';
import Navbar from '@/components/sections/Navbar';
import DashboardStats from '@/components/sections/admin/DashboardStats';
import ProductsManagement from '@/components/sections/admin/ProductsManagement';
import CouponsManagement from '@/components/sections/admin/CouponsManagement';
import AnalyticsCharts from '@/components/sections/admin/AnalyticsCharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, checkAuth, isLoading: authLoading } = useAuthStore();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
    };
    verifyAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.role !== 'admin') {
        router.push('/');
      } else {
        setIsAuthorized(true);
      }
      setIsLoadingData(false);
    }
  }, [user, authLoading, router]);

  if (authLoading || isLoadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <Card className="border-0 shadow-lg max-w-md p-8">
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700 font-semibold">
              Access Denied - Admin privileges required
            </AlertDescription>
          </Alert>
        </Card>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage products, coupons, and analyze business metrics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Statistics */}
        <div className="mb-8">
          <DashboardStats />
        </div>

        {/* Analytics Charts */}
        <div className="mb-8">
          <AnalyticsCharts />
        </div>

        {/* Tabs for Management */}
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="coupons" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Coupons
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-6">
            <ProductsManagement />
          </TabsContent>

          <TabsContent value="coupons" className="mt-6">
            <CouponsManagement />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
