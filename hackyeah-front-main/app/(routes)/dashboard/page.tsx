import Link from "next/link";
import { FaArrowRightLong, FaBell, FaPlus } from "react-icons/fa6";
import { LuTriangle, LuBus, LuMap, LuNavigation, LuBrain, LuTrophy } from "react-icons/lu";

const latestReports = [
  {
    id: "report-1",
    type: "Opoznienie",
    line: "S2",
    location: "Nowa Huta Centrum",
    reporter: "Anna K.",
    timeAgo: "2 min temu",
    status: "+15 min",
    statusVariant: "warning",
  },
  {
    id: "report-2",
    type: "Korek",
    line: "Trasa IT4",
    location: "Aleje Slowackiego",
    reporter: "Jakub P.",
    timeAgo: "5 min temu",
    status: "Mapa",
    statusVariant: "link",
  },
  {
    id: "report-3",
    type: "Awaria",
    line: "Rynek Glowny",
    location: "Tram 24",
    reporter: "System MPK",
    timeAgo: "12 min temu",
    status: "+25 min",
    statusVariant: "danger",
  },
  {
    id: "report-4",
    type: "Normalnie",
    line: "S2",
    location: "Bronowice",
    reporter: "Tomasz W.",
    timeAgo: "15 min temu",
    status: "Na czas",
    statusVariant: "success",
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 text-white">
            <span className="text-lg font-bold">TT</span>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">TransitTracker</p>
            <h1 className="text-xl font-semibold">Dashboard pasazera</h1>
          </div>
        </div>
        <div className="flex items-center gap-4 text-slate-500">
          <FaBell className="h-5 w-5" />
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 text-sm font-semibold text-white">
            AK
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-12">
        <section className="rounded-[36px] bg-gradient-to-r from-cyan-500 via-sky-600 to-emerald-400 p-8 text-white shadow-xl">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">Witaj z powrotem!</span>
              <h2 className="text-3xl font-semibold">Sprawdz aktualne informacje o transporcie publicznym</h2>
              <p className="text-sm text-white/80">Zglos utrudnienia, otworz mape realtime lub znajdz najlepsze polaczenie.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/report"
                className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/25"
              >
                <LuTriangle />
                Zglos problem
              </Link>
              <Link
                href="/map"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900"
              >
                <LuMap />
                Mapa
              </Link>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-slate-100 bg-white p-8 shadow-sm">
          <div className="grid gap-4 md:grid-cols-[1.3fr_1fr]">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Sprawdz polaczenie</h3>
              <form className="space-y-4 text-sm">
                <div className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3">
                  <LuNavigation className="text-slate-400" />
                  <input
                    type="text"
                    placeholder="np. Nowa Huta Centrum, Rynek Glowny..."
                    className="w-full bg-transparent text-slate-700 outline-none"
                  />
                </div>
                <div className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3">
                  <LuNavigation className="text-slate-400" />
                  <input
                    type="text"
                    placeholder="np. Bronowice, Dworzec Glowny..."
                    className="w-full bg-transparent text-slate-700 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-sky-500 to-emerald-400 px-6 py-3 text-sm font-semibold text-white shadow-sm"
                >
                  Znajdz polaczenie
                  <FaArrowRightLong />
                </button>
              </form>
            </div>
            <div className="space-y-4 text-sm">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <h4 className="text-sm font-semibold text-slate-700">Zglos problem</h4>
                <p className="mt-1 text-xs text-slate-500">Opoznienia, awarie, korki</p>
                <Link href="/report" className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-sky-600">
                  Przejdz
                  <FaArrowRightLong />
                </Link>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <h4 className="text-sm font-semibold text-slate-700">Mapa</h4>
                <p className="mt-1 text-xs text-slate-500">Zobacz utrudnienia</p>
                <Link href="/map" className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-sky-600">
                  Otworz
                  <FaArrowRightLong />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-slate-100 bg-white p-8 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Najnowsze zgloszenia</h3>
              <p className="text-sm text-slate-500">Zobacz co dzieje sie na trasach obserwowanych przez spolecznosc.</p>
            </div>
            <Link href="/trip" className="text-sm font-semibold text-sky-600">
              Zobacz wszystkie
            </Link>
          </div>
          <div className="space-y-3">
            {latestReports.map((report) => (
              <div key={report.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-slate-600">
                    {report.type === "Opoznienie" && <LuBrain className="h-5 w-5" />}
                    {report.type === "Korek" && <LuBus className="h-5 w-5" />}
                    {report.type === "Awaria" && <LuTriangle className="h-5 w-5" />}
                    {report.type === "Normalnie" && <LuMap className="h-5 w-5" />}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-500">
                      <span className="rounded-full bg-white px-3 py-1 text-slate-600">{report.type}</span>
                      <span>{report.line}</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800">{report.location}</p>
                    <p className="text-xs text-slate-500">zgloszone przez {report.reporter}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 text-xs text-slate-500">
                  <span>{report.timeAgo}</span>
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                      report.statusVariant === "warning"
                        ? "bg-amber-100 text-amber-600"
                        : report.statusVariant === "danger"
                        ? "bg-rose-100 text-rose-600"
                        : report.statusVariant === "success"
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-white text-sky-600"
                    }`}
                  >
                    {report.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Punkty za zgloszenia</p>
            <p className="mt-2 text-3xl font-semibold text-emerald-600">247</p>
            <p className="mt-1 text-xs text-emerald-500">Twoja aktywnosc nagradza cala spolecznosc</p>
          </div>
          <div className="rounded-3xl border border-sky-200 bg-sky-50 p-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">Zgloszenia w tym miesiacu</p>
            <p className="mt-2 text-3xl font-semibold text-sky-600">18</p>
            <p className="mt-1 text-xs text-sky-500">3 potwierdzone przez dyspozytorow</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center">
            <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <LuTrophy />
              Misja dnia
            </p>
            <p className="mt-2 text-sm text-slate-600">Dodaj zdjecie do zgloszenia aby zdobyc +15 punktow.</p>
          </div>
        </section>

        <nav className="mt-4 grid gap-3 rounded-[28px] border border-slate-100 bg-white p-3 shadow-sm sm:grid-cols-4">
          <Link href="/dashboard" className="flex flex-col items-center gap-1 rounded-2xl bg-sky-50 px-4 py-3 text-xs font-semibold text-sky-600">
            <LuNavigation className="h-5 w-5" />
            Glowna
          </Link>
          <Link href="/map" className="flex flex-col items-center gap-1 rounded-2xl px-4 py-3 text-xs font-semibold text-slate-500 transition hover:bg-slate-50">
            <LuMap className="h-5 w-5" />
            Mapa
          </Link>
          <Link href="/report" className="flex flex-col items-center gap-1 rounded-2xl px-4 py-3 text-xs font-semibold text-slate-500 transition hover:bg-slate-50">
            <LuTriangle className="h-5 w-5" />
            Zglos
          </Link>
          <Link href="/trip" className="flex flex-col items-center gap-1 rounded-2xl px-4 py-3 text-xs font-semibold text-slate-500 transition hover:bg-slate-50">
            <FaPlus className="h-4 w-4" />
            Ustawienia
          </Link>
        </nav>
      </main>
    </div>
  );
}
