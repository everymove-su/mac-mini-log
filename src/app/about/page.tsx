import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "소개",
  description: "마이로그팁 운영자 everymove-su의 소개 페이지입니다.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          안녕하세요, everymove-su입니다 👋
        </h1>
        <p className="text-base text-zinc-600 sm:text-lg">
          재테크·IT·일상을 솔직하게 기록합니다
        </p>
      </header>

      <div className="space-y-4">
        <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            저는 이런 사람입니다
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-700 sm:text-base">
            시스템 운영 분야에서 일하고 있으며, 와이프와 23개월 딸아이와 함께 살고 있는 육아 아빠입니다.
            평일엔 회사와 육아를 병행하고, 아이가 잠든 후 찾아오는 소중한 자유 시간 — 이른바 <strong className="text-zinc-900">'육퇴'</strong>의 시간에 블로그를 씁니다.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-700 sm:text-base">
            예전부터 블로그를 시작해보고 싶었는데, 올해 구체적인 목표가 생기면서 드디어 실행에 옮겼습니다.
            M4 맥미니를 중심으로 개발환경을 세팅하고, 직접 블로그 사이트(마이로그팁)를 만들어 운영하고 있어요.
          </p>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            관심사
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { emoji: "💻", label: "맥미니 & IT" },
              { emoji: "📈", label: "재테크 & 공모주" },
              { emoji: "🏃", label: "마라톤 & 러닝" },
              { emoji: "🤖", label: "AI 활용" },
              { emoji: "👶", label: "육아" },
              { emoji: "🛍️", label: "쇼핑 & 리뷰" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 rounded-xl border border-zinc-100 bg-zinc-50 px-3 py-2 text-sm text-zinc-700"
              >
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            이 블로그에서 다루는 것들
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-700 sm:text-base">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-emerald-500">•</span>
              <span><strong className="text-zinc-900">IT</strong> — IT 기기 활용법, 개발환경 세팅, 생산성 도구 리뷰</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-emerald-500">•</span>
              <span><strong className="text-zinc-900">재테크</strong> — 공모주 청약 일정 및 결과, 데이터 기반 투자 기록</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-emerald-500">•</span>
              <span><strong className="text-zinc-900">일상</strong> — 육아 아빠의 마라톤 도전기, 육퇴 후 루틴 기록</span>
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            2026년 목표
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-700 sm:text-base">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-emerald-500">•</span>
              <span>4월 조선일보 서울하프마라톤 2시간 30분 완주</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-emerald-500">•</span>
              <span>올해 모든 공모주 빠짐없이 청약 도전</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-emerald-500">•</span>
              <span>딸아이가 커가는 과정 데이터로 기록하기</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-emerald-500">•</span>
              <span>꾸준한 블로그 운영으로 나만의 디지털 공간 만들기</span>
            </li>
          </ul>
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