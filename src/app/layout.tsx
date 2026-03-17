import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteName = "맥미니 로그 (Mac Mini Log)";
const defaultTitle = `${siteName} : 데이터와 테크로 설계하는 고효율 일상`;
const defaultDescription =
  "M4 맥 미니의 성능을 한계까지 활용하는 스마트 라이프 가이드입니다. 데이터 기반의 주식 인사이트로 자산을 관리하고, 정밀한 피트니스 기록으로 건강을 설계하며, 최적의 데스크테리어와 AI 도구로 업무 생산성을 극대화하는 법을 기록합니다.";

export const metadata: Metadata = {
  verification: {
    google: "AGsvaPH00rbj1vlLP4x9lsRlqf8vycNDQiGVEStPfJw",
  },
  other: {
    "google-adsense-account": "ca-pub-2349123175482959",
  },
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    siteName,
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
};

const NAV_ITEMS = [
  { href: "/posts", label: "전체글" },
  { href: "/categories/it", label: "IT" },
  { href: "/categories/finance", label: "재테크" },
  { href: "/categories/daily", label: "일상" },
  { href: "/tools/pace-calculator", label: "도구" },
  { href: "/about", label: "소개" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 text-zinc-900`}
      >
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-zinc-200 bg-white/80 backdrop-blur">
            <div className="mx-auto flex h-14 w-full max-w-4xl items-center justify-between px-4 sm:px-6 lg:px-8">
              <Link href="/" className="text-sm font-semibold tracking-tight">
                {siteName}
              </Link>
              <nav className="flex items-center gap-3 text-xs sm:text-sm">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full px-2.5 py-1 text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-zinc-200 bg-white">
            <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 px-4 py-5 text-xs text-zinc-500 sm:px-6 lg:px-8">
              <p className="max-w-2xl leading-relaxed text-zinc-600">
                맥미니 로그는 최신 IT 기기를 활용해 일상의 생산성을 높이는 실험실입니다. 직접 사용해 본 제품과 검증된 데이터만을 공유합니다.
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span>© {new Date().getFullYear()} {siteName}</span>
                <div className="flex items-center gap-3">
                <span>Adsense · Affiliate · eBook</span>
                <span>·</span>
                <Link href="/privacy" className="hover:text-zinc-900 transition">
                 개인정보처리방침
                </Link>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
