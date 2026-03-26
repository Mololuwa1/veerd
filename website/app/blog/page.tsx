import type { Metadata } from "next";
import Link from "next/link";
import { getAllPublishedPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Veerd",
  description:
    "Honest writing about career transitions, the people who make them, and what nobody tells you about changing careers.",
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogPage() {
  const posts = await getAllPublishedPosts();

  return (
    <div className="bg-background py-20 px-6 md:px-12">
      <div className="max-w-[800px] mx-auto">
        <h1 className="text-[40px] font-bold text-textPrimary tracking-[-1px] mb-3">
          Blog
        </h1>
        <p className="text-[17px] text-textSecondary leading-[1.65] mb-12">
          Honest writing about career transitions and the people who make them.
        </p>

        {posts.length === 0 ? (
          <p className="text-textSecondary">No posts yet. Check back soon.</p>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <article className="border-b border-border pb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold text-primary bg-primaryLight px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-textSecondary">
                      {post.reading_time}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-textPrimary group-hover:text-primary transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-[15px] text-textSecondary leading-[1.6]">
                    {post.excerpt}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
