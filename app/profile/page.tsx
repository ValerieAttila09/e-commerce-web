'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { User, Mail, Phone, MapPin, LogOut, Edit2, Save, X } from 'lucide-react';
import { useAuthStore } from '@/lib/store/authStore';

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, updateUser, isLoading } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phoneNumber: user?.phoneNumber || '',
    address: user?.address || '',
  });
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    updateUser(editData);
    setSaveMessage('Profile updated successfully!');
    setIsEditing(false);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User';

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            ← Back to home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account information</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div>
            <Card className="border border-neutral-100 shadow-sm p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{fullName}</h2>
              <p className="text-gray-600 text-sm mt-1">{user.email}</p>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-600 font-semibold">Member since 2024</p>
              </div>
            </Card>

            {/* Stats */}
            <div className="mt-6 space-y-3">
              <Card className="border border-neutral-100 shadow-sm p-4">
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </Card>
              <Card className="border border-neutral-100 shadow-sm p-4">
                <p className="text-sm text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">$0.00</p>
              </Card>
            </div>
          </div>

          {/* Main content */}
          <div className="md:col-span-2">
            {/* Success message */}
            {saveMessage && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <span className="text-lg">✓</span>
                <p className="text-sm text-green-700">{saveMessage}</p>
              </div>
            )}

            {/* Personal Information */}
            <Card className="border border-neutral-100 shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={editData.firstName}
                        onChange={handleEditChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={editData.lastName}
                        onChange={handleEditChange}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      value={editData.phoneNumber}
                      onChange={handleEditChange}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={editData.address}
                      onChange={handleEditChange}
                      className="mt-1"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </Button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditData({
                          firstName: user.firstName || '',
                          lastName: user.lastName || '',
                          phoneNumber: user.phoneNumber || '',
                          address: user.address || '',
                        });
                      }}
                      className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <User className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-semibold text-gray-900">{fullName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-semibold text-gray-900">{user.email}</p>
                    </div>
                  </div>

                  {user.phoneNumber && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-semibold text-gray-900">{user.phoneNumber}</p>
                      </div>
                    </div>
                  )}

                  {user.address && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">Address</p>
                        <p className="font-semibold text-gray-900">{user.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>

            {/* Account Information */}
            <Card className="border border-neutral-100 shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Account Information</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Account Type</p>
                    <p className="font-semibold text-gray-900">Customer</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                    {user.role}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Account Status</p>
                    <p className="font-semibold text-gray-900">Active</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    Active
                  </span>
                </div>
              </div>
            </Card>

            {/* Danger Zone */}
            <Card className="border border-red-200 shadow-sm p-6 bg-red-50 relative overflow-hidden">
              <h2 className="text-xl font-bold text-red-900 mb-4">Danger Zone</h2>
              <Button
                onClick={handleLogout}
                disabled={isLoading}
                className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                {isLoading ? 'Signing out...' : 'Sign out'}
              </Button>
              <p className="text-sm text-red-700 mt-3">
                You will be logged out and redirected to the home page.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
