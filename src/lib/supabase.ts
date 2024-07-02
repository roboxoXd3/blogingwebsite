
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const resendConfirmationEmail = async (email: string) => {
  const response = await fetch(`${supabaseUrl}/auth/v1/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: supabaseKey,
    },
    body: JSON.stringify({ email, type: 'signup' }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error_description || 'Failed to resend confirmation email');
  }
  return data;
};

// Function to add like/dislike
export const addInteraction = async (postId: number, interactionType: 'like' | 'dislike') => {
  const { data, error } = await supabase
    .from('likes_dislikes')
    .insert([{ post_id: postId, interaction_type: interactionType }]);
  return { data, error };
};

// Function to fetch likes/dislikes for a post
export const getInteractions = async (postId: number) => {
  const { data, error } = await supabase
    .from('likes_dislikes')
    .select('interaction_type')
    .eq('post_id', postId);

  if (error) {
    return { data: null, error };
  }

  const likeCount = data.filter((interaction: any) => interaction.interaction_type === 'like').length;
  const dislikeCount = data.filter((interaction: any) => interaction.interaction_type === 'dislike').length;

  return { data: { like_count: likeCount, dislike_count: dislikeCount }, error: null };
};