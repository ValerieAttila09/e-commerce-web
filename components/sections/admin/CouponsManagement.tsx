'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import CouponModal from './CouponModal';
import { toast } from 'sonner';
import { Plus, Edit2, Trash2, AlertCircle, Tag } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Switch } from '@/components/ui/switch';

interface Coupon {
  id: number;
  code: string;
  description?: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  maxUses: number;
  currentUses: number;
  minOrderValue: number;
  expiryDate?: string;
  isActive: boolean;
  createdAt: string;
}

export default function CouponsManagement() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id?: number }>({
    open: false,
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await fetch('/api/admin/coupons');
      const data = await response.json();
      setCoupons(data);
    } catch (error) {
      console.error('Error fetching coupons:', error);
      toast.error('Failed to load coupons');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCoupon = () => {
    setSelectedCoupon(null);
    setIsModalOpen(true);
  };

  const handleEditCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setIsModalOpen(true);
  };

  const handleSaveCoupon = async (formData: any) => {
    try {
      const url = formData.id
        ? `/api/admin/coupons/${formData.id}`
        : '/api/admin/coupons';
      const method = formData.id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save coupon');
      }

      toast.success(
        formData.id ? 'Coupon updated successfully' : 'Coupon added successfully'
      );
      await fetchCoupons();
    } catch (error) {
      console.error('Error saving coupon:', error);
      toast.error('Failed to save coupon');
      throw error;
    }
  };

  const handleDeleteCoupon = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/coupons/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete coupon');
      }

      toast.success('Coupon deleted successfully');
      await fetchCoupons();
      setDeleteConfirm({ open: false });
    } catch (error) {
      console.error('Error deleting coupon:', error);
      toast.error('Failed to delete coupon');
    }
  };

  const handleToggleActive = async (coupon: Coupon) => {
    try {
      const response = await fetch(`/api/admin/coupons/${coupon.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...coupon, isActive: !coupon.isActive }),
      });

      if (!response.ok) {
        throw new Error('Failed to update coupon');
      }

      toast.success(
        coupon.isActive ? 'Coupon deactivated' : 'Coupon activated'
      );
      await fetchCoupons();
    } catch (error) {
      console.error('Error toggling coupon:', error);
      toast.error('Failed to update coupon');
    }
  };

  const isExpired = (expiryDate?: string) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  const isMaxUsesReached = (coupon: Coupon) => {
    return coupon.maxUses !== -1 && coupon.currentUses >= coupon.maxUses;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Coupons Management</h2>
          <p className="text-gray-600 text-sm mt-1">
            Create and manage discount coupons
          </p>
        </div>
        <Button onClick={handleAddCoupon} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Coupon
        </Button>
      </div>

      {/* Table */}
      <Card className="border-0 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-gray-600">Loading coupons...</p>
            </div>
          </div>
        ) : coupons.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 border-b border-gray-200">
                  <TableHead className="text-gray-700 font-semibold">Code</TableHead>
                  <TableHead className="text-gray-700 font-semibold">Discount</TableHead>
                  <TableHead className="text-gray-700 font-semibold">Min Order</TableHead>
                  <TableHead className="text-gray-700 font-semibold">Uses</TableHead>
                  <TableHead className="text-gray-700 font-semibold">Expiry</TableHead>
                  <TableHead className="text-gray-700 font-semibold">Status</TableHead>
                  <TableHead className="text-gray-700 font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coupons.map((coupon) => {
                  const expired = isExpired(coupon.expiryDate);
                  const maxReached = isMaxUsesReached(coupon);

                  return (
                    <TableRow key={coupon.id} className="hover:bg-gray-50">
                      <TableCell className="font-semibold text-gray-900">
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4 text-blue-600" />
                          {coupon.code}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {coupon.discountType === 'percentage'
                            ? `${coupon.discountValue}%`
                            : `$${coupon.discountValue}`}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        ${coupon.minOrderValue.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {coupon.maxUses === -1
                          ? 'Unlimited'
                          : `${coupon.currentUses}/${coupon.maxUses}`}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {coupon.expiryDate
                          ? new Date(coupon.expiryDate).toLocaleDateString()
                          : 'Never'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Switch
                            checked={coupon.isActive && !expired && !maxReached}
                            onCheckedChange={() => handleToggleActive(coupon)}
                            disabled={expired || maxReached}
                          />
                          {expired && (
                            <Badge variant="destructive" className="text-xs">
                              Expired
                            </Badge>
                          )}
                          {maxReached && (
                            <Badge variant="secondary" className="text-xs">
                              Max Reached
                            </Badge>
                          )}
                          {coupon.isActive && !expired && !maxReached && (
                            <Badge className="text-xs bg-green-600">
                              Active
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditCoupon(coupon)}
                            className="text-blue-600 border-blue-200 hover:bg-blue-50"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDeleteConfirm({ open: true, id: coupon.id })}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-4">No coupons found</p>
              <Button onClick={handleAddCoupon} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Add First Coupon
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Modals */}
      <CouponModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCoupon}
        coupon={selectedCoupon}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={deleteConfirm.open} onOpenChange={(open) => setDeleteConfirm({ open })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Coupon?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The coupon will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteConfirm.id && handleDeleteCoupon(deleteConfirm.id)}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
