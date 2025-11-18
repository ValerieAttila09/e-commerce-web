'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface Product {
  id: number;
  name: string;
  totalSold: number;
}

interface ChartData {
  topProducts: Product[];
  categories: any[];
}

export default function AnalyticsCharts() {
  const [chartData, setChartData] = useState<ChartData>({ topProducts: [], categories: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch('/api/admin/analytics');
        const data = await response.json();
        setChartData({
          topProducts: data.topProducts || [],
          categories: data.categories || [],
        });
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChartData();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="h-80 bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top Products Chart */}
      <Card className="border-0 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Top Selling Products</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData.topProducts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="totalSold" fill="#3b82f6" name="Units Sold" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Categories Chart */}
      <Card className="border-0 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Products by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData.categories.map((cat) => ({
              name: cat.name,
              count: cat._count?.products || 0,
            }))}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8b5cf6" name="Product Count" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
