// src/pages/admin/create.tsx
"use client";

import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/router';
import Link from 'next/link';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('posts')
      .insert([{ title, content, image_url: imageUrl }]);
    if (error) {
      setError(error.message);
    } else {
      setMessage('Post created successfully.');
      router.push('/admin/dashboard');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-blue-500">Create Post</h1>
      <form onSubmit={handleCreatePost} className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {message && <p className="text-green-500 mb-4">{message}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg text-black"
            required
          />
        </div>
        <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-lg">
          Create Post
        </button>
        <div className="mt-4">
          <Link href="/admin/dashboard" legacyBehavior>
            <a className="text-blue-500">Back to Dashboard</a>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;