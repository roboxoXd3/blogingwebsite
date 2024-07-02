
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase, addInteraction, getInteractions } from '../../../lib/supabase';
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
  const [showPopup, setShowPopup] = useState<boolean>(false);

  // State for like and dislike counts
  const [likeCount, setLikeCount] = useState<number>(0);
  const [dislikeCount, setDislikeCount] = useState<number>(0);

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
          .eq('post_id', Number(id));

        if (error) {
          console.error(error);
        } else {
          setComments(data || []);
        }
      };

      const fetchInteractions = async () => {
        const { data, error } = await getInteractions(Number(id));
        if (error) {
          console.error(error);
        } else if (data) {
          setLikeCount(data.like_count);
          setDislikeCount(data.dislike_count);
        }
      };

      fetchPost();
      fetchComments();
      fetchInteractions();
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
      setNewComment('');
      setSuccessMessage('Comment posted successfully!');
      setShowPopup(true);

      setComments([
        ...comments,
        {
          id: data[0].id,
          post_id: Number(id),
          comment_text: newComment,
          created_at: new Date().toISOString(),
        },
      ]);

      setTimeout(() => {
        setSuccessMessage(null);
        setShowPopup(false);
      }, 3000);
    }

    setIsSubmitting(false);
  };

  const handleLike = async () => {
    const { data, error } = await addInteraction(Number(id), 'like');
    if (error) {
      console.error(error);
    } else {
      setLikeCount(likeCount + 1);
    }
  };

  const handleDislike = async () => {
    const { data, error } = await addInteraction(Number(id), 'dislike');
    if (error) {
      console.error(error);
    } else {
      setDislikeCount(dislikeCount + 1);
    }
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

          <div className="flex items-center mb-8">
            <button
              onClick={handleLike}
              className="mr-4 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Like ({likeCount})
            </button>
            <button
              onClick={handleDislike}
              className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Dislike ({dislikeCount})
            </button>
          </div>

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