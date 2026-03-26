import { NextRequest, NextResponse } from "next/server";
import { getAllPosts, createPost } from "@/lib/blog";

const ADMIN_PASSWORD = process.env.BLOG_ADMIN_PASSWORD || "veerd-admin-2026";

function isAuthorized(req: NextRequest): boolean {
  const auth = req.headers.get("x-admin-password");
  return auth === ADMIN_PASSWORD;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const posts = await getAllPosts();
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, slug, excerpt, content, category, reading_time, meta_description, status, published_at } = body;

    if (!title || !slug || !content) {
      return NextResponse.json({ error: "Title, slug, and content are required" }, { status: 400 });
    }

    const post = await createPost({
      title,
      slug,
      excerpt: excerpt || "",
      content,
      category: category || "Career change",
      reading_time: reading_time || "5 min",
      meta_description: meta_description || "",
      status: status || "draft",
      published_at: published_at || new Date().toISOString().split("T")[0],
    });

    if (!post) {
      return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }

    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
