"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { FaArrowLeftLong, FaFilter, FaLayerGroup } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { LuCheck, LuClock3 } from "react-icons/lu";
import { FiAlertTriangle } from "react-icons/fi";
import React from "react";
import type { LatLngExpression } from "leaflet";

const CircleMarker = dynamic(() => import("react-leaflet").then(m => m.CircleMarker), { ssr: false });
const Popup        = dynamic(() => import("react-leaflet").then(m => m.Popup),        { ssr: false });
const MapWithNoSSR = dynamic(() => import("@/app/components/Map"), { ssr: false });

type Verification = "positive" | "unverified" | "negative";

interface Report {
  id: number;
  likes: number;
  dislikes: number;
  verified: Verification;
  description: string;
  lattidude: number;  // literówka z backendu
  longidute: number;  // literówka z backendu
  route_name: string;
  creator_id: number;
  timestamp?: number;
}

const API_BASE = "http://217.153.167.103:8002";

const statusColor = (v: Verification) => {
  switch (v) {
    case "positive":   return { stroke: "#ef4444", fill: "#ef4444" };
    case "unverified": return { stroke: "#f59e0b", fill: "#f59e0b" };
    case "negative":   return { stroke: "#10b981", fill: "#10b981" };
    default:           return { stroke: "#64748b", fill: "#94a3b8" };
  }
};

const formatTime = (unix?: number) =>
  typeof unix === "number" ? new Date(unix * 1000).toLocaleString() : "—";

