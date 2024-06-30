// src/pages/admin.tsx
"use client";

import { useState } from 'react';
import { supabase, resendConfirmationEmail } from '../lib/supabase';
import { useRouter } from 'next/router';
import Link from 'next/link';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      router.push('/admin/dashboard');
    }
  };

  const handleResendConfirmation = async () => {
    try {
      await resendConfirmationEmail(email);
      setMessage('Confirmation email resent. Check your inbox.');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <h1 className="text-3xl font-bold mb-8 text-white">Admin Login</h1>
      <form onSubmit={handleLogin} className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {message && <p className="text-green-500 mb-4">{message}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-lg">
          Login
        </button>
      </form>
      <div className="mt-4 text-white">
        <p>
          Don't have an account?{' '}
          <Link href="/register" legacyBehavior>
            <a className="text-blue-300 hover:text-blue-500">Register here</a>
          </Link>
        </p>
        <p className="mt-2">
          Didn't receive confirmation email?{' '}
          <button onClick={handleResendConfirmation} className="text-blue-300 hover:text-blue-500 underline">
            Resend email
          </button>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;