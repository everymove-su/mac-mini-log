import type { Metadata } from "next";
import Link from "next/link";
import { getPostBySlug, posts, CATEGORIES } from "@/data/posts";

type Params = {
  slug: string;
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "글을 찾을 수 없습니다",
    };
  }

  const url =
    (process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
      "http://localhost:3000") + `/posts/${slug}`;

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-4 px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-xl font-semibold">글을 찾을 수 없습니다.</h1>
        <p className="text-sm text-zinc-600">
          주소가 잘못되었거나, 글이 삭제된 것 같아요.
        </p>
        <Link
          href="/"
          className="mt-2 inline-flex text-sm font-medium text-emerald-700 hover:text-emerald-800"
        >
          홈으로 돌아가기 →
        </Link>
      </div>
    );
  }

  const category = CATEGORIES[post.category];

  return (
    <article className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-3 border-b border-zinc-200 pb-5">
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <Link
            href={`/categories/${post.category}`}
            className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700"
          >
            {category.label}
          </Link>
          <span>·</span>
          <span>{post.readTime} 소요</span>
          <span>·</span>
          <span>{post.publishedAt}</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {post.title}
        </h1>
        <p className="max-w-2xl text-sm text-zinc-600 sm:text-base">
          {post.summary}
        </p>
      </header>

      <section className="prose prose-zinc max-w-none text-sm sm:text-base">
        {post.content.split("\n\n").map((block, index) => (
          <p key={index}>{block}</p>
        ))}
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-4 text-xs text-zinc-500">
        <div>
          태그:{" "}
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="mr-1 inline-flex rounded-full bg-zinc-100 px-2 py-0.5 text-[11px]"
            >
              #{tag}
            </span>
          ))}
        </div>
        <p>
          이 영역에는 애드센스 광고, 쿠팡/아마존 제휴 링크, 전자책 링크 등을
          배치할 수 있습니다.
        </p>
      </section>
    </article>
  );
}

