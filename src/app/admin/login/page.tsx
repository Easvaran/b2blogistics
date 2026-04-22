'use client';

import { useState, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, User, Lock, ArrowRight, CheckCircle2, Key, Mail, RefreshCw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';

// Define the login form schema using Zod
const loginFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormInputs = z.infer<typeof loginFormSchema>;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Ensure callbackUrl is a valid, absolute path
  const callbackUrlParam = searchParams.get('callbackUrl');
  const callbackUrl = (callbackUrlParam && callbackUrlParam.startsWith('/')) ? callbackUrlParam : '/admin';
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Forgot Password States
  const [view, setView] = useState<'login' | 'forgot' | 'otp' | 'reset'>('login');
  const [resetEmail, setResetEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [resetToken, setResetToken] = useState(''); // Added this
  const [newPassword, setNewPassword] = useState('');
  const [resetError, setResetError] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setIsSubmitting(true);
    setLoginError(null);

    try {
      // Call real login API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        // Set the admin_token cookie
        // Using a cookie so the middleware can read it on the server
        // Setting for 7 days
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        document.cookie = `admin_token=${result.token}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
        
        setTimeout(() => {
          router.push(callbackUrl); // Redirect to callbackUrl or admin dashboard
        }, 1000);
      } else {
        setLoginError(result.message || 'Login failed');
      }
    } catch (error) {
      setLoginError('An unexpected error occurred. Please check your connection.');
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResetError(null);
    const emailToReset = resetEmail.toLowerCase().trim();
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailToReset }),
      });
      const data = await res.json();
      if (res.ok) {
        setResetEmail(emailToReset); // Store normalized email
        setView('otp');
      } else {
        setResetError(data.message || 'Invalid details');
      }
    } catch (error) {
      setResetError('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setResetError('Please enter a valid 6-digit OTP');
      return;
    }

    setIsSubmitting(true);
    setResetError(null);
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        setResetToken(data.resetToken);
        setView('reset');
      } else {
        setResetError(data.message || 'Verification failed');
      }
    } catch (error) {
      setResetError('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResetError(null);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail, resetToken, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setResetSuccess(true);
        setTimeout(() => {
          setView('login');
          setResetSuccess(false);
          setResetEmail('');
          setOtp('');
          setResetToken('');
          setNewPassword('');
        }, 2000);
      } else {
        setResetError(data.message || 'Failed to update password');
      }
    } catch (error) {
      setResetError('An error occurred during password reset.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        layout
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-10 border border-slate-100 dark:border-slate-700 relative overflow-hidden"
      >
        {/* Decorative background elements */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-600/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {view === 'login' && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="text-center mb-8">
                  <LogIn className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">Admin Login</h1>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">Access the B2BLOGISTICS management panel</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Email Address</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        type="email"
                        {...register('email')}
                        className={`w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-700 border-2 ${errors.email ? 'border-red-500' : 'border-transparent'} rounded-2xl focus:outline-none focus:border-blue-600 transition-colors text-slate-900 dark:text-white font-bold text-sm`}
                        placeholder="admin@b2blogistics.in"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-[10px] font-black uppercase mt-1">{errors.email.message}</p>}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Password</label>
                      <button 
                        type="button"
                        onClick={() => setView('forgot')}
                        className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-700 transition-colors"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        type="password"
                        {...register('password')}
                        className={`w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-700 border-2 ${errors.password ? 'border-red-500' : 'border-transparent'} rounded-2xl focus:outline-none focus:border-blue-600 transition-colors text-slate-900 dark:text-white font-bold text-sm`}
                        placeholder="••••••••"
                      />
                    </div>
                    {errors.password && <p className="text-red-500 text-[10px] font-black uppercase mt-1">{errors.password.message}</p>}
                  </div>

                  {/* Login Error */}
                  {loginError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 dark:bg-red-900/20 text-red-600 p-4 rounded-xl text-xs font-black uppercase tracking-wider text-center"
                    >
                      {loginError}
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white px-8 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:-translate-y-1 active:scale-95"
                  >
                    {isSubmitting ? (
                      <RefreshCw className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        Login Securely <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            )}

            {view === 'forgot' && (
              <motion.div
                key="forgot"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Key className="h-8 w-8 text-blue-600" />
                  </div>
                  <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">Forgot Password</h1>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">Enter your admin email to receive an OTP</p>
                </div>

                <form onSubmit={handleForgotPassword} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Admin Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-700 border-transparent border-2 rounded-2xl focus:outline-none focus:border-blue-600 transition-colors text-slate-900 dark:text-white font-bold text-sm"
                        placeholder="admin@b2blogistics.in"
                      />
                    </div>
                  </div>

                  {resetError && (
                    <motion.div className="bg-red-50 dark:bg-red-900/20 text-red-600 p-4 rounded-xl text-xs font-black uppercase tracking-wider text-center">
                      {resetError}
                    </motion.div>
                  )}

                  <div className="flex flex-col gap-4">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 text-white px-8 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 disabled:opacity-50 flex items-center justify-center gap-2 hover:-translate-y-1 active:scale-95"
                    >
                      {isSubmitting ? <RefreshCw className="h-5 w-5 animate-spin" /> : 'Send OTP'}
                    </motion.button>
                    <button
                      type="button"
                      onClick={() => setView('login')}
                      className="flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-slate-600 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back to Login
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {view === 'otp' && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Lock className="h-8 w-8 text-blue-600" />
                  </div>
                  <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">Verify OTP</h1>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">Enter the 6-digit code sent to your email</p>
                </div>

                <form onSubmit={handleVerifyOTP} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block text-center mb-4">Enter 6-Digit OTP</label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      className="w-full py-5 bg-slate-50 dark:bg-slate-700 border-transparent border-2 rounded-2xl focus:outline-none focus:border-blue-600 transition-colors text-slate-900 dark:text-white font-black text-3xl tracking-[0.5em] text-center"
                      placeholder="000000"
                    />
                  </div>

                  {resetError && (
                    <motion.div className="bg-red-50 dark:bg-red-900/20 text-red-600 p-4 rounded-xl text-xs font-black uppercase tracking-wider text-center">
                      {resetError}
                    </motion.div>
                  )}

                  <div className="flex flex-col gap-4">
                    <motion.button
                      type="submit"
                      className="w-full bg-blue-600 text-white px-8 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 hover:-translate-y-1 active:scale-95"
                    >
                      Verify & Continue
                    </motion.button>
                    <div className="flex justify-between items-center px-2">
                      <button
                        type="button"
                        onClick={() => setView('forgot')}
                        className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-slate-600 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" /> Change Email
                      </button>
                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        disabled={isSubmitting}
                        className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] hover:text-blue-700 transition-colors disabled:opacity-50"
                      >
                        Resend OTP
                      </button>
                    </div>
                  </div>
                </form>
              </motion.div>
            )}

            {view === 'reset' && (
              <motion.div
                key="reset"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <RefreshCw className="h-8 w-8 text-blue-600" />
                  </div>
                  <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">New Password</h1>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">Create a secure new password for your account</p>
                </div>

                <form onSubmit={handleResetPassword} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        type="password"
                        required
                        minLength={6}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-700 border-transparent border-2 rounded-2xl focus:outline-none focus:border-blue-600 transition-colors text-slate-900 dark:text-white font-bold text-sm"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  {resetError && (
                    <motion.div className="bg-red-50 dark:bg-red-900/20 text-red-600 p-4 rounded-xl text-xs font-black uppercase tracking-wider text-center">
                      {resetError}
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white px-8 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 disabled:opacity-50 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? <RefreshCw className="h-5 w-5 animate-spin" /> : 'Update Password'}
                  </motion.button>
                </form>

                <AnimatePresence>
                  {resetSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute inset-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-3xl flex items-center justify-center z-50"
                    >
                      <div className="text-center p-8">
                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                          <CheckCircle2 className="h-10 w-10 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">Success!</h3>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Your password has been updated. Returning to login...</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Message Overlay for Login */}
          <AnimatePresence>
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-3xl flex items-center justify-center z-50"
              >
                <div className="text-center p-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle2 className="h-12 w-12 text-green-600" />
                  </motion.div>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">Welcome Back!</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">Redirecting to admin dashboard...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-blue-900 to-slate-900 flex items-center justify-center p-4 text-white font-black uppercase tracking-widest animate-pulse">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
