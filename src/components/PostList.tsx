// src/components/PostList.tsx
"use client";

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Post {
  id: number;
  title: string;
  content: string;
}

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*');

        if (error) {
          console.error('Error fetching posts:', error);
        } else {
          console.log('Fetched posts:', data); // Debug log
          setPosts(data || []);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="w-full max-w-2xl">
      {posts.length > 0 ? (
        posts.map(post => (
          <div key={post.id} className="mb-8 p-4 border border-gray-200 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default PostList;