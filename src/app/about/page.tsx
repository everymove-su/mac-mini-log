import type { Metadata } from "next";
import Link from "next/link";

const ABOUT_DESCRIPTION =
  "M4 맥 미니의 성능을 한계까지 활용하는 스마트 라이프 가이드입니다. 데이터 기반의 주식 인사이트로 자산을 관리하고, 정밀한 피트니스 기록으로 건강을 설계하며, 최적의 데스크테리어와 AI 도구로 업무 생산성을 극대화하는 법을 기록합니다.";

export const metadata: Metadata = {
  title: "소개",
  description: ABOUT_DESCRIPTION,
};

export default function AboutPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          맥미니 로그 (Mac Mini Log)
        </h1>
        <p className="text-base text-zinc-600 sm:text-lg">
          데이터와 테크로 설계하는 고효율 일상
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-1">
        <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            소개
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-700 sm:text-base">
            {ABOUT_DESCRIPTION}
          </p>
        </section>
      </div>

      <p className="text-sm text-zinc-500">
        <Link href="/" className="font-medium text-emerald-700 hover:text-emerald-800">
          ← 홈으로
        </Link>
      </p>
    </div>
  );
}
