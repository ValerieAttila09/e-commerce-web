'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface Coupon {
  id?: number;
  code: string;
  description?: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  maxUses: number;
  minOrderValue: number;
  expiryDate?: string;
  isActive?: boolean;
}

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (coupon: Coupon) => Promise<void>;
  coupon?: Coupon | null;
}

export default function CouponModal({
  isOpen,
  onClose,
  onSave,
  coupon,
}: CouponModalProps) {
  const [formData, setFormData] = useState<Coupon>({
    code: '',
    description: '',
    discountType: 'percentage',
    discountValue: 0,
    maxUses: -1,
    minOrderValue: 0,
    expiryDate: '',
    isActive: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (coupon) {
      setFormData({
        ...coupon,
        expiryDate: coupon.expiryDate
          ? new Date(coupon.expiryDate).toISOString().split('T')[0]
          : '',
      });
    } else {
      setFormData({
        code: '',
        description: '',
        discountType: 'percentage',
        discountValue: 0,
        maxUses: -1,
        minOrderValue: 0,
        expiryDate: '',
        isActive: true,
      });
    }
  }, [coupon, isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'discountValue' || name === 'maxUses' || name === 'minOrderValue'
          ? parseFloat(value)
          : value.toUpperCase(),
    }));
  };

  const handleDiscountTypeChange = (value: 'percentage' | 'fixed') => {
    setFormData((prev) => ({
      ...prev,
      discountType: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.code || !formData.discountValue || !formData.discountType) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      setIsLoading(true);
      await onSave(formData);
      setFormData({
        code: '',
        description: '',
        discountType: 'percentage',
        discountValue: 0,
        maxUses: -1,
        minOrderValue: 0,
        expiryDate: '',
        isActive: true,
      });
      onClose();
    } catch (error) {
      console.error('Error saving coupon:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{coupon ? 'Edit Coupon' : 'Add New Coupon'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Code */}
          <div>
            <Label htmlFor="code">Coupon Code *</Label>
            <Input
              id="code"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              placeholder="E.g., SAVE10"
              disabled={isLoading}
              maxLength={20}
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleInputChange}
              placeholder="Enter coupon description"
              disabled={isLoading}
              rows={2}
            />
          </div>

          {/* Discount Type */}
          <div>
            <Label htmlFor="discountType">Discount Type *</Label>
            <Select
              value={formData.discountType}
              onValueChange={handleDiscountTypeChange}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Percentage (%)</SelectItem>
                <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Discount Value */}
          <div>
            <Label htmlFor="discountValue">
              Discount Value * {formData.discountType === 'percentage' ? '(%)' : '($)'}
            </Label>
            <Input
              id="discountValue"
              name="discountValue"
              type="number"
              step="0.01"
              value={formData.discountValue}
              onChange={handleInputChange}
              placeholder="0.00"
              disabled={isLoading}
            />
          </div>

          {/* Min Order Value */}
          <div>
            <Label htmlFor="minOrderValue">Minimum Order Value ($)</Label>
            <Input
              id="minOrderValue"
              name="minOrderValue"
              type="number"
              step="0.01"
              value={formData.minOrderValue}
              onChange={handleInputChange}
              placeholder="0.00"
              disabled={isLoading}
            />
          </div>

          {/* Max Uses */}
          <div>
            <Label htmlFor="maxUses">Max Uses (-1 for unlimited)</Label>
            <Input
              id="maxUses"
              name="maxUses"
              type="number"
              value={formData.maxUses}
              onChange={handleInputChange}
              placeholder="-1"
              disabled={isLoading}
            />
          </div>

          {/* Expiry Date */}
          <div>
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input
              id="expiryDate"
              name="expiryDate"
              type="date"
              value={formData.expiryDate || ''}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {coupon ? 'Update' : 'Add'} Coupon
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
