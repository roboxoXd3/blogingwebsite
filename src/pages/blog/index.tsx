// src/pages/blog/index.tsx
"use client";

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from('posts').select('*');
      if (error) {
        setError(error.message);
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Blog</h1>
        {posts.map((post) => (
          <div key={post.id} className="mb-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">
              <Link href={`/blog/${post.id}`} legacyBehavior>
                <a className="text-blue-500">{post.title}</a>
              </Link>
            </h2>
            <p className="text-gray-700">{post.content.slice(0, 200)}...</p>
            <Link href={`/blog/${post.id}`} legacyBehavior>
              <a className="text-blue-500">Read more</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;