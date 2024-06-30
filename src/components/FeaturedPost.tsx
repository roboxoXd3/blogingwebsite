// src/components/FeaturedPost.tsx
import Link from 'next/link';
import { format } from 'date-fns';

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image_url: string;
}

// const FeaturedPost = ({ posts }: { posts: Post[] }) => {
//     return (
//       <div className="flex flex-row gap-8 overflow-x-auto">
//         {posts.map(post => (
//           <div key={post.id} className="w-80 p-6 bg-white border border-gray-200 rounded-lg shadow-md">
//             <img src={post.image_url} alt={post.title} className="w-full h-40 object-cover rounded-lg mb-4" />
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h2>
//             <p className="text-gray-500 mb-2">{format(new Date(post.created_at), 'MM/dd/yyyy')}</p>
//             <p className="text-gray-700 mb-4">{post.content.slice(0, 100)}...</p>
//             <Link href={`/posts/${post.id}`} legacyBehavior>
//               <a className="text-blue-500 font-semibold">Read more</a>
//             </Link>
//           </div>
//         ))}
//       </div>
//     );
//   };

const FeaturedPost = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="flex flex-row gap-8 overflow-x-auto">
      {posts.map(post => (
        <div key={post.id} className="w-80 p-6 bg-white border border-gray-200 rounded-lg shadow-md">
          <Link href={`/blog/${post.id}`} legacyBehavior>
            <a>
              <img src={post.image_url} alt={post.title} className="w-full h-40 object-cover rounded-lg mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h2>
            </a>
          </Link>
          <p className="text-gray-500 mb-2">{format(new Date(post.created_at), 'MM/dd/yyyy')}</p>
          <p className="text-gray-700 mb-4">{post.content.slice(0, 100)}...</p>
          <Link href={`/blog/${post.id}`} legacyBehavior>
            <a className="text-blue-500 font-semibold">Read more</a>
          </Link>
        </div>
      ))}
    </div>
  );
};
  

export default FeaturedPost;