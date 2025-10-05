import Link from "next/link";
import { FaArrowLeftLong, FaPlus, FaRegBell } from "react-icons/fa6";
import { LuCircleCheck, LuClock3 } from "react-icons/lu";
import { RiUploadCloud2Line } from "react-icons/ri";

const connections = [
  {
    id: "IC 3810",
    carrier: "PKP Intercity",
    status: "On time",
    lastReport: "Brak utrudnien",
  },
  {
    id: "TLK 2212",
    carrier: "PKP Intercity",
    status: "Delayed 12 min",
    lastReport: "Zgloszenie pasazera: korek wjazdowy",
  },
  {
    id: "Bus 602",
    carrier: "MPK Krakow",
    status: "Delayed 6 min",
    lastReport: "Awaria sygnalizacji - objazd przez Aleje",
  },
  {
    id: "Regio 3320",
    carrier: "Polregio",
    status: "On time",
    lastReport: "Automatyczne potwierdzenie z systemu GPS",
  },
];

export default function DispatcherPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-10">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
          >
            <FaArrowLeftLong />
            Wroc na landing page
          </Link>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Panel dyspozytorski</p>
            <h1 className="text-3xl font-semibold text-slate-900">Kontrola polaczen</h1>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl bg-white p-6 shadow-sm shadow-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">Biezace kursy</h2>
                <p className="text-sm text-slate-500">Monitoruj opoznienia, dodawaj komunikaty i synchronizuj dane z API.</p>
              </div>
              <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900">
                <FaPlus />
                Dodaj komunikat
              </button>
            </div>
            <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3 text-left">Numer kursu</th>
                    <th className="px-4 py-3 text-left">Przewoznik</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Ostatnie zgloszenie</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {connections.map((connection) => (
                    <tr key={connection.id} className="hover:bg-slate-50">
                      <td className="px-4 py-4 font-semibold text-slate-900">{connection.id}</td>
                      <td className="px-4 py-4 text-slate-600">{connection.carrier}</td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                            connection.status.toLowerCase().includes("delayed")
                              ? "bg-amber-100 text-amber-600"
                              : "bg-emerald-100 text-emerald-600"
                          }`}
                        >
                          {connection.status.toLowerCase().includes("delayed") ? <LuClock3 /> : <LuCircleCheck />}
                          {connection.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-slate-600">{connection.lastReport}</td>
                      <td className="px-4 py-4 text-right">
                        <button className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600 transition hover:border-slate-300 hover:text-slate-900">
                          Otworz
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="flex h-full flex-col gap-4 rounded-3xl bg-slate-900 p-6 text-white shadow-md shadow-slate-300/40">
            <h2 className="text-xl font-semibold">Synchronizacja API</h2>
            <p className="text-sm text-slate-300">
              Podlacz systemy dyspozytorskie przewoznikow, aby komunikaty pojawialy sie automatycznie po zmianie statusu kursu.
            </p>
            <div className="space-y-3 text-sm text-slate-200">
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="text-xs uppercase tracking-wide text-slate-400">Status integracji</div>
                <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-white">
                  <RiUploadCloud2Line />
                  Ostatnia synchronizacja 2 min temu
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="text-xs uppercase tracking-wide text-slate-400">Powiadomienia</div>
                <p className="mt-2 flex items-center gap-2 text-sm">
                  <FaRegBell />
                  5 aktywnych alertow dla regionu Krakow
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="text-xs uppercase tracking-wide text-slate-400">Priorytety</div>
                <p className="mt-2 text-sm text-slate-200">
                  Automatycznie taguj opoznienia powyzej 15 minut oraz awarie wymagajace komunikatow glosowych.
                </p>
              </div>
            </div>
            <Link
              href="/auth"
              className="mt-auto inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-cyan-800/20"
            >
              Dodaj operatora
            </Link>
          </aside>
        </section>
      </div>
    </div>
  );
}
