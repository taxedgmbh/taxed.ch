/**
 * Forum Service
 * Centralized API calls for the forum section
 */

const API_BASE = '/forum-unified-api.php';

// Types
export interface ForumCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon?: string;
  sort_order: number;
  is_active: boolean;
  topic_count: number;
  post_count: number;
  total_upvotes: number;
  total_score: number;
  last_activity: string;
}

export interface ForumTopic {
  id: number;
  title: string;
  slug: string;
  content: string;
  upvotes: number;
  downvotes: number;
  score: number;
  views: number;
  replies_count: number;
  created_at: string;
  last_reply_at: string;
  status: 'active' | 'closed' | 'deleted';
  is_featured: boolean;
  is_announcement: boolean;
  is_solved: boolean;
  category_name: string;
  category_slug: string;
  category_color: string;
  author_name: string;
  author_lastname: string;
  author_karma: number;
  post_type: 'hot' | 'trending' | 'normal';
  user_vote: 'up' | 'down' | null;
}

export interface ForumPost {
  id: number;
  content: string;
  upvotes: number;
  downvotes: number;
  score: number;
  created_at: string;
  is_solution: boolean;
  is_expert_answer: boolean;
  parent_id: number | null;
  author_name: string;
  author_lastname: string;
  author_karma: number;
  user_vote?: 'up' | 'down' | null;
}

export interface ForumStats {
  total_topics: number;
  total_posts: number;
  total_users: number;
  active_today: number;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

// Helper function for API calls
async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  const result: ApiResponse<T> = await response.json();

  if (!result.success) {
    throw new Error(result.error || 'API request failed');
  }

  return result.data;
}

/**
 * Get all forum categories
 */
export async function getCategories(): Promise<ForumCategory[]> {
  return apiCall<ForumCategory[]>('?action=categories');
}

/**
 * Get a single category by slug
 */
export async function getCategory(slug: string): Promise<ForumCategory | null> {
  const categories = await getCategories();
  return categories.find(cat => cat.slug === slug) || null;
}

/**
 * Get topics with optional filters
 */
export async function getTopics(options?: {
  category?: string;
  sort?: 'hot' | 'top' | 'new' | 'controversial';
  page?: number;
  limit?: number;
}): Promise<ForumTopic[]> {
  const params = new URLSearchParams({ action: 'topics' });

  if (options?.category) params.append('category', options.category);
  if (options?.sort) params.append('sort', options.sort);
  if (options?.page) params.append('page', options.page.toString());
  if (options?.limit) params.append('limit', options.limit.toString());

  return apiCall<ForumTopic[]>(`?${params.toString()}`);
}

/**
 * Get a single topic by slug
 */
export async function getTopic(slug: string): Promise<ForumTopic | null> {
  // The API doesn't have a direct endpoint for single topic by slug
  // We need to search for it
  const topics = await getTopics({ limit: 100 });
  return topics.find(topic => topic.slug === slug) || null;
}

/**
 * Get posts for a topic
 */
export async function getPosts(topicId: number): Promise<ForumPost[]> {
  const params = new URLSearchParams({
    action: 'posts',
    topic_id: topicId.toString(),
  });

  return apiCall<ForumPost[]>(`?${params.toString()}`);
}

/**
 * Get forum statistics
 */
export async function getStats(): Promise<ForumStats> {
  return apiCall<ForumStats>('?action=stats');
}

/**
 * Vote on a topic or post
 */
export async function vote(
  contentType: 'topic' | 'post',
  contentId: number,
  voteType: 'up' | 'down'
): Promise<void> {
  await apiCall('?action=vote', {
    method: 'POST',
    body: JSON.stringify({
      content_type: contentType,
      content_id: contentId,
      vote_type: voteType,
    }),
  });
}

/**
 * Create a new topic
 */
export async function createTopic(data: {
  title: string;
  content: string;
  category_id: number;
}): Promise<ForumTopic> {
  return apiCall<ForumTopic>('?action=create-topic', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Create a new post (reply)
 */
export async function createPost(data: {
  topic_id: number;
  content: string;
  parent_id?: number;
}): Promise<ForumPost> {
  return apiCall<ForumPost>('?action=create-post', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Export default service object for convenience
export const forumService = {
  getCategories,
  getCategory,
  getTopics,
  getTopic,
  getPosts,
  getStats,
  vote,
  createTopic,
  createPost,
};

export default forumService;
