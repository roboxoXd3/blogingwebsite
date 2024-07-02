

// "use client";

// import { useState } from 'react';
// import { supabase } from '../../lib/supabase';
// import { useRouter } from 'next/router';
// import Link from 'next/link';

// const CreatePost = () => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [message, setMessage] = useState<string | null>(null);
//   const router = useRouter();

//   const handleImageUpload = async (): Promise<string | null> => {
//     if (!imageFile) return null;

//     const fileExt = imageFile.name.split('.').pop();
//     const fileName = `${Date.now()}.${fileExt}`;
//     const filePath = `${fileName}`;

//     const { data, error } = await supabase.storage
//       .from('new-post-images') // Use the new bucket name
//       .upload(filePath, imageFile);

//     if (error) {
//       setError(error.message);
//       return null;
//     }

//     const { publicUrl } = supabase.storage
//       .from('new-post-images') // Use the new bucket name
//       .getPublicUrl(filePath)
//       .data;

//     return publicUrl;
//   };

//   const handleCreatePost = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const imageUrl = await handleImageUpload();

//     if (!imageUrl) {
//       setError('Image upload failed');
//       return;
//     }

//     const { data, error } = await supabase
//       .from('posts')
//       .insert([{ title, content, image_url: imageUrl }]);

//     if (error) {
//       setError(error.message);
//     } else {
//       setMessage('Post created successfully.');
//       router.push('/admin/dashboard');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-3xl font-bold mb-8 text-blue-500">Create Post</h1>
//       <form onSubmit={handleCreatePost} className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         {message && <p className="text-green-500 mb-4">{message}</p>}
//         <div className="mb-4">
//           <label className="block text-gray-700">Title</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-lg text-black"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Content</label>
//           <textarea
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-lg text-black"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Image</label>
//           <input
//             type="file"
//             onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
//             className="w-full p-3 border border-gray-300 rounded-lg text-black"
//             required
//           />
//         </div>
//         <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-lg">
//           Create Post
//         </button>
//         <div className="mt-4">
//           <Link href="/admin/dashboard" legacyBehavior>
//             <a className="text-blue-500">Back to Dashboard</a>
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreatePost;
// src/pages/admin/create.tsx
"use client";

import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import styles for the editor

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false }); // Dynamically import ReactQuill to avoid SSR issues

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleImageUpload = async (): Promise<string | null> => {
    if (!imageFile) return null;

    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabase.storage
      .from('new-post-images') // Use the new bucket name
      .upload(filePath, imageFile);

    if (error) {
      setError(error.message);
      return null;
    }

    const { publicUrl } = supabase.storage
      .from('new-post-images') // Use the new bucket name
      .getPublicUrl(filePath)
      .data;

    return publicUrl;
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if content is empty
    if (!content.trim()) {
      setError('Content cannot be empty');
      return;
    }

    const imageUrl = await handleImageUpload();

    if (!imageUrl) {
      setError('Image upload failed');
      return;
    }

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
          <ReactQuill
            value={content}
            onChange={(value) => setContent(value)}
            className="w-full h-40 text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
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