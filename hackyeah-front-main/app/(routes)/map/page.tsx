"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { FaArrowLeftLong, FaFilter, FaLayerGroup, FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { LuCheck, LuClock3 } from "react-icons/lu";
import { FiAlertTriangle } from "react-icons/fi";

// Import mapy bez SSR (ważne dla bibliotek używających window)
const MapWithNoSSR = dynamic(() => import("@/app/components/Map"), {
  ssr: false,
});

// Dane do legendy
const legend = [
  { label: "Poważne problemy", value: 3, tone: "text-rose-600" },
  { label: "Średnie opóźnienia", value: 7, tone: "text-amber-500" },
  { label: "Bez problemów", value: 24, tone: "text-emerald-500" },
];

export default function MapPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="relative min-h-screen bg-[#f5fbff]">
      {/* MAPA — najniżej */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full">
          <MapWithNoSSR />
        </div>
      </div>

      {/* DELIKATNY GRADIENT nad mapą, nieklikalny */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-white/60 via-white/30 to-transparent" />

      {/* WARSTWA UI — wrapper nie łapie klików, tylko same panele */}
      <div className="relative z-20 pointer-events-none flex min-h-screen flex-col gap-5 px-4 pb-10 pt-8 sm:px-6 lg:flex-row lg:items-start lg:gap-8">
        {/* Lewy panel (klikalny) */}
        <div className="pointer-events-auto flex w-full flex-col gap-4 rounded-[28px] bg-white/85 p-4 shadow-lg backdrop-blur md:max-w-md">
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-sky-300 hover:text-slate-900"
            >
              <FaArrowLeftLong />
              Wróć
            </Link>
            <div className="flex items-center gap-2 text-slate-500">
              <button className="rounded-full border border-slate-200 bg-white p-2 shadow-sm transition hover:border-sky-300" aria-label="Filtry">
                <FaFilter className="h-4 w-4" />
              </button>
              <button className="rounded-full border border-slate-200 bg-white p-2 shadow-sm transition hover:border-sky-300" aria-label="Warstwy">
                <FaLayerGroup className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-slate-50 px-4 py-3">
            <h1 className="text-base font-semibold text-slate-800">Mapa utrudnień</h1>
            <div className="mt-3 flex items-center gap-2 rounded-3xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600">
              <FaSearch className="text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Szukaj linii, przystanków..."
                className="w-full bg-transparent outline-none"
              />
              {search ? (
                <button
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500"
                  onClick={() => setSearch("")}
                >
                  Reset
                </button>
              ) : null}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-emerald-400 px-3 py-1.5 text-xs font-semibold text-white shadow">
                <FaPlus /> Dodaj warstwę
              </button>
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Legenda</span>
            </div>

            <div className="mt-4 space-y-2 text-xs text-slate-500">
              <div className="flex items-center gap-3">
                <FiAlertTriangle className="text-rose-500" /> Alarmy
              </div>
              <div className="flex items-center gap-3">
                <LuClock3 className="text-amber-500" /> Opóźnienia
              </div>
              <div className="flex items-center gap-3">
                <LuCheck className="text-emerald-500" /> Na czas
              </div>
            </div>

            <div className="mt-4 grid gap-3">
              {legend.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-2xl border border-white bg-white/80 px-4 py-2 text-sm"
                >
                  <span className="font-semibold text-slate-600">{item.label}</span>
                  <span className={`text-lg font-semibold ${item.tone}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tu można dodać kolejne panele — pamiętaj o pointer-events-auto na klikalnych */}
        {/* <div className="pointer-events-auto ...">...</div> */}
      </div>
    </div>
  );
}
