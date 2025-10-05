"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { LuCheck, LuClock3 } from "react-icons/lu";
import { CgMediaLive } from "react-icons/cg";
import { PiHeadCircuitThin } from "react-icons/pi";
import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

import { useSearchParams } from "next/navigation";

const Polyline = dynamic(() => import("react-leaflet").then(mod => mod.Polyline), { ssr: false });
const Tooltip = dynamic(() => import("react-leaflet").then(mod => mod.Tooltip), { ssr: false });
const CircleMarker = dynamic(() => import("react-leaflet").then(mod => mod.CircleMarker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

const MapWithNoSSR = dynamic(() => import("@/app/components/Map"), {
  ssr: false,
});

function formatTimestampToHHMM(timestamp: number): string {
  const date = new Date(timestamp * 1000);  // Convert to milliseconds if needed
  return date.toLocaleTimeString('pl-PL', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,  // 24-hour format
  });
}



import { LatLngExpression } from "leaflet";

type LatLng = LatLngExpression;

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

interface TransitApiResponse {
  status: string;
  delay_s: number;
  predicted_delay_s: number;
  steps?: Step[];
  departure_time: number;
}

interface Report {
  id: number;
  likes: number;
  dislikes: number;
  verified: string;
  description: string;
  lattidude: number;
  longidute: number;
  route_name: string;
  creator_id: number;
  timestamp: number;
}

export default function MapPage() {
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const [steps, setSteps] = useState<Step[]>([]);
  const [routeData, setRouteData] = useState<TransitApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [votedReports, setVotedReports] = useState<Record<number, "like" | "dislike">>({});


  // New: store reports by route name or step index
  // e.g. reportsByLineName["Line 42"] = Report[]
  const [reportsByLine, setReportsByLine] = useState<Record<string, Report[]>>({});

  useEffect(() => {
    if (from && to) {
      setLoading(true);
      fetch("http://217.153.167.103:8002/trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ origin: from, destination: to }),
      })
        .then(async (res) => {
          if (!res.ok) {
            const errorText = await res.text();
            console.log("Server error:", res.status, errorText);
            setSteps([]);
            setLoading(false);
            return null;
          }
          return res.json() as Promise<TransitApiResponse>;
        })
        .then((data) => {
          if (!data) {
            setLoading(false);
            return;
          }
          if (data.steps) {
            console.log(data.steps)
            setSteps(data.steps);
            setRouteData(data);
            // After steps are set, fetch reports for each transit step
            data.steps.forEach((step) => {
              if (step.travel_mode === "TRANSIT" && step.transit) {
                const routeName = step.transit.line_name || step.transit.line_short_name;
                if (routeName) {
                  fetchReportsForLine(routeName);
                }
              }
            });
          } else {
            setSteps([]);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching route:", error);
          setSteps([]);
          setLoading(false);
        });
    }
  }, [from, to]);

  const voteOnReport = async (reportId: number, action: "like" | "dislike") => {
  try {
    const res = await fetch(`http://217.153.167.103:8002/reports/${reportId}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });

    if (!res.ok) {
      console.warn("Failed to vote on report", reportId);
      return;
    }

    // Optional: update UI
    setVotedReports((prev) => ({ ...prev, [reportId]: action }));
  } catch (error) {
    console.error("Error voting on report", reportId, error);
  }
};


  const fetchReportsForLine = async (routeName: string) => {
    // avoid duplicate fetches
    if (reportsByLine[routeName]) {
      return;
    }
    try {
      const res = await fetch(`http://217.153.167.103:8002/reports/route/${encodeURIComponent(routeName)}`);
      if (!res.ok) {
        console.warn("Failed to fetch reports for route", routeName, res.status);
        return;
      }
      const reports: Report[] = await res.json();
      setReportsByLine((prev) => ({
        ...prev,
        [routeName]: reports,
      }));
    } catch (err) {
      console.error("Error fetching reports for line", routeName, err);
    }
  };

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
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full">
          <MapWithNoSSR>
            {loading && <div>Loading route...</div>}
            {steps.map((step, idx) => {
              const color = getColor(step);
              const path = step.path;
              const midpointIdx = Math.floor(path.length / 2);
              const midpoint = path[midpointIdx];

              return (
                <React.Fragment key={idx}>
                  <Polyline positions={step.path} color={color} weight={5} opacity={0.7}>
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
                        position={midpoint}
                      >
                        <div
                          style={{
                            color,
                            fontWeight: "bold",
                            padding: "2px 6px",
                            borderRadius: 4,
                            backgroundColor: "rgba(255, 255, 255, 0.5)",
                            border: `2px solid ${color}`,
                            whiteSpace: "nowrap",
                            fontSize: "0.6rem",
                            userSelect: "none",
                          }}
                        >
                          {step.instruction_text} [
                          {step.transit.line_name
                            ? step.transit.line_name
                            : step.transit.line_short_name}
                          ]
                        </div>
                      </Tooltip>
                    )}
                  </Polyline>

                  {step.travel_mode === "TRANSIT" && step.transit && (() => {
                    const routeName = step.transit.line_name || step.transit.line_short_name;
                    const reports = routeName ? reportsByLine[routeName] : undefined;
                    if (!reports || reports.length === 0) return null;

                    return reports.map((rep) => {
                      const lat = rep.lattidude;
                      const lng = rep.longidute;
                      const pos: LatLng = [lat, lng];
                      return (
                        <CircleMarker
                          center={pos}
                          radius={8}
                          pathOptions={{ color: "red", fillOpacity: 0.6 }}
                          key={`report-${routeName}-${rep.id}`}
                        >
                          <Popup>
                            <div className="text-xs">
                              <strong>Report #{rep.id}</strong><br />
                              {rep.description}<br />
                              Likes: {rep.likes}, Dislikes: {rep.dislikes}<br />
                              Verified: {rep.verified}<br />
                              Timestamp: {new Date(rep.timestamp).toLocaleString()}
                            </div>
                          </Popup>
                        </CircleMarker>
                      );
                    });
                  })()}
                </React.Fragment>
              );
            })}
          </MapWithNoSSR>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-white/60 via-white/30 to-transparent" />

      <div className="relative z-20 pointer-events-none flex min-h-screen flex-col gap-5 px-4 pb-4 pt-4 sm:px-6 lg:flex-row lg:items-start lg:gap-8">
        <div className="pointer-events-auto flex w-full flex-col gap-4 rounded-[28px] bg-white/85 p-4 shadow-lg backdrop-blur md:max-w-md max-h-screen overflow-auto">
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-sky-300 hover:text-slate-900"
            >
              <FaArrowLeftLong />
              Wróć
            </Link>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600">
            {steps.length === 0 && !loading && (
              <p>Brak trasy do wyświetlenia. Wyszukaj połączenie w wyszukiwarce.</p>
            )}
            {loading && <p>Ładowanie trasy...</p>}
            {steps.length > 0 && !loading && (
              <div className="space-y-2">
                <h2 className="text-base font-semibold text-slate-800">Szczegóły trasy</h2>
                <p className="text-xs text-slate-500">Liczba kroków: {steps.length}</p>
                <div className="max-h-64 overflow-y-auto">
                  {steps.map((step, idx) => {
                    const routeName = step.transit?.line_name || step.transit?.line_short_name;
                    const reports = routeName ? reportsByLine[routeName] : undefined;
                    return (
                      <div key={idx} className="mb-3 last:mb-0">
                        <p className="text-sm font-semibold text-slate-700">Krok {idx + 1}:</p>
                        <div className="flex flex-row gap-2 items-center">
                          <div className="font-medium text-2xl">
                            {step.transit && formatTimestampToHHMM(step.transit.departure_time)}
                          </div>
                          <div>
                            <p
                              className="text-sm"
                              dangerouslySetInnerHTML={{ __html: step.instruction_html }}
                            />
                            <p className="text-xs text-slate-500">
                              {step.distance_text}, {step.duration_text}{" "}
                              {step.travel_mode === "TRANSIT" &&
                              step.transit
                                ? `- ${step.transit.vehicle_type} ${
                                    step.transit.line_name
                                      ? step.transit.line_name
                                      : step.transit.line_short_name
                                  } -> ${step.transit.headsign}`
                                : ""}
                            </p>
                          </div>
                        </div>
                        

                        {/* New: show reports under this step */}
                        {reports && reports.length > 0 && (
                          <div className="mt-2 space-y-1 rounded-lg bg-gray-50 p-2 border border-gray-200 text-xs">
                            <p className="font-semibold">Zgłoszenia dla linii {routeName}:</p>
                            {reports.map((rep) => {
                            const userVote = votedReports[rep.id];

                            return (
                              <div
                                key={rep.id}
                                className="border-t border-gray-200 pt-1 first:pt-0"
                              >
                                <p>{rep.description}</p>
                                <div className="text-gray-500 flex items-center gap-2">
                                  <button
                                    onClick={() => voteOnReport(rep.id, "like")}
                                    disabled={!!userVote}
                                    className={`text-xs px-2 py-1 rounded ${
                                      userVote === "like" ? "bg-green-100 text-green-600" : "hover:bg-gray-100"
                                    }`}
                                  >
                                    👍 {rep.likes}
                                  </button>
                                  <button
                                    onClick={() => voteOnReport(rep.id, "dislike")}
                                    disabled={!!userVote}
                                    className={`text-xs px-2 py-1 rounded ${
                                      userVote === "dislike" ? "bg-red-100 text-red-600" : "hover:bg-gray-100"
                                    }`}
                                  >
                                    👎 {rep.dislikes}
                                  </button>
                                  <span>| Verified: {rep.verified}</span>
                                </div>
                              </div>
                            );
                          })}

                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600">
            <div className="space-y-2 text-xs text-slate-500">
              {routeData && routeData.delay_s > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-md font-semibold">
                    <LuClock3 className="text-amber-500" /> Opóźnienia
                  </div>
                  <div className="mt-4">
                    <div className="flex flex-row gap-2 items-center">
                      <CgMediaLive />
                      <p className="font-semibold">Live Delay</p>
                    </div>
                    <p className="mb-2">{routeData.delay_s} sekund</p>
                    <div className="flex flex-row gap-2 items-center">
                      <PiHeadCircuitThin />
                      <p className="font-semibold">AI Prediction Delay</p>
                    </div>
                    <p>
                        Zazwyczaj na tej trasie występuje opóźnienie ok.{" "}
                        {routeData.predicted_delay_s} sekund
                      </p>
                  </div>
                </div>
              )}
              {routeData && routeData.delay_s === 0 && (
                <div className="flex items-center gap-3">
                  <LuCheck className="text-emerald-500" /> Na czas
                </div>
              )}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4 py-2 text-sm text-slate-600">
            <Link
                href="/report"
                className="inline-flex items-center gap-2 rounded-full bg-white/15 px-2 py-2 text-sm font-semibold text-red-600 transition hover:bg-white/25"
              >
                <FiAlertTriangle />
                Zgłoś problem
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
