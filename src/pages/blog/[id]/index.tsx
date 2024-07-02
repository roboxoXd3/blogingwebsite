// // src/pages/blog/[id]/index.tsx
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import { supabase } from '../../../lib/supabase';
// import NavBar from '../../../components/NavBar';
// import Footer from '../../../components/Footer';
// import Image from 'next/image';

// interface Post {
//   id: number;
//   title: string;
//   content: string;
//   image_url: string;
//   created_at: string;
// }

// const BlogPost = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [post, setPost] = useState<Post | null>(null);

//   useEffect(() => {
//     if (id) {
//       const fetchPost = async () => {
//         const { data, error } = await supabase
//           .from('posts')
//           .select('*')
//           .eq('id', id)
//           .single();

//         if (error) {
//           console.error(error);
//         } else {
//           setPost(data);
//         }
//       };

//       fetchPost();
//     }
//   }, [id]);

//   if (!post) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <NavBar />
//       <div className="container mx-auto p-4 sm:p-8 pt-20">
//         <div className="bg-white p-4 sm:p-8 rounded-lg shadow-md">
//           <div className="relative w-full h-60 sm:h-80 mb-4 sm:mb-8">
//             <Image src={post.image_url} alt={post.title} layout="fill" objectFit="cover" className="rounded-md" />
//           </div>
//           <h1 className="text-3xl sm:text-5xl font-bold mb-2 sm:mb-4 text-gray-900">{post.title}</h1>
//           <p className="text-gray-600 mb-4">{new Date(post.created_at).toLocaleDateString()}</p>
//           <div className="prose prose-sm sm:prose-lg text-gray-800 leading-6 sm:leading-7">{post.content}</div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default BlogPost;

// src/pages/blog/[id]/index.tsx
// src/pages/blog/[id]/index.tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import NavBar from '../../../components/NavBar';
import Footer from '../../../components/Footer';
import Image from 'next/image';

interface Post {
  id: number;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
}

interface Comment {
  id: number;
  post_id: number;
  comment_text: string;
  created_at: string;
}

const BlogPost = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false); // State for pop-up message

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

      const fetchComments = async () => {
        const { data, error } = await supabase
          .from('comments')
          .select('*')
          .eq('post_id', Number(id)); // Convert id to number

        if (error) {
          console.error(error);
        } else {
          setComments(data || []);
        }
      };

      fetchPost();
      fetchComments();
    }
  }, [id]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    if (!newComment.trim()) {
      setError('Comment cannot be empty');
      setIsSubmitting(false);
      return;
    }

    const { data, error } = await supabase
      .from('comments')
      .insert([{ post_id: Number(id), comment_text: newComment }])
      .select();

    if (error) {
      setError(error.message);
    } else if (data) {
      setNewComment(''); // Clear the new comment input
      setSuccessMessage('Comment posted successfully!'); // Set success message
      setShowPopup(true); // Show pop-up message

      // Add the new comment to the current state to display it instantly
      setComments([
        ...comments,
        {
          id: data[0].id,
          post_id: Number(id),
          comment_text: newComment,
          created_at: new Date().toISOString(),
        },
      ]);

      // Automatically hide the success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
        setShowPopup(false); // Hide pop-up message after 3 seconds
      }, 3000);
    }

    setIsSubmitting(false);
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="container mx-auto p-8 pt-20">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="relative w-full h-80 mb-8">
            <Image src={post.image_url} alt={post.title} layout="fill" objectFit="cover" className="rounded-md" />
          </div>
          <h1 className="text-5xl font-bold mb-4 text-gray-900">{post.title}</h1>
          <p className="text-gray-600 mb-4">{new Date(post.created_at).toLocaleDateString()}</p>
          <div className="prose prose-lg text-gray-800 leading-7 mb-8">{post.content}</div>

          <h2 className="text-3xl font-bold mb-4 text-gray-900">Comments</h2>
          {comments.map((comment) => (
            <div key={comment.id} className="bg-gray-100 p-4 rounded-lg mb-4 border border-gray-300">
              <p className="text-gray-700">{comment.comment_text}</p>
              <p className="text-gray-500 text-sm">{new Date(comment.created_at).toLocaleDateString()}</p>
            </div>
          ))}

          <form onSubmit={handleAddComment} className="mt-4">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-black"
              placeholder="Add your comment"
              required
              disabled={isSubmitting}
            />
            <button
              type="submit"
              className={`p-3 bg-blue-500 text-white rounded-lg ${isSubmitting ? 'opacity-50' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  Posting...
                  <svg
                    className="animate-spin ml-2 h-5 w-5 text-white inline"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                </>
              ) : (
                'Add Comment'
              )}
            </button>
          </form>
        </div>
      </div>
      {showPopup && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md">
          Comment posted successfully!
        </div>
      )}
      <Footer />
    </div>
  );
};

export default BlogPost;