import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "문의하기",
  description: "맥미니 로그 운영자에게 문의하세요. 블로그 제휴, 피드백, 오류 제보 등을 환영합니다.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          문의하기
        </h1>
        <p className="text-base text-zinc-600 sm:text-lg">
          블로그 관련 문의사항이 있으시면 아래로 연락해 주세요.
        </p>
      </header>

      <div className="space-y-4">
        <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            이메일 문의
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-700 sm:text-base">
            아래 이메일로 문의 주시면 최대한 빠르게 답변드리겠습니다.
            스팸 방지를 위해 이메일 주소는 아래와 같이 표기합니다.
          </p>
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3">
            <span className="text-lg">✉️</span>
            <span className="text-sm font-medium text-zinc-800 sm:text-base">
              everymove.su [at] gmail [dot] com
            </span>
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            문의 가능한 내용
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-700 sm:text-base">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-emerald-500">•</span>
              <span><strong className="text-zinc-900">콘텐츠 오류 제보</strong> — 포스트 내용 중 잘못된 정보나 수정이 필요한 부분</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-emerald-500">•</span>
              <span><strong className="text-zinc-900">블로그 제휴 문의</strong> — 광고, 협찬, 공동 콘텐츠 제작 등</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-emerald-500">•</span>
              <span><strong className="text-zinc-900">독자 피드백</strong> — 읽고 싶은 주제나 개선 사항 제안</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-emerald-500">•</span>
              <span><strong className="text-zinc-900">기타 문의</strong> — 그 외 블로그와 관련된 모든 사항</span>
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            답변 안내
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-700 sm:text-base">
            직장과 육아를 병행하며 블로그를 운영하고 있어 답변이 다소 늦을 수 있습니다.
            보통 <strong className="text-zinc-900">영업일 기준 2~3일 이내</strong>에 답변드리고 있습니다.
            스팸 및 홍보성 메일은 별도 안내 없이 삭제될 수 있습니다.
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
