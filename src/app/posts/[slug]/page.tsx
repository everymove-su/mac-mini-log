import type { Metadata } from "next";
import Link from "next/link";
import { getPostBySlug, posts, CATEGORIES } from "@/data/posts";

/** 간단한 마크다운 블록 렌더러 (외부 라이브러리 없이) */
function renderContent(content: string) {
  const blocks: React.ReactNode[] = [];
  const rawBlocks = content.split("\n\n");
  let i = 0;

  while (i < rawBlocks.length) {
    const block = rawBlocks[i].trim();

    // 코드블록 시작
    if (block.startsWith("```")) {
      const codeLines: string[] = [];
      const innerLines = block.split("\n");
      if (innerLines.length > 2 && innerLines[innerLines.length - 1].startsWith("```")) {
        const code = innerLines.slice(1, -1).join("\n");
        blocks.push(
          <pre key={i} className="my-6 overflow-x-auto rounded-xl bg-zinc-900/50 border border-zinc-800 px-5 py-4 text-xs text-zinc-300 shadow-lg sm:text-sm">
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
          <pre key={i} className="my-6 overflow-x-auto rounded-xl bg-zinc-900/50 border border-zinc-800 px-5 py-4 text-xs text-zinc-300 shadow-lg sm:text-sm">
            <code className="font-mono">{codeLines.join("\n")}</code>
          </pre>
        );
      }
      i++;
      continue;
    }

    // h3 헤딩
    if (block.startsWith("### ")) {
      blocks.push(
        <h3 key={i} className="mt-10 mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl">
          {block.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    // h2 헤딩
    if (block.startsWith("## ")) {
      blocks.push(
        <h2 key={i} className="mt-14 mb-5 border-b border-zinc-800 pb-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          {block.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    // 순서 있는 리스트 (1. )
    if (/^\d+\.\s/.test(block)) {
      const items = block.split("\n").map((line) => line.replace(/^\d+\.\s/, ""));
      blocks.push(
        <ol key={i} className="my-6 list-decimal space-y-3 pl-6 text-zinc-300">
          {items.map((item, j) => (
            <li key={j} className="leading-relaxed">{parseInlineStyles(item)}</li>
          ))}
        </ol>
      );
      i++;
      continue;
    }

    // 순서 없는 리스트 (- )
    if (/^-\s/.test(block)) {
      const items = block.split("\n").map((line) => line.replace(/^-\s/, ""));
      blocks.push(
        <ul key={i} className="my-6 list-disc space-y-3 pl-6 text-zinc-300">
          {items.map((item, j) => (
            <li key={j} className="leading-relaxed">{parseInlineStyles(item)}</li>
          ))}
        </ul>
      );
      i++;
      continue;
    }

    // 인용문 (blockquote)
    if (block.startsWith("> ")) {
      const quoteText = block
        .split("\n")
        .map((line) => line.replace(/^> /, ""))
        .join(" ");
      blocks.push(
        <blockquote key={i} className="my-8 border-l-4 border-emerald-500 bg-emerald-950/20 px-6 py-4 text-lg italic text-emerald-100">
          {quoteText}
        </blockquote>
      );
      i++;
      continue;
    }

    // 수평선 (---)
    if (block === "---") {
      blocks.push(<hr key={i} className="my-12 border-zinc-800" />);
      i++;
      continue;
    }

    // 이미지 (![alt](url))
    if (block.startsWith("![")) {
      const match = block.match(/!\[(.*?)\]\((.*?)\)/);
      if (match) {
        const alt = match[1];
        const src = match[2];
        blocks.push(
          <div key={i} className="my-10 mx-auto max-w-2xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl">
            <img 
              src={src} 
              alt={alt} 
              className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-500" 
            />
            {alt && (
              <p className="px-4 py-3 text-center text-sm text-zinc-500 border-t border-zinc-800 italic">
                {alt}
              </p>
            )}
          </div>
        );
        i++;
        continue;
      }
    }

    // 테이블 (| Col | Col |)
    if (block.startsWith("|")) {
      const rows = block.split("\n").filter(row => row.trim().length > 0);
      if (rows.length >= 2) {
        const headerRow = rows[0].split("|").filter((_, j) => j > 0 && j < rows[0].split("|").length - 1).map(c => c.trim());
        const bodyRows = rows.slice(2).map(row => row.split("|").filter((_, j) => j > 0 && j < row.split("|").length - 1).map(c => c.trim()));
        
        blocks.push(
          <div key={i} className="my-10 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/30">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-800/50 text-white border-b border-zinc-800">
                <tr>
                  {headerRow.map((cell, j) => (
                    <th key={j} className="px-4 py-3 font-bold">{cell}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-300">
                {bodyRows.map((row, j) => (
                  <tr key={j} className="hover:bg-zinc-800/30 transition-colors">
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

    // 테이블 (| Col | Col |)
    if (block.startsWith("|")) {
      const rows = block.split("\n").filter(row => row.trim().length > 0);
      if (rows.length >= 2) {
        const headerRow = rows[0].split("|").filter((_, j) => j > 0 && j < rows[0].split("|").length - 1).map(c => c.trim());
        const bodyRows = rows.slice(2).map(row => row.split("|").filter((_, j) => j > 0 && j < row.split("|").length - 1).map(c => c.trim()));
        
        blocks.push(
          <div key={i} className="my-10 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/30">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-800/50 text-white border-b border-zinc-800">
                <tr>
                  {headerRow.map((cell, j) => (
                    <th key={j} className="px-4 py-3 font-bold">{cell}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-300">
                {bodyRows.map((row, j) => (
                  <tr key={j} className="hover:bg-zinc-800/30 transition-colors">
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

    // 일반 문단 (빈 블록 제외)
    if (block.length > 0) {
      blocks.push(
        <p key={i} className="mb-6 leading-8 text-zinc-200">
          {parseInlineStyles(block)}
        </p>
      );
    }

    i++;
  }

  return blocks;
}

/** 인라인 스타일 (볼드 등) 처리 */
function parseInlineStyles(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, j) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={j} className="font-bold text-white">
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
      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-4 px-6 py-20 text-white">
        <h1 className="text-2xl font-bold">글을 찾을 수 없습니다.</h1>
        <p className="text-zinc-400">
          주소가 잘못되었거나, 글이 삭제된 것 같아요.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex font-medium text-emerald-400 hover:text-emerald-300"
        >
          홈으로 돌아가기 →
        </Link>
      </div>
    );
  }

  const category = CATEGORIES[post.category];

  return (
    <article className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-6 py-20">
      <header className="mb-12 space-y-6">
        <Link
          href={`/categories/${post.category}`}
          className="inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400"
        >
          {category.label}
        </Link>
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-zinc-400">
          <span>{post.publishedAt}</span>
          <span>·</span>
          <span>{post.readTime} 소요</span>
        </div>
        <p className="border-l-4 border-zinc-800 pl-4 text-xl leading-relaxed text-zinc-300 italic">
          {post.summary}
        </p>
      </header>

      <div className="text-lg">
        {renderContent(post.content)}
      </div>

      <footer className="mt-20 border-t border-zinc-800 pt-10">
        <div className="mb-6 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex rounded-lg bg-zinc-900 px-3 py-1.5 text-sm font-medium text-zinc-400 border border-zinc-800"
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="rounded-2xl bg-zinc-900 p-8 text-sm text-zinc-400 border border-zinc-800 leading-relaxed shadow-inner">
          <p className="font-semibold text-white mb-2 font-mono tracking-wider uppercase text-[10px]">Notice</p>
          <p>
            이 영역에는 애드센스 광고, 쿠팡/아마존 제휴 링크, 전자책 링크 등을
            배치할 수 있습니다. 본문 내용이 도움이 되셨다면 아래 공유 버튼을 눌러주세요.
          </p>
        </div>
      </footer>
    </article>
  );
}

