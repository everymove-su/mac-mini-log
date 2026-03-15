import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "맥미니 로그 개인정보처리방침",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          개인정보처리방침
        </h1>
        <p className="text-sm text-zinc-500">최종 수정일: 2026년 3월 15일</p>
      </header>

      <div className="space-y-8 text-sm leading-relaxed text-zinc-700 sm:text-base">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900">1. 수집하는 개인정보</h2>
          <p>
            맥미니 로그(이하 "본 블로그")는 별도의 회원가입 없이 이용 가능하며,
            방문자의 개인정보를 직접 수집하지 않습니다. 단, 제3자 서비스(Google Analytics,
            Google AdSense 등)를 통해 익명의 방문 통계 데이터가 수집될 수 있습니다.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900">2. 쿠키 사용</h2>
          <p>
            본 블로그는 Google AdSense 및 Google Analytics를 사용합니다.
            이 서비스들은 쿠키를 사용하여 방문자의 관심사에 맞는 광고를 제공하거나
            방문 통계를 분석할 수 있습니다. 방문자는 브라우저 설정을 통해
            쿠키 저장을 거부할 수 있으나, 일부 서비스 이용이 제한될 수 있습니다.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900">3. 제3자 광고 서비스</h2>
          <p>
            본 블로그는 Google AdSense를 통해 광고를 게재할 수 있습니다.
            Google은 쿠키를 사용하여 방문자에게 맞춤형 광고를 제공합니다.
            Google의 광고 및 개인정보 보호 정책에 대한 자세한 내용은
            Google 개인정보처리방침을 참고하시기 바랍니다.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900">4. 제휴 마케팅</h2>
          <p>
            본 블로그는 쿠팡 파트너스 등 제휴 마케팅 프로그램에 참여할 수 있습니다.
            제휴 링크를 통해 구매가 이루어질 경우 소정의 수수료를 받을 수 있으며,
            이는 방문자에게 추가 비용을 발생시키지 않습니다.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900">5. 개인정보 보호 책임자</h2>
          <p>
            개인정보 관련 문의사항이 있으시면 블로그 내 문의 채널을 통해
            연락해 주시기 바랍니다.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900">6. 방침 변경</h2>
          <p>
            본 개인정보처리방침은 법령 및 서비스 변경에 따라 수정될 수 있으며,
            변경 시 본 페이지를 통해 공지합니다.
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