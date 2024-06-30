// src/components/PopularPosts.tsx
"use client";

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Link from 'next/link';
import { format } from 'date-fns';

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image_url: string;
  views: number;
}

const PopularPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .order('views', { ascending: false })
          .limit(5);

        if (error) {
          console.error('Error fetching posts:', error.message);
          setError(`Error fetching posts: ${error.message}`);
        } else {
          console.log('Fetched posts:', data);
          setPosts(data || []);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unexpected error';
        console.error('Unexpected error:', errorMessage);
        setError(`Unexpected error: ${errorMessage}`);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold mb-4">Popular Posts</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <div key={post.id} className="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
            <Link href={`/blog/${post.id}`} legacyBehavior>
              <a>
                <img src={post.image_url} alt={post.title} className="w-full h-40 object-cover rounded-lg mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h2>
              </a>
            </Link>
            <p className="text-gray-500 mb-2">{format(new Date(post.created_at), 'MM/dd/yyyy')}</p>
            <p className="text-gray-700 mb-4">{post.content.slice(0, 100)}...</p>
            <p className="text-gray-500 mb-2">Views: {post.views}</p>
            <Link href={`/blog/${post.id}`} legacyBehavior>
              <a className="text-blue-500 font-semibold">Read more</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularPosts;