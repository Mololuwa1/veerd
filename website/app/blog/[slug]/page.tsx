import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPublishedPosts } from "@/lib/blog";

interface Props {
  params: { slug: string };
}

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getAllPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: `${post.title} | Veerd`,
    description: post.meta_description,
    openGraph: {
      title: post.title,
      description: post.meta_description,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-background py-20 px-6 md:px-12">
      <article className="max-w-[650px] mx-auto">
        <Link
          href="/blog"
          className="text-sm text-textSecondary hover:text-textPrimary transition-colors mb-8 inline-block"
        >
          &larr; Back to blog
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-bold text-primary bg-primaryLight px-2.5 py-1 rounded-full">
            {post.category}
          </span>
          <span className="text-xs text-textSecondary">{post.reading_time}</span>
          <span className="text-xs text-textSecondary">{post.published_at}</span>
        </div>

        <h1 className="text-[32px] md:text-[40px] font-bold text-textPrimary tracking-[-1px] leading-[1.2] mb-8">
          {post.title}
        </h1>

        <div
          className="prose prose-lg max-w-none
            [&>p]:text-[16px] [&>p]:text-textSecondary [&>p]:leading-[1.75] [&>p]:mb-6
            [&>h2]:text-[22px] [&>h2]:font-bold [&>h2]:text-textPrimary [&>h2]:mt-10 [&>h2]:mb-4
            [&>strong]:text-textPrimary [&>strong]:font-bold
            [&>ul]:space-y-2 [&>ul>li]:text-[16px] [&>ul>li]:text-textSecondary [&>ul>li]:leading-[1.75]"
          dangerouslySetInnerHTML={{
            __html: post.content
              .replace(/^## (.+)$/gm, '<h2>$1</h2>')
              .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
              .replace(/\n\n/g, '</p><p>')
              .replace(/^(?!<[hp])/gm, '<p>')
              .replace(/(?<![>])$/gm, '</p>')
          }}
        />
      </article>
    </div>
  );
}