const labelFor: Record<Verification, { title: string; tone: string; dot: string; badge: string }> = {
  positive:   { title: "Potwierdzone",              tone: "text-rose-600",    dot: "bg-rose-500",    badge: "bg-rose-50 text-rose-700 border-rose-200" },
  unverified: { title: "Oczekuje na potwierdzenie", tone: "text-amber-500",   dot: "bg-amber-500",   badge: "bg-amber-50 text-amber-700 border-amber-200" },
  negative:   { title: "Odrzucone",                 tone: "text-emerald-500", dot: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
};

export default function MapPage() {
  const [search, setSearch] = useState("");
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<Verification | null>(null);

  // pobieranie
  useEffect(() => {
    const load = async () => {
      setLoading(true); setErr(null);
      try {
        const res = await fetch(`${API_BASE}/reports/`, { method: "GET" });
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const data = (await res.json()) as Report[];
        setReports(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setErr("Nie udało się pobrać raportów.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // wyszukiwarka
  const visibleReports = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return reports;
    return reports.filter(r =>
      r.route_name?.toLowerCase().includes(q) ||
      r.description?.toLowerCase().includes(q)
    );
  }, [reports, search]);

  // liczniki
  const counters = useMemo(() => {
    const severe  = reports.filter(r => r.verified === "positive").length;
    const medium  = reports.filter(r => r.verified === "unverified").length;
    const healthy = reports.filter(r => r.verified === "negative").length;
    return { severe, medium, healthy };
  }, [reports]);

  const selectedReport = useMemo(
    () => (selectedId ? reports.find(r => r.id === selectedId) ?? null : null),
    [selectedId, reports]
  );

  // konfiguracja trzech boxów + ich liczników
  const boxes: Array<{ key: Verification; count: number; ring: string; ringOff: string }> = useMemo(() => ([
    { key: "positive",   count: counters.severe,  ring: "border-rose-300 ring-2 ring-rose-100",       ringOff: "border-white hover:border-slate-200" },
    { key: "unverified", count: counters.medium,  ring: "border-amber-300 ring-2 ring-amber-100",     ringOff: "border-white hover:border-slate-200" },
    { key: "negative",   count: counters.healthy, ring: "border-emerald-300 ring-2 ring-emerald-100", ringOff: "border-white hover:border-slate-200" },
  ]), [counters]);

  // raporty dla danej kategorii
  const reportsFor = (cat: Verification) =>
    reports
      .filter(r => r.verified === cat)
      .sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0));

  // widok listy dla danej kategorii
  const CategoryList = ({ cat }: { cat: Verification }) => {
    const list = reportsFor(cat);
    return (
      <div className="mt-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-700">
            {labelFor[cat].title} — {list.length}
          </h3>
        </div>

        <ul className="space-y-3">
          {list.map((r) => {
            const isActive = selectedId === r.id;
            return (
              <li
                key={r.id}
                className={`rounded-2xl border bg-white/90 p-3 shadow-sm transition hover:border-slate-200 ${
                  isActive ? "ring-2 ring-sky-200" : "border-slate-100"
                }`}
              >
                <button onClick={() => setSelectedId(r.id)} className="w-full text-left">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className={`inline-block h-2.5 w-2.5 rounded-full ${labelFor[r.verified].dot}`} />
                      <h4 className="font-semibold text-slate-700">{r.route_name}</h4>
                    </div>
                    <span className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${labelFor[r.verified].badge}`}>
                      {labelFor[r.verified].title}
                    </span>
                  </div>

                  <p className="mt-1 text-[13px] leading-snug text-slate-600">
                    {r.description}
                  </p>

                  <div className="mt-2 grid grid-cols-2 gap-x-4 text-xs text-slate-500">
                    <div>🕒 {formatTime(r.timestamp)}</div>
                    <div>👍 {r.likes} &nbsp; 👎 {r.dislikes}</div>
                  </div>

                  <div className="mt-2 text-[11px] text-slate-400">
                    Lat: {r.lattidude}&nbsp;&nbsp;Lng: {r.longidute}
                  </div>
                </button>
              </li>
            );
          })}
          {list.length === 0 && (
            <li className="rounded-2xl border border-slate-100 bg-white/80 p-3 text-sm text-slate-500">
              Brak raportów w tej kategorii.
            </li>
          )}
        </ul>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen bg-[#f5fbff]">
      {/* MAPA */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full">
          <MapWithNoSSR>
            {loading && <div className="absolute left-3 top-3 z-[1000] rounded bg-white/90 px-3 py-1 text-xs shadow">Ładowanie…</div>}
            {err &&     <div className="absolute left-3 top-3 z-[1000] rounded bg-rose-50 px-3 py-1 text-xs text-rose-700 shadow">{err}</div>}

            {visibleReports.map((r) => {
              const pos: LatLngExpression = [r.lattidude, r.longidute];
              const { stroke, fill } = statusColor(r.verified);
              const isSelected = selectedReport?.id === r.id;

              return (
                <CircleMarker
                  key={r.id}
                  center={pos}
                  radius={8}
                  pathOptions={{ color: stroke, weight: 2, fillColor: fill, fillOpacity: 0.85 }}
                  eventHandlers={{ click: () => setSelectedId(r.id) }}
                >
                  {isSelected && (
                    <Popup position={pos} className="min-w-64">
                      <div className="text-sm max-w-md">
                        <h2 className="font-semibold mb-1">{r.route_name}</h2>
                        <p className="mb-2 leading-snug">{r.description}</p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                          <div><span className="font-semibold">Likes:</span> {r.likes}</div>
                          <div><span className="font-semibold">Dislikes:</span> {r.dislikes}</div>
                          <div><span className="font-semibold">Status:</span> {r.verified}</div>
                          <div><span className="font-semibold">Czas:</span> {formatTime(r.timestamp)}</div>
                        </div>
                      </div>
                    </Popup>
                  )}
                </CircleMarker>
              );
            })}
          </MapWithNoSSR>
        </div>
      </div>

      {/* GRADIENT */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-white/60 via-white/30 to-transparent" />

      {/* PANEL */}
      <div className="relative z-20 pointer-events-none flex min-h-screen flex-col gap-5 px-4 pb-10 pt-8 sm:px-6 lg:flex-row lg:items-start lg:gap-8">
        <div className="pointer-events-auto flex w-full flex-col gap-4 rounded-[28px] bg-white/85 p-4 shadow-lg backdrop-blur md:max-w-sm max-h-screen overflow-y-auto">
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
                placeholder="Szukaj linii, przystanków…"
                className="w-full bg-transparent outline-none"
              />
              {search && (
                <button
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500"
                  onClick={() => setSearch("")}
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600">
            <div className="mt-4 space-y-2 text-xs text-slate-500">
              <div className="flex items-center gap-3">
                <FiAlertTriangle className="text-rose-500" /> Alarmy (potwierdzone)
              </div>
              <div className="flex items-center gap-3">
                <LuClock3 className="text-amber-500" /> Opóźnienia (niezweryfikowane)
              </div>
              <div className="flex items-center gap-3">
                <LuCheck className="text-emerald-500" /> Na czas (odwołane)
              </div>
            </div>

            {/* BOXy + przypięta pod każdym z nich lista tej kategorii */}
            <div className="mt-4 grid gap-3">
              {boxes.map(({ key, count, ring, ringOff }) => (
                <div key={key}>
                  <button
                    onClick={() => setActiveCategory(prev => (prev === key ? null : key))}
                    className={`flex w-full items-center justify-between rounded-2xl border bg-white/80 px-4 py-2 text-left transition ${
                      activeCategory === key ? ring : ringOff
                    }`}
                  >
                    <span className="font-semibold text-slate-600">{labelFor[key].title}</span>
                    <span className={`text-lg font-semibold ${labelFor[key].tone}`}>{count}</span>
                  </button>

                  {/* TYLKO pod aktywnym boxem wyświetlamy listę */}
                  {activeCategory === key && <CategoryList cat={key} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}