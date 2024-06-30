"use client";

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Link from 'next/link';

interface Category {
  id: number;
  name: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*');

        if (error) {
          console.error('Error fetching categories:', error.message);
          setError(`Error fetching categories: ${error.message}`);
        } else {
          console.log('Fetched categories:', data);
          setCategories(data || []);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unexpected error';
        console.error('Unexpected error:', errorMessage);
        setError(`Unexpected error: ${errorMessage}`);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold mb-4">Categories</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-wrap gap-4">
        {categories.map(category => (
          <Link key={category.id} href={`/categories/${category.id}`} legacyBehavior>
            <a className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">{category.name}</a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;