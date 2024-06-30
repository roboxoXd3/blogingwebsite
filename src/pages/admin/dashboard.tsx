// src/pages/admin/dashboard.tsx
"use client";

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/router';
import NavBar from '../../components/admin/NavBar';
import DashboardOverview from '../../components/admin/DashboardOverview';
import PostsManagement from '../../components/admin/PostsManagement';

interface Post {
  id: number;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
  views?: number; // assuming a views column exists
}

const AdminDashboard = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalViews, setTotalViews] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push('/admin');
      }
    };

    checkAuth();

    const fetchPosts = async () => {
      const { data, error } = await supabase.from('posts').select('*');
      if (error) {
        console.error(error);
      } else {
        setPosts(data || []);
        // Assuming you have a "views" column in your posts table
        const totalViews = data.reduce((acc, post) => acc + (post.views || 0), 0);
        setTotalViews(totalViews);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar handleLogout={handleLogout} />
      <div className="container mx-auto p-8 pt-20">
        <DashboardOverview totalPosts={posts.length} totalViews={totalViews} />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <PostsManagement posts={posts} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;