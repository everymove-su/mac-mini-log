import type { Metadata } from "next";
import Link from "next/link";
import { posts, CATEGORIES } from "@/data/posts";

const MAIN_COPY =
  "M4 맥 미니의 성능을 한계까지 활용하는 스마트 라이프 가이드입니다. 데이터 기반의 주식 인사이트로 자산을 관리하고, 정밀한 피트니스 기록으로 건강을 설계하며, 최적의 데스크테리어와 AI 도구로 업무 생산성을 극대화하는 법을 기록합니다.";

const PILLAR_CARDS = [
  {
    title: "IT",
    description: "맥 미니, 개발환경, 자동화, 데스크테리어·AI 도구 등 IT 관련 내용을 공유합니다.",
    href: "/categories/it",
    label: "IT",
  },
  {
    title: "주식 분석",
    description: "데이터 기반 주식 인사이트로 자산을 설계하고 관리하는 방법과 공모주 분석을 기록합니다.",
    href: "/categories/finance",
    label: "재테크",
  },
  {
    title: "피트니스 데이터",
    description: "정밀한 운동·건강 기록과 데이터로 건강을 설계하는 실전 노하우를 공유합니다.",
    href: "/categories/daily",
    label: "일상",
  },
] as const;

export const metadata: Metadata = {
  title: "홈",
  description: MAIN_COPY,
};

export default function Home() {
  const latestPosts = posts.slice(0, 4);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-medium text-emerald-600">MAC MINI LOG</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          맥미니 로그 (Mac Mini Log)
        </h1>
        <p className="mt-2 text-base font-medium text-zinc-700 sm:text-lg">
          데이터와 테크로 설계하는 고효율 일상
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
          {MAIN_COPY}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
          주제별로 보기
        </h2>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
          {PILLAR_CARDS.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
            >
              <span className="text-[11px] font-medium uppercase tracking-wide text-emerald-600">
                {card.label}
              </span>
              <h3 className="mt-2 text-base font-semibold text-zinc-900 group-hover:text-emerald-700 sm:text-lg">
                {card.title}
              </h3>
              <p className="mt-1 line-clamp-3 text-sm text-zinc-600">
                {card.description}
              </p>
              <span className="mt-3 inline-flex items-center text-sm font-medium text-emerald-700 group-hover:text-emerald-800">
                보러 가기 →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
          최근 글
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {latestPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700">
                    {CATEGORIES[post.category].label}
                  </span>
                  <span>·</span>
                  <span>{post.readTime} 소요</span>
                </div>
                <h3 className="text-base font-semibold leading-snug text-zinc-900 group-hover:text-emerald-700 sm:text-lg">
                  {post.title}
                </h3>
                <p className="line-clamp-3 text-sm text-zinc-600">
                  {post.summary}
                </p>
              </div>
              <Link
                href={`/posts/${post.slug}`}
                className="mt-4 inline-flex items-center text-sm font-medium text-emerald-700 hover:text-emerald-800"
              >
                읽어보기
                <span aria-hidden="true" className="ml-1">
                  →
                </span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
