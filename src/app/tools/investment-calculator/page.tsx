"use client";

import { useState } from "react";
import Link from "next/link";

export default function InvestmentCalculatorPage() {
  const [monthly, setMonthly] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [initial, setInitial] = useState("");
  const [result, setResult] = useState<{
    total: number;
    principal: number;
    profit: number;
  } | null>(null);

  const calculate = () => {
    const m = parseFloat(monthly) * 10000;
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(years) * 12;
    const p = parseFloat(initial || "0") * 10000;

    if (!m || !r || !n) return;

    const futureMonthly = m * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const futureInitial = p * Math.pow(1 + r, n);
    const total = Math.round(futureMonthly + futureInitial);
    const principal = Math.round(m * n + p);
    const profit = total - principal;

    setResult({ total, principal, profit });
  };

  const formatWon = (n: number) => {
    if (n >= 100000000) {
      const uk = Math.floor(n / 100000000);
      const man = Math.floor((n % 100000000) / 10000);
      return man > 0 ? `${uk}억 ${man.toLocaleString()}만원` : `${uk}억원`;
    }
    return `${Math.floor(n / 10000).toLocaleString()}만원`;
  };

  const RATE_PRESETS = [
    { label: "보수적 5%", value: "5" },
    { label: "일반 8%", value: "8" },
    { label: "적극적 12%", value: "12" },
  ];

  const YEAR_PRESETS = [
    { label: "5년", value: "5" },
    { label: "10년", value: "10" },
    { label: "20년", value: "20" },
    { label: "30년", value: "30" },
  ];

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          💰 적립식 투자 복리 계산기
        </h1>
        <p className="text-sm text-zinc-600">
          매월 투자금액과 예상 수익률을 입력하면 미래 자산을 계산해드립니다.
        </p>
      </header>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm space-y-6">

        {/* 초기 투자금 */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-700">초기 투자금 (만원)</label>
          <input
            type="number"
            placeholder="예: 500"
            value={initial}
            onChange={(e) => setInitial(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-base focus:border-emerald-400 focus:outline-none"
          />
          <p className="text-xs text-zinc-400">없으면 비워두세요</p>
        </div>

        {/* 월 적립금 */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-700">월 적립금 (만원)</label>
          <input
            type="number"
            placeholder="예: 30"
            value={monthly}
            onChange={(e) => setMonthly(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-base focus:border-emerald-400 focus:outline-none"
          />
        </div>

        {/* 연 수익률 */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-700">연 수익률</label>
          <div className="flex gap-2 mb-2">
            {RATE_PRESETS.map((p) => (
              <button
                key={p.value}
                onClick={() => setRate(p.value)}
                className={`flex-1 rounded-xl border px-2 py-2 text-xs font-medium transition ${
                  rate === p.value
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="직접 입력"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-base focus:border-emerald-400 focus:outline-none"
            />
            <span className="text-sm text-zinc-500 shrink-0">%</span>
          </div>
        </div>

        {/* 투자 기간 */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-700">투자 기간</label>
          <div className="flex gap-2 mb-2">
            {YEAR_PRESETS.map((p) => (
              <button
                key={p.value}
                onClick={() => setYears(p.value)}
                className={`flex-1 rounded-xl border px-2 py-2 text-xs font-medium transition ${
                  years === p.value
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="직접 입력"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-base focus:border-emerald-400 focus:outline-none"
            />
            <span className="text-sm text-zinc-500 shrink-0">년</span>
          </div>
        </div>

        {/* 계산 버튼 */}
        <button
          onClick={calculate}
          className="w-full rounded-xl bg-emerald-500 px-4 py-3 text-base font-semibold text-white transition hover:bg-emerald-600"
        >
          수익 계산하기
        </button>

        {/* 결과 */}
        {result && (
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-5 space-y-4">
            <p className="text-sm font-semibold text-emerald-700">계산 결과</p>
            <div className="text-center">
              <p className="text-sm text-zinc-500 mb-1">최종 자산</p>
              <p className="text-4xl font-extrabold text-emerald-600">
                {formatWon(result.total)}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white border border-emerald-100 p-3 text-center">
                <p className="text-xs text-zinc-500 mb-1">총 납입금</p>
                <p className="text-lg font-bold text-zinc-700">{formatWon(result.principal)}</p>
              </div>
              <div className="rounded-xl bg-white border border-emerald-100 p-3 text-center">
                <p className="text-xs text-zinc-500 mb-1">총 수익</p>
                <p className="text-lg font-bold text-emerald-600">+{formatWon(result.profit)}</p>
              </div>
            </div>
            <div className="rounded-xl bg-white border border-emerald-100 p-3 text-center">
              <p className="text-xs text-zinc-500 mb-1">수익률</p>
              <p className="text-2xl font-bold text-emerald-600">
                +{Math.round((result.profit / result.principal) * 100)}%
              </p>
            </div>
            <p className="text-xs text-zinc-400 text-center">
              ※ 본 계산기는 참고용이며 실제 수익을 보장하지 않습니다.
            </p>
          </div>
        )}
      </div>

      <p className="text-sm text-zinc-500">
        <Link href="/" className="font-medium text-emerald-700 hover:text-emerald-800">
          ← 홈으로
        </Link>
      </p>
    </div>
  );
}