import type { Metadata } from "next";
import Link from "next/link";
import { posts, CATEGORIES } from "@/data/posts";

export const metadata: Metadata = {
  title: "전체글",
  description: "맥미니 로그의 모든 글 목록입니다.",
};

export default function PostsPage() {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          전체글
        </h1>
        <p className="text-sm text-zinc-600">
          총 {posts.length}개의 글이 있습니다.
        </p>
      </header>

      <ul className="space-y-3">
        {sortedPosts.map((post) => (
          <li
            key={post.slug}
            className="rounded-xl border border-zinc-200 bg-white px-4 py-3 shadow-sm transition hover:border-zinc-300 hover:shadow-md sm:px-5 sm:py-4"
          >
            <Link href={`/posts/${post.slug}`} className="flex flex-col gap-1">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700">
                    {CATEGORIES[post.category].label}
                  </span>
                  <h3 className="text-sm font-semibold text-zinc-900 sm:text-base">
                    {post.title}
                  </h3>
                </div>
                <span className="shrink-0 text-[11px] text-zinc-400">
                  {post.publishedAt}
                </span>
              </div>
              <p className="line-clamp-2 text-xs text-zinc-600 sm:text-sm">
                {post.summary}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}