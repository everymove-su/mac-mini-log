import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Link from "next/link";
import "./globals.css";

// Google Analytics 측정 ID - Google Analytics에서 발급받은 ID로 교체하세요
const GA_MEASUREMENT_ID = "G-4RZ7JKKGHK";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteName = "마이로그팁 (MyLogTip)";
const defaultTitle = `${siteName} : 재테크·IT·일상을 기록하는 블로그`;
const defaultDescription =
  "공모주 청약 전략과 결과, IT 기기 활용법, 마라톤·육아 일상까지 — 데이터와 경험으로 쌓아가는 솔직한 기록 블로그입니다.";

export const metadata: Metadata = {
  metadataBase: new URL("https://mylogtip.com"),
  verification: {
    google: "CJOi1b5xKqKbYFZJBTwS0EbRvv0vIgrTyaLCKAzsct0",
  },
  other: {
    "google-adsense-account": "ca-pub-9263526402196766",
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
  { href: "/tools", label: "도구" },
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
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9263526402196766"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
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
                마이로그팁은 재테크, IT, 일상을 솔직하게 기록하는 블로그입니다. 직접 경험한 것들만 공유합니다.
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span>© {new Date().getFullYear()} {siteName}</span>
                <div className="flex flex-wrap items-center gap-3">
                  <span>Adsense · Affiliate · eBook</span>
                  <span>·</span>
                  <Link href="/privacy" className="hover:text-zinc-900 transition">개인정보처리방침</Link>
                  <span>·</span>
                  <Link href="/terms" className="hover:text-zinc-900 transition">이용약관</Link>
                  <span>·</span>
                  <Link href="/disclaimer" className="hover:text-zinc-900 transition">면책고지</Link>
                  <span>·</span>
                  <Link href="/contact" className="hover:text-zinc-900 transition">문의하기</Link>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
