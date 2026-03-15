import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, getPostsByCategory } from "@/data/posts";

type Params = {
  category: string;
};

export function generateStaticParams() {
  return [
    { category: "it" },
    { category: "finance" },
    { category: "daily" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category: key } = await params;
  const category = CATEGORIES[key as keyof typeof CATEGORIES];

  if (!category) {
    return {
      title: "카테고리를 찾을 수 없습니다",
    };
  }

  return {
    title: category.label,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category: key } = await params;
  const category = CATEGORIES[key as keyof typeof CATEGORIES];

  if (!category) {
    notFound();
  }

  const categoryPosts = getPostsByCategory(key as keyof typeof CATEGORIES)
  .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {category.label}
        </h1>
        <p className="max-w-2xl text-sm text-zinc-600 sm:text-base">
          {category.description}
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-zinc-500">글 목록</h2>
        {categoryPosts.length === 0 ? (
          <p className="text-sm text-zinc-500">
            아직 이 카테고리에 등록된 글이 없습니다.
          </p>
        ) : (
          <ul className="space-y-3">
            {categoryPosts.map((post) => (
              <li
                key={post.slug}
                className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm shadow-sm transition hover:border-zinc-300 hover:shadow-md sm:px-5 sm:py-4"
              >
                <Link
                  href={`/posts/${post.slug}`}
                  className="flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-zinc-900 sm:text-base">
                      {post.title}
                    </h3>
                    <span className="text-[11px] text-zinc-500">
                      {post.readTime} 소요
                    </span>
                  </div>
                  <p className="line-clamp-2 text-xs text-zinc-600 sm:text-sm">
                    {post.summary}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

