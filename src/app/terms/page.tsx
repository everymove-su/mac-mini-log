import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "이용약관",
  description: "마이로그팁 이용약관입니다.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          이용약관
        </h1>
        <p className="text-sm text-zinc-500">최종 수정일: 2026년 3월 23일</p>
      </header>

      <div className="space-y-8 text-sm leading-relaxed text-zinc-700 sm:text-base">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900">1. 서비스 소개</h2>
          <p>
            마이로그팁(이하 "본 블로그")는 IT, 재테크, 일상에 관한 개인 블로그입니다.
            본 이용약관은 본 블로그를 이용하는 모든 방문자에게 적용됩니다.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900">2. 콘텐츠 저작권</h2>
          <p>
            본 블로그에 게재된 모든 글, 이미지, 코드 등의 콘텐츠는 별도 표기가 없는 한
            운영자에게 저작권이 있습니다. 콘텐츠를 무단으로 복제, 배포, 수정하는 행위는
            저작권법에 의해 금지됩니다.
          </p>
          <p>
            단, 출처를 명확히 표기하는 경우 일부 내용을 인용할 수 있습니다.
            상업적 이용을 위해서는 사전에 운영자의 허가가 필요합니다.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900">3. 정보의 정확성</h2>
          <p>
            본 블로그는 최신 정보를 제공하기 위해 노력하지만, 모든 콘텐츠의 정확성,
            완전성, 최신성을 보장하지 않습니다. 특히 재테크, 투자 관련 정보는
            개인의 경험과 견해를 기반으로 하며, 전문적인 투자 조언이 아닙니다.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900">4. 외부 링크</h2>
          <p>
            본 블로그에는 외부 사이트로의 링크가 포함될 수 있습니다.
            이러한 외부 링크는 편의를 위해 제공되며, 외부 사이트의 내용에 대해
            본 블로그는 책임을 지지 않습니다.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900">5. 광고 및 제휴</h2>
          <p>
            본 블로그는 Google AdSense 광고 및 제휴 마케팅(쿠팡 파트너스 등)을 통해
            수익을 창출할 수 있습니다. 제휴 링크를 통한 구매 시 운영자에게 소정의
            수수료가 지급될 수 있으며, 이는 방문자에게 추가 비용을 발생시키지 않습니다.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900">6. 면책 조항</h2>
          <p>
            본 블로그의 정보를 이용함으로써 발생하는 어떠한 손해에 대해서도
            운영자는 책임을 지지 않습니다. 모든 정보는 참고용으로만 활용하시기 바랍니다.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900">7. 약관 변경</h2>
          <p>
            본 이용약관은 필요에 따라 변경될 수 있으며, 변경 시 본 페이지를 통해
            공지합니다. 변경된 약관은 게시 즉시 효력이 발생합니다.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900">8. 문의</h2>
          <p>
            이용약관에 관한 문의사항은{" "}
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
