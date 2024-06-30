
  // src/pages/blog/[id].tsx
  import { useRouter } from 'next/router';
  import { useEffect, useState } from 'react';
  import { supabase } from '../../../lib/supabase';
  import NavBar from '../../../components/NavBar';
  import Footer from '../../../components/Footer';

  interface Post {
    id: number;
    title: string;
    content: string;
    image_url: string;
    created_at: string;
  }

  const BlogPost = () => {
    const router = useRouter();
    const { id } = router.query;
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
      if (id) {
        const fetchPost = async () => {
          const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('id', id)
            .single();

          if (error) {
            console.error(error);
          } else {
            setPost(data);
          }
        };

        fetchPost();
      }
    }, [id]);

    if (!post) {
      return <p>Loading...</p>;
    }

    return (
      <div className="min-h-screen bg-gray-100">
        <NavBar />
        <div className="container mx-auto p-8 pt-20">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <img src={post.image_url} alt={post.title} className="w-full h-80 object-cover rounded-md mb-8" />
            <h1 className="text-5xl font-bold mb-4 text-gray-900">{post.title}</h1>
            <p className="text-gray-600 mb-4">{new Date(post.created_at).toLocaleDateString()}</p>
            <div className="prose prose-lg text-gray-800 leading-7">{post.content}</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  export default BlogPost;

