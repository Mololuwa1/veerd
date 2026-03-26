"use client";

import { useState, useEffect } from "react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  published_at: string;
  reading_time: string;
  category: string;
  meta_description: string;
  status: "draft" | "published";
}

const CATEGORIES = ["Career change", "Transition tips", "Twin stories", "Industry insights"];

export default function AdminBlogPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<"list" | "editor">("list");
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Career change");
  const [readingTime, setReadingTime] = useState("5 min");
  const [metaDescription, setMetaDescription] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [publishedAt, setPublishedAt] = useState(new Date().toISOString().split("T")[0]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blog", {
        headers: { "x-admin-password": password },
      });
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch {
      setMessage("Failed to fetch posts");
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blog", {
        headers: { "x-admin-password": password },
      });
      if (res.ok) {
        setAuthenticated(true);
        const data = await res.json();
        setPosts(data);
      } else {
        setMessage("Invalid password");
      }
    } catch {
      setMessage("Connection error");
    }
    setLoading(false);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const estimateReadingTime = (text: string) => {
    const words = text.split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min`;
  };

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setExcerpt("");
    setContent("");
    setCategory("Career change");
    setReadingTime("5 min");
    setMetaDescription("");
    setStatus("draft");
    setPublishedAt(new Date().toISOString().split("T")[0]);
    setEditingPost(null);
  };

  const openEditor = (post?: BlogPost) => {
    if (post) {
      setEditingPost(post);
      setTitle(post.title);
      setSlug(post.slug);
      setExcerpt(post.excerpt);
      setContent(post.content);
      setCategory(post.category);
      setReadingTime(post.reading_time);
      setMetaDescription(post.meta_description);
      setStatus(post.status);
      setPublishedAt(post.published_at);
    } else {
      resetForm();
    }
    setView("editor");
  };

  const handleSave = async () => {
    if (!title || !slug || !content) {
      setMessage("Title, slug, and content are required");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const body = {
        title,
        slug,
        excerpt,
        content,
        category,
        reading_time: readingTime,
        meta_description: metaDescription,
        status,
        published_at: publishedAt,
      };

      let res;
      if (editingPost) {
        res = await fetch(`/api/blog/${editingPost.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-admin-password": password,
          },
          body: JSON.stringify(body),
        });
      } else {
        res = await fetch("/api/blog", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-password": password,
          },
          body: JSON.stringify(body),
        });
      }

      if (res.ok) {
        setMessage(editingPost ? "Post updated!" : "Post created!");
        await fetchPosts();
        setView("list");
        resetForm();
      } else {
        const data = await res.json();
        setMessage(data.error || "Failed to save");
      }
    } catch {
      setMessage("Failed to save post");
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
        headers: { "x-admin-password": password },
      });

      if (res.ok) {
        setMessage("Post deleted");
        await fetchPosts();
      } else {
        setMessage("Failed to delete post");
      }
    } catch {
      setMessage("Failed to delete post");
    }
  };

  useEffect(() => {
    if (title && !editingPost) {
      setSlug(generateSlug(title));
    }
  }, [title, editingPost]);

  useEffect(() => {
    if (content) {
      setReadingTime(estimateReadingTime(content));
    }
  }, [content]);

  // Login screen
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-textPrimary mb-2">Blog Admin</h1>
          <p className="text-sm text-textSecondary mb-6">Enter your admin password to continue.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Admin password"
            className="w-full h-11 bg-white border border-border rounded-lg px-4 text-sm text-textPrimary focus:outline-none focus:border-primary mb-3"
          />
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full h-11 bg-textPrimary text-background font-bold text-sm rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Checking..." : "Log in"}
          </button>
          {message && <p className="text-sm text-red-500 mt-3">{message}</p>}
        </div>
      </div>
    );
  }

  // Editor view
  if (view === "editor") {
    return (
      <div className="min-h-screen bg-background px-6 md:px-12 py-10">
        <div className="max-w-[800px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-textPrimary">
              {editingPost ? "Edit Post" : "New Post"}
            </h1>
            <button
              onClick={() => { setView("list"); resetForm(); }}
              className="text-sm text-textSecondary hover:text-textPrimary transition-colors"
            >
              &larr; Back to posts
            </button>
          </div>

          <div className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-textPrimary uppercase tracking-wide mb-1.5">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Your blog post title"
                className="w-full h-11 bg-white border border-border rounded-lg px-4 text-sm text-textPrimary focus:outline-none focus:border-primary"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-xs font-bold text-textPrimary uppercase tracking-wide mb-1.5">Slug</label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-textSecondary">veerd.co/blog/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="flex-1 h-11 bg-white border border-border rounded-lg px-4 text-sm text-textPrimary focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-xs font-bold text-textPrimary uppercase tracking-wide mb-1.5">Excerpt</label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A short preview shown on the blog listing..."
                rows={2}
                className="w-full bg-white border border-border rounded-lg px-4 py-3 text-sm text-textPrimary focus:outline-none focus:border-primary resize-none"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-xs font-bold text-textPrimary uppercase tracking-wide mb-1.5">
                Content <span className="text-textSecondary font-normal normal-case">(use ## for headings, **text** for bold)</span>
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your blog post here..."
                rows={20}
                className="w-full bg-white border border-border rounded-lg px-4 py-3 text-sm text-textPrimary focus:outline-none focus:border-primary resize-y font-mono leading-relaxed"
              />
            </div>

            {/* Row: Category + Reading Time + Date */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-textPrimary uppercase tracking-wide mb-1.5">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-11 bg-white border border-border rounded-lg px-4 text-sm text-textPrimary focus:outline-none focus:border-primary"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-textPrimary uppercase tracking-wide mb-1.5">Reading Time</label>
                <input
                  type="text"
                  value={readingTime}
                  onChange={(e) => setReadingTime(e.target.value)}
                  className="w-full h-11 bg-white border border-border rounded-lg px-4 text-sm text-textPrimary focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-textPrimary uppercase tracking-wide mb-1.5">Publish Date</label>
                <input
                  type="date"
                  value={publishedAt}
                  onChange={(e) => setPublishedAt(e.target.value)}
                  className="w-full h-11 bg-white border border-border rounded-lg px-4 text-sm text-textPrimary focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Meta Description */}
            <div>
              <label className="block text-xs font-bold text-textPrimary uppercase tracking-wide mb-1.5">
                Meta Description <span className="text-textSecondary font-normal normal-case">(for SEO)</span>
              </label>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="SEO description for Google search results..."
                rows={2}
                className="w-full bg-white border border-border rounded-lg px-4 py-3 text-sm text-textPrimary focus:outline-none focus:border-primary resize-none"
              />
            </div>

            {/* Status + Save */}
            <div className="flex items-center gap-4 pt-4 border-t border-border">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "draft" | "published")}
                className="h-11 bg-white border border-border rounded-lg px-4 text-sm text-textPrimary focus:outline-none focus:border-primary"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
              <button
                onClick={handleSave}
                disabled={saving}
                className="h-11 bg-textPrimary text-background font-bold text-sm px-8 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {saving ? "Saving..." : editingPost ? "Update Post" : "Create Post"}
              </button>
              {message && (
                <p className={`text-sm ${message.includes("!") ? "text-primary" : "text-red-500"}`}>
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Post list view
  return (
    <div className="min-h-screen bg-background px-6 md:px-12 py-10">
      <div className="max-w-[800px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-textPrimary">Blog Posts</h1>
            <p className="text-sm text-textSecondary mt-1">{posts.length} post{posts.length !== 1 ? "s" : ""}</p>
          </div>
          <button
            onClick={() => openEditor()}
            className="h-11 bg-textPrimary text-background font-bold text-sm px-6 rounded-lg hover:opacity-90 transition-opacity"
          >
            + New Post
          </button>
        </div>

        {message && (
          <p className={`text-sm mb-4 ${message.includes("deleted") ? "text-red-500" : "text-primary"}`}>
            {message}
          </p>
        )}

        {loading ? (
          <p className="text-textSecondary">Loading...</p>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border rounded-xl">
            <p className="text-textSecondary mb-4">No blog posts yet</p>
            <button
              onClick={() => openEditor()}
              className="text-sm font-bold text-primary hover:underline"
            >
              Write your first post &rarr;
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white border border-border rounded-xl p-5 flex items-center justify-between"
              >
                <div className="flex-1 min-w-0 mr-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        post.status === "published"
                          ? "bg-primaryLight text-primary"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {post.status}
                    </span>
                    <span className="text-xs text-textSecondary">{post.category}</span>
                  </div>
                  <p className="text-sm font-bold text-textPrimary truncate">{post.title}</p>
                  <p className="text-xs text-textSecondary mt-0.5">
                    {post.published_at} · {post.reading_time}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditor(post)}
                    className="text-xs font-bold text-textSecondary hover:text-textPrimary transition-colors px-3 py-1.5 border border-border rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-xs font-bold text-red-400 hover:text-red-600 transition-colors px-3 py-1.5 border border-red-200 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
