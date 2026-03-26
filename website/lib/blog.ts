import { getSupabase } from "./supabase";

export interface BlogPost {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  published_at: string;
  reading_time: string;
  category: string;
  meta_description: string;
  status: "draft" | "published";
  created_at?: string;
  updated_at?: string;
}

export async function getAllPublishedPosts(): Promise<BlogPost[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }

  return data || [];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }

  return data;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching all blog posts:", error);
    return [];
  }

  return data || [];
}

export async function createPost(post: Omit<BlogPost, "id" | "created_at" | "updated_at">): Promise<BlogPost | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("blog_posts")
    .insert(post)
    .select()
    .single();

  if (error) {
    console.error("Error creating blog post:", error);
    return null;
  }

  return data;
}

export async function updatePost(id: string, post: Partial<BlogPost>): Promise<BlogPost | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("blog_posts")
    .update({ ...post, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating blog post:", error);
    return null;
  }

  return data;
}

export async function deletePost(id: string): Promise<boolean> {
  const supabase = getSupabase();
  const { error } = await supabase
    .from("blog_posts")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting blog post:", error);
    return false;
  }

  return true;
}
