"use client";

import { useState } from "react";
import type { Metadata } from "next";
import Link from "next/link";

export default function PaceCalculatorPage() {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [distance, setDistance] = useState("21.0975");
  const [result, setResult] = useState<{
    paceMin: number;
    paceSec: number;
    totalSeconds: number;
  } | null>(null);

  const calculate = () => {
    const totalSeconds = (parseInt(hours || "0") * 3600) + (parseInt(minutes || "0") * 60);
    const dist = parseFloat(distance);
    if (!totalSeconds || !dist) return;
    const paceSeconds = totalSeconds / dist;
    const paceMin = Math.floor(paceSeconds / 60);
    const paceSec = Math.round(paceSeconds % 60);
    setResult({ paceMin, paceSec, totalSeconds });
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}시간 ${m}분 ${s}초`;
  };

  const DISTANCES = [
    { label: "하프마라톤 (21.0975km)", value: "21.0975" },
    { label: "풀마라톤 (42.195km)", value: "42.195" },
    { label: "10km", value: "10" },
    { label: "5km", value: "5" },
  ];

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          🏃 마라톤 페이스 계산기
        </h1>
        <p className="text-sm text-zinc-600">
          목표 완주 시간을 입력하면 km당 필요 페이스를 계산해드립니다.
        </p>
      </header>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm space-y-6">
        
        {/* 거리 선택 */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-700">종목 선택</label>
          <div className="grid grid-cols-2 gap-2">
            {DISTANCES.map((d) => (
              <button
                key={d.value}
                onClick={() => setDistance(d.value)}
                className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
                  distance === d.value
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* 목표 시간 입력 */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-700">목표 완주 시간</label>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="0"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-20 rounded-xl border border-zinc-200 px-3 py-2 text-center text-lg font-semibold focus:border-emerald-400 focus:outline-none"
                min="0"
                max="24"
              />
              <span className="text-sm text-zinc-500">시간</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="0"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                className="w-20 rounded-xl border border-zinc-200 px-3 py-2 text-center text-lg font-semibold focus:border-emerald-400 focus:outline-none"
                min="0"
                max="59"
              />
              <span className="text-sm text-zinc-500">분</span>
            </div>
          </div>
        </div>

        {/* 계산 버튼 */}
        <button
          onClick={calculate}
          className="w-full rounded-xl bg-emerald-500 px-4 py-3 text-base font-semibold text-white transition hover:bg-emerald-600"
        >
          페이스 계산하기
        </button>

        {/* 결과 */}
        {result && (
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-5 space-y-3">
            <p className="text-sm font-semibold text-emerald-700">계산 결과</p>
            <div className="text-center space-y-2">
              <p className="text-4xl font-extrabold text-emerald-600">
                {result.paceMin}분 {result.paceSec}초
                <span className="text-lg font-medium text-emerald-500"> / km</span>
              </p>
              <p className="text-sm text-zinc-500">
                목표 시간: {formatTime(result.totalSeconds)}
              </p>
            </div>
            {/* 참고 페이스 */}
            <div className="border-t border-emerald-200 pt-3 space-y-1">
              <p className="text-xs font-semibold text-zinc-500">페이스 참고</p>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-lg bg-white border border-emerald-100 p-2">
                  <p className="font-bold text-zinc-700">느리게</p>
                  <p className="text-zinc-500">{result.paceMin + 1}분대</p>
                </div>
                <div className="rounded-lg bg-emerald-100 border border-emerald-300 p-2">
                  <p className="font-bold text-emerald-700">목표</p>
                  <p className="text-emerald-600">{result.paceMin}분 {result.paceSec}초</p>
                </div>
                <div className="rounded-lg bg-white border border-emerald-100 p-2">
                  <p className="font-bold text-zinc-700">빠르게</p>
                  <p className="text-zinc-500">{result.paceMin - 1}분대</p>
                </div>
              </div>
            </div>
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