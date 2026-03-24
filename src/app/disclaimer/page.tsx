import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "면책 고지",
  description: "마이로그팁의 콘텐츠 면책 고지입니다. 투자 정보, 광고 고지 등을 확인하세요.",
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          면책 고지
        </h1>
        <p className="text-sm text-zinc-500">최종 수정일: 2026년 3월 23일</p>
      </header>

      <div className="space-y-4">
        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-amber-700">
            투자 정보 면책 고지
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-700 sm:text-base">
            본 블로그에 게재된 재테크, 공모주, 주식, 가상자산 등 투자 관련 콘텐츠는
            <strong className="text-zinc-900"> 개인의 경험과 주관적인 견해</strong>를 바탕으로 작성된 것으로,
            전문적인 금융 또는 투자 조언이 아닙니다.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-700 sm:text-base">
            투자에는 원금 손실의 위험이 있으며, 모든 투자 결정은 독자 본인의 판단과 책임 하에
            이루어져야 합니다. 본 블로그의 정보를 기반으로 한 투자 결과에 대해
            운영자는 어떠한 책임도 지지 않습니다.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-700 sm:text-base">
            투자 전에는 반드시 공식 금융 기관, 증권사, 또는 공인 투자 전문가의 조언을 구하시기 바랍니다.
          </p>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            광고 및 제휴 마케팅 고지
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-700 sm:text-base">
            본 블로그는 다음과 같은 방식으로 수익을 창출할 수 있습니다.
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-700 sm:text-base">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-emerald-500">•</span>
              <span>
                <strong className="text-zinc-900">Google AdSense</strong> — Google에서 제공하는 맞춤형 광고가 표시될 수 있습니다.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-emerald-500">•</span>
              <span>
                <strong className="text-zinc-900">제휴 마케팅</strong> — 쿠팡 파트너스 등 제휴 링크를 통한 구매 시 소정의 수수료를 받을 수 있습니다. 이는 독자에게 추가 비용을 발생시키지 않습니다.
              </span>
            </li>
          </ul>
          <p className="mt-3 text-sm leading-relaxed text-zinc-700 sm:text-base">
            광고 또는 제휴 관계가 콘텐츠의 객관성에 영향을 미치지 않도록 노력하고 있습니다.
          </p>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            콘텐츠 정확성
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-700 sm:text-base">
            본 블로그는 정확한 정보 제공을 위해 노력하지만, 콘텐츠의 완전성,
            최신성, 정확성을 보장하지 않습니다. IT 제품 사양, 가격, 정책 등은
            언제든지 변경될 수 있으며, 최신 정보는 공식 채널을 통해 확인하시기 바랍니다.
          </p>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            문의
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-700 sm:text-base">
            면책 고지에 관한 문의사항은{" "}
            <Link href="/contact" className="font-medium text-emerald-700 hover:text-emerald-800">
              문의하기 페이지
            </Link>
            를 통해 연락해 주시기 바랍니다.
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
