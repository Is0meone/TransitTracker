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

type Verification = "positive" | "unverified" | "negative";

interface Report {
  id: number;
  likes: number;
  dislikes: number;
  verified: Verification;
  description: string;
  lattidude: number;  // backend literówka
  longidute: number;  // backend literówka
  route_name: string;
  creator_id: number;
  timestamp?: number;
}

const API_BASE = "http://217.153.167.103:8002";

const statusColor = (v: Verification) => {
  switch (v) {
    case "positive":   return { stroke: "#ef4444", fill: "#ef4444" }; // czerwony: potwierdzony problem
    case "unverified": return { stroke: "#f59e0b", fill: "#f59e0b" }; // bursztyn: niezweryfikowane
    case "negative":   return { stroke: "#10b981", fill: "#10b981" }; // zielony: odwołane/OK
    default:           return { stroke: "#64748b", fill: "#94a3b8" };
  }
};

const formatTime = (unix?: number) =>
  typeof unix === "number"
    ? new Date(unix * 1000).toLocaleString()
    : "—";

export default function MapPage() {
  const [search, setSearch] = useState("");
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // 1) Pobranie listy raportów
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setErr(null);
      try {
        const res = await fetch(`${API_BASE}/reports/`, { method: "GET" });
        if (!res.ok) {
          throw new Error(`${res.status} ${res.statusText}`);
        }
        const data = (await res.json()) as Report[];
        setReports(Array.isArray(data) ? data : []);
      } catch (e: any) {
        console.error(e);
        setErr("Nie udało się pobrać raportów.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // 2) Filtrowanie po wyszukiwarce (po nazwie linii i opisie)
  const visibleReports = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return reports;
    return reports.filter(r =>
      r.route_name?.toLowerCase().includes(q) ||
      r.description?.toLowerCase().includes(q)
    );
  }, [reports, search]);

  // 3) Liczniki do legendy (dynamicznie z danych)
  const counters = useMemo(() => {
    const severe   = reports.filter(r => r.verified === "positive").length;
    const medium   = reports.filter(r => r.verified === "unverified").length;
    const healthy  = reports.filter(r => r.verified === "negative").length;
    return { severe, medium, healthy };
  }, [reports]);

  // 4) Detale wybranego raportu (opcjonalne: dogrywka po id)
  const selectedReport = useMemo(
    () => (selectedId ? reports.find(r => r.id === selectedId) ?? null : null),
    [selectedId, reports]
  );

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

              return (
                <CircleMarker
                  key={r.id}
                  center={pos}
                  radius={8}
                  pathOptions={{ color: stroke, weight: 2, fillColor: fill, fillOpacity: 0.8 }}
                  eventHandlers={{ click: () => setSelectedId(r.id) }}
                >
                  {(selectedReport && selectedReport.id === r.id) && (
                    <Popup position={pos}>
                      <div className="text-sm max-w-xs">
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

      {/* DELIKATNY GRADIENT */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-white/60 via-white/30 to-transparent" />

      {/* PANEL UI */}
      <div className="relative z-20 pointer-events-none flex min-h-screen flex-col gap-5 px-4 pb-10 pt-8 sm:px-6 lg:flex-row lg:items-start lg:gap-8">
        <div className="pointer-events-auto flex w-full flex-col gap-4 rounded-[28px] bg-white/85 p-4 shadow-lg backdrop-blur md:max-w-sm max-h-screen overflow-y-scroll">
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

            <div className="mt-4 grid gap-3">
              <div className="flex items-center justify-between rounded-2xl border border-white bg-white/80 px-4 py-2 text-sm">
                <span className="font-semibold text-slate-600">Potwierdzone</span>
                <span className="text-lg font-semibold text-rose-600">{counters.severe}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white bg-white/80 px-4 py-2 text-sm">
                <span className="font-semibold text-slate-600">Oczekuje na potwierdzenie</span>
                <span className="text-lg font-semibold text-amber-500">{counters.medium}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white bg-white/80 px-4 py-2 text-sm">
                <span className="font-semibold text-slate-600">Odrzucone</span>
                <span className="text-lg font-semibold text-emerald-500">{counters.healthy}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// mapa (bez SSR)
const MapWithNoSSR = dynamic(() => import("@/app/components/Map"), { ssr: false });
