"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaArrowLeftLong, FaFilter, FaLayerGroup, FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { LuCheck, LuClock3 } from "react-icons/lu";
import { FiAlertTriangle } from "react-icons/fi";
import React from "react";

import { useSearchParams } from 'next/navigation'

const Polyline = dynamic(() => import("react-leaflet").then(mod => mod.Polyline), { ssr: false });
const Tooltip = dynamic(() => import("react-leaflet").then(mod => mod.Tooltip), { ssr: false });


import { LatLngExpression } from "leaflet";

type LatLng = LatLngExpression; // usually [number, number]

// Import mapy bez SSR (ważne dla bibliotek używających window)
const MapWithNoSSR = dynamic(() => import("@/app/components/Map"), {
  ssr: false,
});

interface Location {
  lat: number;
  lng: number;
}

interface TransitInfo {
  line_name: string;
  line_short_name?: string;
  vehicle_type: "BUS" | "TRAM" | string;
  headsign: string;
  num_stops: number;
  departure_stop: string;
  arrival_stop: string;
  departure_time: number;
  arrival_time: number;
}

interface Step {
  travel_mode: "WALKING" | "TRANSIT" | string;
  instruction_html: string;
  instruction_text: string;
  distance_m: number;
  distance_text: string;
  duration_s: number;
  duration_text: string;
  start_location: Location;
  end_location: Location;
  path: LatLng[];
  transit?: TransitInfo;
}

interface Route {
  overview_path: LatLng[];
  start_address: string;
  end_address: string;
  start_location: Location;
  end_location: Location;
  departure_time: {
    text: string;
    time_zone: string;
    value: number;
  };
  arrival_time: {
    text: string;
    time_zone: string;
    value: number;
  };
  distance_m: number;
  distance_text: string;
  duration_s: number;
  duration_text: string;
  steps: Step[];
}

interface TransitApiResponse {
  status: string;
  route?: Route;
}

// Dane do legendy
const legend = [
  { label: "Poważne problemy", value: 3, tone: "text-rose-600" },
  { label: "Średnie opóźnienia", value: 7, tone: "text-amber-500" },
  { label: "Bez problemów", value: 24, tone: "text-emerald-500" },
];

export default function MapPage() {
  const [search, setSearch] = useState("")

  const searchParams = useSearchParams()
 
  const from = searchParams.get('from')
  const to = searchParams.get('to')

  const [steps, setSteps] = useState<Step[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  if (from && to) {
    setLoading(true);
    fetch('/transit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        origin: from,
        destination: to,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          // Server returned an error, read text to understand response
          const errorText = await res.text();
          console.log("Server error:", res.status, errorText);
          setSteps([]);
          setLoading(false);
          return null; // Exit early
        }
        // Parse JSON only if response was OK
        return res.json() as Promise<TransitApiResponse>;
      })
      .then((data) => {
        if (!data) return; // Already handled error above
        if (data.status === "OK" && data.route && data.route.steps) {
          setSteps(data.route.steps);
        } else {
          setSteps([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching route:", error);
        setLoading(false);
        setSteps([]);
      });
  }
}, [from, to]);

  // Helper function to pick polyline color by step
  const getColor = (step: Step): string => {
    if (step.travel_mode === "WALKING") return "green";
    if (step.travel_mode === "TRANSIT") {
      if (step.transit?.vehicle_type === "BUS") return "blue";
      if (step.transit?.vehicle_type === "TRAM") return "orange";
      return "purple";
    }
    return "gray";
  };

  return (
    <div className="relative min-h-screen bg-[#f5fbff]">
      {/* MAPA — najniżej */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full">
          <MapWithNoSSR>
            {loading && <div>Loading route...</div>}
            {steps.length > 0 &&
          steps.map((step, idx) => {
            const color = getColor(step);

            // Find midpoint of path for placing label
            const path = step.path;
            const midpointIndex = Math.floor(path.length / 2);
            const midpoint = path[midpointIndex];

            return (
              <React.Fragment key={idx}>
                <Polyline
                  positions={step.path}
                  color={color}
                  weight={5}
                  opacity={0.7}
                />

                {/* Show label only for transit steps with vehicle_type BUS or TRAM */}
                {step.travel_mode === "TRANSIT" && step.transit && (
                  <Tooltip
                    direction="center"
                    permanent
                    interactive={false}
                    opacity={1}
                    className="custom-tooltip"
                    sticky={false}
                    offset={[0, 0]}
                    key={`tooltip-${idx}`}
                    // Tooltip must be anchored on a coordinate, so we use midpoint
                    position={midpoint}
                  >
                    <div
                      style={{
                        color,
                        fontWeight: "bold",
                        padding: "2px 6px",
                        borderRadius: 4,
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        border: `2px solid ${color}`,
                        whiteSpace: "nowrap",
                        fontSize: "0.9rem",
                        userSelect: "none",
                      }}
                    >
                      {step.transit.line_name}
                    </div>
                  </Tooltip>
                )}
              </React.Fragment>
            );
          })}

          </MapWithNoSSR>
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
