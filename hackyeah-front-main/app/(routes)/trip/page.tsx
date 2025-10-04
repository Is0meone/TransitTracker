import Link from "next/link";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { LuAlertTriangle, LuBus, LuInfo, LuNavigation, LuTramFront } from "react-icons/lu";

const suggestedRoutes = [
  {
    id: "primary",
    label: "Najszybsza",
    badge: "Na czas",
    type: "Tram",
    duration: "28 min",
    highlight: true,
    stops: "Nowa Huta Centrum -> Plac Centralny -> Os. Gorali -> ...",
    cost: "3.80 zl",
    stopCount: 6,
    statusTone: "text-emerald-500",
  },
  {
    id: "alt-1",
    label: "Alternatywa 1",
    badge: "Opoznione",
    type: "Bus + Tram",
    duration: "35 min",
    highlight: false,
    stops: "Nowa Huta Centrum -> Kombinat -> Dworzec Glowny -> ...",
    cost: "3.80 zl",
    stopCount: 5,
    statusTone: "text-amber-500",
  },
  {
    id: "alt-2",
    label: "Alternatywa 2",
    badge: "Prognoza",
    type: "Bus 52 + 128",
    duration: "36 min",
    highlight: false,
    stops: "Nowa Huta Centrum -> Bienczycka -> Mogila -> ...",
    cost: "3.80 zl",
    stopCount: 6,
    statusTone: "text-rose-500",
  },
];

export default function TripPlannerPage() {
  return (
    <div className="min-h-screen bg-[#f7fbff] text-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-16 pt-10">
        <header className="flex items-center gap-3 text-sm font-semibold text-slate-500">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-500 transition hover:text-slate-800">
            <FaArrowLeftLong />
            Wroc do wyszukiwarki
          </Link>
          <span className="text-xs uppercase tracking-[0.35em] text-slate-400">Twoja trasa</span>
        </header>

        <section className="space-y-6">
          <div className="rounded-[36px] border border-slate-100 bg-gradient-to-r from-sky-100 via-cyan-50 to-emerald-100 p-6 shadow-sm">
            <div className="flex flex-col gap-4 text-sm text-slate-600">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Twoja trasa</p>
                  <h2 className="text-xl font-semibold text-slate-800">Nowa Huta Centrum -> Rynek Glowny</h2>
                  <p>3 opcje podrozy • MPK Krakow</p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-600">
                  <LuTramFront />
                  Rynek Glowny
                </span>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white/70 px-5 py-4 text-slate-600">
                <div className="flex items-center gap-3">
                  <LuNavigation className="text-sky-500" />
                  <div>
                    <p className="text-sm font-semibold text-slate-700">Interaktywna mapa trasy</p>
                    <p className="text-xs">Google Maps / Leaflet API</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-amber-100 bg-amber-50 p-6 text-sm text-amber-700">
            <div className="flex items-start gap-3">
              <LuAlertTriangle className="mt-1" />
              <p>Na niektorych trasach wystepuja opoznienia. Sprawdz szczegoly ponizej i rozwaz alternatywne opcje.</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Sugerowane trasy</h3>
            <div className="space-y-5">
              {suggestedRoutes.map((route) => (
                <div
                  key={route.id}
                  className={`rounded-[32px] border ${
                    route.highlight ? "border-sky-200 bg-sky-50" : "border-slate-100 bg-white"
                  } p-6 shadow-sm`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-slate-500">
                        <span className="rounded-full bg-white px-3 py-1 text-slate-600">{route.label}</span>
                        <span className={`rounded-full bg-slate-100 px-3 py-1 text-emerald-500`}>{route.badge}</span>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">{route.type}</span>
                      </div>
                      <p className="text-sm text-slate-600">{route.stops}</p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                        <span>Koszt: {route.cost}</span>
                        <span>Przystanki: {route.stopCount}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3 text-sm font-semibold text-slate-600">
                      <span className={`text-lg ${route.statusTone}`}>{route.duration}</span>
                      {route.highlight ? (
                        <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-emerald-400 px-5 py-2 text-xs font-semibold text-white">
                          Wybierz te trase i rozpocznij nawigacje
                          <FaArrowRightLong />
                        </button>
                      ) : (
                        <Link href="/trip" className="text-xs font-semibold text-sky-600">
                          Wroc do wyszukiwarki
                        </Link>
                      )}
                    </div>
                  </div>
                  {!route.highlight && route.id === "alt-2" ? (
                    <div className="mt-4 rounded-2xl border border-amber-100 bg-amber-50 px-5 py-3 text-xs text-amber-600">
                      Przewidywane opoznienie 12 min w rejonie al. 3 Maja.
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
