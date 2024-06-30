// src/app/page.tsx
"use client";

import NavBar from '../components/NavBar';
import HeroSection from '../components/HeroSection';
import FeaturedPost from '../components/FeaturedPost';
import RecentPosts from '../components/RecentPosts';
import Categories from '../components/Categories';
import PopularPosts from '../components/PopularPosts';
import NewsletterSignup from '../components/NewsletterSignup';
import Footer from '../components/Footer';


interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image_url: string;
}

export default function Home() {
  const featuredPost: Post[] = [
    {
      id: 1,
      title: 'Understanding React Hooks',
      content: 'React Hooks revolutionize how developers build components. Learn about useState, useEffect, and custom hooks to enhance your React applications.',
      created_at: new Date().toISOString(),
      image_url: '/assets/images/react-hooks.jpg',
    },
    {
      id: 2,
      title: 'Mastering JavaScript ES6',
      content: 'JavaScript ES6 introduced powerful features like arrow functions, destructuring, and promises. Dive deep into these features and become a JavaScript pro.',
      created_at: new Date().toISOString(),
      image_url: '/assets/images/javascript-es6.jpg',
    },
    {
      id: 3,
      title: 'Getting Started with TypeScript',
      content: 'TypeScript adds static typing to JavaScript, making code more robust and maintainable. Explore the basics of TypeScript and how it can improve your projects.',
      created_at: new Date().toISOString(),
      image_url: '/assets/images/typescript-basics.jpg',
    },
  ];

  return (
    <div>
      <NavBar />
      <HeroSection />
      <main className="flex flex-col items-start justify-center p-8 mt-8">
        <h1 className="text-4xl font-bold mb-8">Featured Posts</h1>
        <FeaturedPost posts={featuredPost} />
        <h2 className="text-3xl font-bold mb-8 mt-8">Recent Posts</h2>
        <RecentPosts />
        <Categories />
        <PopularPosts />
        <NewsletterSignup />
      </main>
      <Footer />
    </div>
  );
}

