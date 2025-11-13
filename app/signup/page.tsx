'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Mail, Lock, Eye, EyeOff, User, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '@/lib/store/authStore';

export default function SignupPage() {
  const router = useRouter();
  const { signup, isLoading, error, clearError } = useAuthStore();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setLocalError('');

    // Calculate password strength
    if (name === 'password') {
      let strength = 0;
      if (value.length >= 8) strength++;
      if (/[a-z]/.test(value) && /[A-Z]/.test(value)) strength++;
      if (/[0-9]/.test(value)) strength++;
      if (/[^a-zA-Z0-9]/.test(value)) strength++;
      setPasswordStrength(strength);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    setSuccessMessage('');

    // Validation
    if (!formData.firstName.trim()) {
      setLocalError('First name is required');
      return;
    }

    if (!formData.email.trim()) {
      setLocalError('Email is required');
      return;
    }

    if (!formData.email.includes('@')) {
      setLocalError('Please enter a valid email');
      return;
    }

    if (!formData.password) {
      setLocalError('Password is required');
      return;
    }

    if (formData.password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    try {
      await signup(formData.email, formData.password, formData.firstName, formData.lastName);
      setSuccessMessage('Account created successfully! Redirecting...');
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (err: any) {
      setLocalError(err.message || 'Signup failed');
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-gray-300';
    if (passwordStrength === 1) return 'bg-red-500';
    if (passwordStrength === 2) return 'bg-yellow-500';
    if (passwordStrength === 3) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength === 1) return 'Weak';
    if (passwordStrength === 2) return 'Fair';
    if (passwordStrength === 3) return 'Good';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4 py-12">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back button */}
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to home
        </Link>

        <Card className="border-0 shadow-2xl">
          <div className="p-8 sm:p-10">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl font-bold">SH</span>
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-2">
                Create account
              </h1>
              <p className="text-center text-gray-600">
                Join us and start shopping today
              </p>
            </div>

            {/* Alert messages */}
            {(error || localError) && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-red-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
                <p className="text-sm text-red-700">
                  {error || localError}
                </p>
              </div>
            )}

            {successMessage && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-700">
                  {successMessage}
                </p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="pl-10 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="pl-10 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="pl-10 pr-10 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Password strength indicator */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-gray-600">Password strength</span>
                      <span className={`text-xs font-medium ${passwordStrength === 1 ? 'text-red-600' :
                          passwordStrength === 2 ? 'text-yellow-600' :
                            passwordStrength === 3 ? 'text-blue-600' :
                              'text-green-600'
                        }`}>
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                        style={{ width: `${(passwordStrength / 4) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="pl-10 pr-10 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start">
                <input
                  id="terms"
                  type="checkbox"
                  disabled={isLoading}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 mt-0.5"
                  required
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  I agree to the{' '}
                  <Link href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 mt-6"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating account...
                  </div>
                ) : (
                  'Create account'
                )}
              </Button>
            </form>

            {/* Footer */}
            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </Card>

        {/* Footer info */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Your data is protected with 256-bit encryption
        </p>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
