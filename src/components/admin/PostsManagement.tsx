// src/components/admin/PostsManagement.tsx
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
}

const PostsManagement = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Manage Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="p-6 bg-gray-100 rounded-lg shadow-sm">
            <img src={post.image_url} alt={post.title} className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
            <p className="text-gray-700 mb-4">{post.content.slice(0, 100)}...</p>
            <Link href={`/admin/edit/${post.id}`} legacyBehavior>
              <a className="text-blue-500 font-semibold hover:underline">Edit</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsManagement;