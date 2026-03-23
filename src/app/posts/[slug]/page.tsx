import type { Metadata } from "next";
import Link from "next/link";
import { getPostBySlug, getPostsByCategory, publishedPosts, CATEGORIES } from "@/data/posts";

function renderContent(content: string) {
  const blocks: React.ReactNode[] = [];
  const rawBlocks = content.split("\n\n");
  let i = 0;

  while (i < rawBlocks.length) {
    const block = rawBlocks[i].trim();

    if (block.startsWith("```")) {
      const codeLines: string[] = [];
      const innerLines = block.split("\n");
      if (innerLines.length > 2 && innerLines[innerLines.length - 1].startsWith("```")) {
        const code = innerLines.slice(1, -1).join("\n");
        blocks.push(
          <pre key={i} className="my-6 overflow-x-auto rounded-xl bg-zinc-100 border border-zinc-200 px-5 py-4 text-xs text-zinc-800 shadow-sm sm:text-sm">
            <code className="font-mono">{code}</code>
          </pre>
        );
      } else {
        codeLines.push(...innerLines.slice(1));
        i++;
        while (i < rawBlocks.length && !rawBlocks[i].trim().startsWith("```")) {
          codeLines.push(rawBlocks[i]);
          i++;
        }
        blocks.push(
          <pre key={i} className="my-6 overflow-x-auto rounded-xl bg-zinc-100 border border-zinc-200 px-5 py-4 text-xs text-zinc-800 shadow-sm sm:text-sm">
            <code className="font-mono">{codeLines.join("\n")}</code>
          </pre>
        );
      }
      i++;
      continue;
    }

    if (block.startsWith("### ")) {
      blocks.push(
        <h3 key={i} className="mt-8 mb-3 text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
          {block.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    if (block.startsWith("## ")) {
      blocks.push(
        <h2 key={i} className="mt-12 mb-4 border-b border-zinc-200 pb-2 text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
          {block.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    if (/^\d+\.\s/.test(block)) {
      const items = block.split("\n").map((line) => line.replace(/^\d+\.\s/, ""));
      blocks.push(
        <ol key={i} className="my-5 list-decimal space-y-2 pl-6 text-zinc-700 text-base sm:text-lg">
          {items.map((item, j) => (
            <li key={j} className="leading-relaxed">{parseInlineStyles(item)}</li>
          ))}
        </ol>
      );
      i++;
      continue;
    }

    if (/^-\s/.test(block)) {
      const items = block.split("\n").map((line) => line.replace(/^-\s/, ""));
      blocks.push(
        <ul key={i} className="my-5 list-disc space-y-2 pl-6 text-zinc-700 text-base sm:text-lg">
          {items.map((item, j) => (
            <li key={j} className="leading-relaxed">{parseInlineStyles(item)}</li>
          ))}
        </ul>
      );
      i++;
      continue;
    }

    if (block.startsWith("> ")) {
      const quoteText = block
        .split("\n")
        .map((line) => line.replace(/^> /, ""))
        .join(" ");
      blocks.push(
        <blockquote key={i} className="my-8 border-l-4 border-emerald-400 bg-emerald-50 rounded-r-xl px-6 py-4 text-lg italic text-emerald-900">
          {quoteText}
        </blockquote>
      );
      i++;
      continue;
    }

    if (block === "---") {
      blocks.push(<hr key={i} className="my-10 border-zinc-200" />);
      i++;
      continue;
    }

    if (block.startsWith("![")) {
      const match = block.match(/!\[(.*?)\]\((.*?)\)/);
      if (match) {
        const alt = match[1];
        const src = match[2];
        blocks.push(
          <div key={i} className="my-8 mx-auto max-w-2xl overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 shadow-md">
            <img
              src={src}
              alt={alt}
              className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-500"
            />
            {alt && (
              <p className="px-4 py-3 text-center text-sm text-zinc-400 border-t border-zinc-200 italic">
                {alt}
              </p>
            )}
          </div>
        );
        i++;
        continue;
      }
    }

    if (block.startsWith("|")) {
      const rows = block.split("\n").filter(row => row.trim().length > 0);
      if (rows.length >= 2) {
        const headerRow = rows[0].split("|").filter((_, j) => j > 0 && j < rows[0].split("|").length - 1).map(c => c.trim());
        const bodyRows = rows.slice(2).map(row => row.split("|").filter((_, j) => j > 0 && j < row.split("|").length - 1).map(c => c.trim()));
        blocks.push(
          <div key={i} className="my-8 overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50 text-zinc-900 border-b border-zinc-200">
                <tr>
                  {headerRow.map((cell, j) => (
                    <th key={j} className="px-4 py-3 font-bold">{cell}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-zinc-700">
                {bodyRows.map((row, j) => (
                  <tr key={j} className="hover:bg-zinc-50 transition-colors">
                    {row.map((cell, k) => (
                      <td key={k} className="px-4 py-3 whitespace-nowrap">{parseInlineStyles(cell)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        i++;
        continue;
      }
    }

    if (block.length > 0) {
      blocks.push(
        <p key={i} className="mb-5 leading-8 text-zinc-700 text-base sm:text-lg">
          {parseInlineStyles(block)}
        </p>
      );
    }

    i++;
  }

  return blocks;
}

function parseInlineStyles(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, j) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={j} className="font-bold text-zinc-900">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  );
}

type Params = {
  slug: string;
};

export function generateStaticParams() {
  return publishedPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "글을 찾을 수 없습니다" };
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
      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-4 px-6 py-16">
        <h1 className="text-2xl font-bold text-zinc-900">글을 찾을 수 없습니다.</h1>
        <p className="text-zinc-500">주소가 잘못되었거나, 글이 삭제된 것 같아요.</p>
        <Link href="/" className="mt-4 inline-flex font-medium text-emerald-600 hover:text-emerald-700">
          홈으로 돌아가기 →
        </Link>
      </div>
    );
  }

  const category = CATEGORIES[post.category];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://mac-mini-log.vercel.app";
  const postUrl = `${siteUrl}/posts/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    url: postUrl,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: "everymove-su",
      url: `${siteUrl}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: "맥미니 로그 (Mac Mini Log)",
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    keywords: post.tags.join(", "),
    articleSection: category.label,
    inLanguage: "ko-KR",
  };

  return (
    <article className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="mb-10 space-y-5">
        <Link
          href={`/categories/${post.category}`}
          className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition"
        >
          {category.label}
        </Link>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl leading-snug">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-zinc-400">
          <span>{post.publishedAt}</span>
          <span>·</span>
          <span>{post.readTime} 소요</span>
        </div>
        <p className="border-l-4 border-emerald-400 bg-emerald-50 rounded-r-xl pl-4 pr-4 py-3 text-base leading-relaxed text-zinc-700 italic">
          {post.summary}
        </p>
      </header>

      <div className="text-base sm:text-lg">
        {renderContent(post.content)}
      </div>
      {/* 관련글 추천 */}
      {(() => {
        const related = getPostsByCategory(post.category)
          .filter((p) => p.slug !== post.slug)
          .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
          .slice(0, 3);
        if (related.length === 0) return null;
        return (
          <section className="mt-16 border-t border-zinc-200 pt-8">
            <h2 className="mb-5 text-lg font-bold text-zinc-900">관련 글</h2>
            <ul className="space-y-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/posts/${r.slug}`}
                    className="flex flex-col gap-1 rounded-xl border border-zinc-200 bg-white px-4 py-3 shadow-sm transition hover:border-zinc-300 hover:shadow-md"
                  >
                    <span className="text-sm font-semibold text-zinc-900 hover:text-emerald-700">
                      {r.title}
                    </span>
                    <span className="text-xs text-zinc-500 line-clamp-2">
                      {r.summary}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })()}

      <footer className="mt-16 border-t border-zinc-200 pt-8"></footer>
      <footer className="mt-16 border-t border-zinc-200 pt-8">
        <div className="mb-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex rounded-lg bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-600 border border-zinc-200 hover:bg-zinc-200 transition"
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="rounded-2xl bg-zinc-50 p-6 text-sm text-zinc-500 border border-zinc-200 leading-relaxed">
          <p className="font-semibold text-zinc-900 mb-2 tracking-wider uppercase text-[10px]">Notice</p>
          <p>
            이 영역에는 애드센스 광고, 쿠팡/아마존 제휴 링크, 전자책 링크 등을
            배치할 수 있습니다. 본문 내용이 도움이 되셨다면 아래 공유 버튼을 눌러주세요.
          </p>
        </div>
      </footer>
    </article>
  );
}