import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "도구 모음",
  description: "맥미니 로그에서 제공하는 유용한 계산기 모음입니다.",
};

const TOOLS = [
  {
    href: "/tools/pace-calculator",
    emoji: "🏃",
    title: "마라톤 페이스 계산기",
    description: "목표 완주 시간을 입력하면 km당 필요 페이스를 계산해드립니다.",
  },
  {
    href: "/tools/investment-calculator",
    emoji: "💰",
    title: "적립식 투자 복리 계산기",
    description: "매월 투자금액과 수익률을 입력하면 미래 자산을 계산해드립니다.",
  },
];

export default function ToolsPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          도구 모음
        </h1>
        <p className="text-sm text-zinc-600">
          맥미니 로그에서 제공하는 유용한 계산기들이에요 😊
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
          >
            <span className="text-3xl">{tool.emoji}</span>
            <div className="space-y-1">
              <h2 className="text-base font-semibold text-zinc-900 group-hover:text-emerald-700 sm:text-lg">
                {tool.title}
              </h2>
              <p className="text-sm text-zinc-600">{tool.description}</p>
            </div>
            <span className="mt-auto text-sm font-medium text-emerald-700 group-hover:text-emerald-800">
              사용하기 →
            </span>
          </Link>
        ))}
      </div>

      <p className="text-sm text-zinc-500">
        <Link href="/" className="font-medium text-emerald-700 hover:text-emerald-800">
          ← 홈으로
        </Link>
      </p>
    </div>
  );
}