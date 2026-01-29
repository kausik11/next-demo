import type { ApiResponse, BlogPost } from "@/types/blog";

const API_URL =
  "https://api.slingacademy.com/v1/sample-data/blog-posts?offset=0&limit=10";

export interface BlogFetchResult {
  posts: BlogPost[];
  error?: string;
}

export async function fetchBlogPosts(): Promise<BlogFetchResult> {
  try {
    const response = await fetch(API_URL, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return {
        posts: [],
        error: `Request failed with status ${response.status}.`,
      };
    }

    const data = (await response.json()) as ApiResponse;

    if (!data.success || !Array.isArray(data.blogs)) {
      return {
        posts: [],
        error: "Unexpected API response.",
      };
    }

    return {
      posts: data.blogs.slice(0, 10),
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to reach the API.";
    return {
      posts: [],
      error: message,
    };
  }
}
