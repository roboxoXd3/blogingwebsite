// src/components/NewsletterSignup.tsx
"use client";

import { useState } from 'react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email) {
      setMessage('Please enter your email address');
      return;
    }

    // Here you would normally send the email to your backend or an email marketing service
    console.log('Newsletter signup email:', email);

    // For now, we'll just reset the form and show a success message
    setEmail('');
    setMessage('Thank you for subscribing!');
  };

  return (
    <div className="w-full mt-8 bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">Subscribe to our Newsletter</h2>
        <p className="mb-6 text-lg text-center">Get the latest posts delivered right to your inbox.</p>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 w-full md:w-auto flex-grow border-none rounded-lg text-gray-900"
          />
        <button type="submit" className="bg-white text-blue-600 p-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Subscribe
          </button>
        </form>
        {message && <p className="mt-4 text-green-300 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default NewsletterSignup;