import { NextRequest, NextResponse } from "next/server";
import { updatePost, deletePost } from "@/lib/blog";

const ADMIN_PASSWORD = process.env.BLOG_ADMIN_PASSWORD || "veerd-admin-2026";

function isAuthorized(req: NextRequest): boolean {
  const auth = req.headers.get("x-admin-password");
  return auth === ADMIN_PASSWORD;
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const post = await updatePost(params.id, body);

    if (!post) {
      return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
    }

    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const success = await deletePost(params.id);

  if (!success) {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
