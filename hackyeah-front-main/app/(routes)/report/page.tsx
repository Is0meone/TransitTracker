import Link from "next/link";
import { FaArrowLeftLong, FaMedal} from "react-icons/fa6";
import { FaStar } from "react-icons/fa";import { FaSearch } from "react-icons/fa";
import { LuTriangle, LuMapPin, LuMessageCircle, LuPlus } from "react-icons/lu";
import { TbGps } from "react-icons/tb";

const issueTypes = [
  {
    label: "Opoznienie",
    description: "Pojazd jest spozniony",
    tone: "bg-amber-100 text-amber-600",
  },
  {
    label: "Awaria",
    description: "Usterka techniczna pojazdu",
    tone: "bg-rose-100 text-rose-600",
  },
  {
    label: "Korek",
    description: "Utrudnienia w ruchu",
    tone: "bg-sky-100 text-sky-600",
  },
  {
    label: "Brak informacji",
    description: "Brak komunikatow o statusie",
    tone: "bg-slate-100 text-slate-600",
  },
];

const recentReports = [
  {
    label: "Opoznienie M1",
    place: "Stacja Centrum - wzornik",
    points: "+15 pkt",
    tone: "from-emerald-100 to-emerald-50",
  },
  {
    label: "Korek IT4",
    place: "Al. Rozwoscianka - 2 dni temu",
    points: "+15 pkt",
    tone: "from-sky-100 to-sky-50",
  },
];

export default function ReportPage() {
  return (
    <div className="min-h-screen bg-[#f7fbff] text-slate-900">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 pb-16 pt-10">
        <header className="flex items-center gap-3 text-sm font-semibold text-slate-500">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-500 transition hover:text-slate-800">
            <FaArrowLeftLong />
            Wroc
          </Link>
          <span className="text-xs uppercase tracking-[0.35em] text-slate-400">Zglos problem</span>
        </header>

        <section className="space-y-6">
          <div className="rounded-[36px] border border-slate-100 bg-gradient-to-r from-cyan-100 via-sky-50 to-emerald-100 p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <div className="flex items-center gap-3 text-slate-600">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-sky-500">
                  <FaMedal />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Zdobadz punkty</p>
                  <p>Za kazde zgloszenie otrzymasz 15 punktow</p>
                </div>
              </div>
              <div className="text-xs text-slate-500">Twoja aktywnosc wspiera spolecznosc pasaerow</div>
            </div>
          </div>

          <div className="space-y-4 rounded-[32px] border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Wybierz typ problemu</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {issueTypes.map((issue) => (
                <label key={issue.label} className="flex cursor-pointer items-center justify-between gap-3 rounded-3xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm transition hover:border-sky-200 hover:bg-white">
                  <div>
                    <p className="text-base font-semibold">{issue.label}</p>
                    <p className="text-xs text-slate-500">{issue.description}</p>
                  </div>
                  <span className={`inline-flex h-9 w-9 items-center justify-center rounded-2xl ${issue.tone}`}>
                    <LuTriangle />
                  </span>
                  <input type="radio" name="issue" className="hidden" />
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-[32px] border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Lokalizacja</h2>
            <p className="text-sm text-slate-500">Gdzie wystepuje problem?</p>
            <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3">
              <LuMapPin className="text-slate-400" />
              <input
                type="text"
                placeholder="Wpisz adres lub nazwe przystanku"
                className="w-full bg-transparent text-sm text-slate-700 outline-none"
              />
              <button type="button" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600">
                <TbGps />
                GPS
              </button>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {['Centrum', 'Dworzec Centralny', 'Lomnicka', 'Metro Politechnika'].map((shortcut) => (
                <span key={shortcut} className="rounded-full bg-slate-100 px-4 py-2 text-slate-500">
                  {shortcut}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-[32px] border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Dodatkowe informacje</h2>
            <label className="text-sm text-slate-500">
              Opisz sytuacje (opcjonalnie)
              <textarea
                rows={4}
                placeholder="Opisz szczegoly problemu, np. dlugosc opoznienia, przyczyna awarii..."
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 outline-none"
              />
            </label>
          </div>

          <div className="rounded-[32px] border border-slate-100 bg-gradient-to-r from-sky-500 to-emerald-400 p-[3px]">
            <div className="flex flex-col gap-2 rounded-[30px] bg-white/60 px-8 py-5 text-center text-sm text-slate-600">
              <button
                type="button"
                className="mx-auto inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-emerald-400 px-10 py-3 text-sm font-semibold text-white shadow"
              >
                Wyslij zgloszenie
              </button>
              <p className="text-xs text-slate-500">
                Twoje zgloszenie pomoze innym pasazerom i zostanie zweryfikowane przez nasz system
              </p>
            </div>
          </div>

          <div className="space-y-4 rounded-[32px] border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Twoje ostatnie zgloszenia</h2>
            <div className="space-y-3">
              {recentReports.map((item) => (
                <div key={item.label} className={`flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-gradient-to-r ${item.tone} px-6 py-4`}> 
                  <div>
                    <p className="text-sm font-semibold text-slate-700">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.place}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
                    <FaStar className="text-amber-500" />
                    {item.points}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
