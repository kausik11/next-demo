export interface BlogPost {
  id: number;
  user_id: number;
  title: string;
  description: string;
  content_text: string;
  content_html: string;
  photo_url: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse {
  success: boolean;
  total_blogs: number;
  message: string;
  offset: number;
  limit: number;
  blogs: BlogPost[];
}
