"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { FaArrowLeftLong, FaMedal, FaStar } from "react-icons/fa6";
import { LuCamera, LuMapPin } from "react-icons/lu";
import { TbGps } from "react-icons/tb";
import { LuLoader } from "react-icons/lu";

const issueTypes = [
  {
    label: "Opóźnienie",
    description: "Pojazd jest spóźniony",
    tone: "border-sky-200 bg-sky-50 text-sky-600",
    badge: "bg-sky-100 text-sky-600",
  },
  {
    label: "Awaria",
    description: "Usterka techniczna pojazdu",
    tone: "border-rose-200 bg-rose-50 text-rose-600",
    badge: "bg-rose-100 text-rose-600",
  },
  {
    label: "Korek",
    description: "Utrudnienia w ruchu",
    tone: "border-amber-200 bg-amber-50 text-amber-600",
    badge: "bg-amber-100 text-amber-600",
  },
  {
    label: "Brak informacji",
    description: "Brak komunikatów o statusie",
    tone: "border-slate-200 bg-slate-50 text-slate-600",
    badge: "bg-slate-100 text-slate-600",
  },
];

const recentReports = [
  {
    label: "Opóźnienie M1",
    place: "Stacja Centrum — wzorzec",
    points: "+15 pkt",
    tone: "from-emerald-100 to-emerald-50",
  },
  {
    label: "Korek IT4",
    place: "Al. Rozwościńska — 2 dni temu",
    points: "+15 pkt",
    tone: "from-sky-100 to-sky-50",
  },
];

const shortcuts = [
  {
    label: "Centrum",
    latitude: 50.06465,
    longitude: 19.94498,
    route: "52A",
  },
  {
    label: "Dworzec Centralny",
    latitude: 50.06822,
    longitude: 19.94956,
    route: "S2",
  },
  {
    label: "Łomnicka",
    latitude: 50.09112,
    longitude: 19.9264,
    route: "124",
  },
  {
    label: "Metro Politechnika",
    latitude: 52.22008,
    longitude: 21.01388,
    route: "M1",
  },
];

export default function ReportPage() {
  const [selectedIssue, setSelectedIssue] = useState(issueTypes[0].label);
  const [location, setLocation] = useState("");
  const [routeName, setRouteName] = useState("");
  const [latitude, setLatitude] = useState("50.06465");
  const [longitude, setLongitude] = useState("19.94498");
  const [description, setDescription] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusVariant, setStatusVariant] = useState<"success" | "error" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  const handleShortcut = (item: (typeof shortcuts)[number]) => {
    setLocation(item.label);
    setLatitude(item.latitude.toString());
    setLongitude(item.longitude.toString());
    setRouteName(item.route);
  };

  const handleUseGPS = () => {
    if (!navigator.geolocation) {
      setStatusVariant("error");
      setStatusMessage("Przeglądarka nie udostępnia geolokalizacji.");
      return;
    }
    setIsFetchingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude.toFixed(5));
        setLongitude(position.coords.longitude.toFixed(5));
        setStatusVariant("success");
        setStatusMessage("Zaktualizowano pozycję GPS.");
        setIsFetchingLocation(false);
      },
      () => {
        setStatusVariant("error");
        setStatusMessage("Nie udało się pobrać lokalizacji. Spróbuj ponownie.");
        setIsFetchingLocation(false);
      }
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage(null);
    const lat = Number(latitude);
    const lng = Number(longitude);

    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      setStatusVariant("error");
      setStatusMessage("Podaj poprawne współrzędne geograficzne.");
      return;
    }

    setIsSubmitting(true);

    // Uwaga: nie wysyłamy 'issue_type' ani 'location'
    const payload = {
      reporting_user_id: 1,
      // używamy selectedIssue i location wyłącznie do opisu
      description: description.trim() || `${selectedIssue} zgłoszone w lokalizacji ${location || "(nieznana)"}.`,
      // zachowuję nazwy pól jak w Twoim backendzie (mimo literówek)
      lattidude: lat,
      longidute: lng,
      route_name: routeName.trim() || "Brak informacji",
    };

    try {
      const response = await fetch("http://217.153.167.103:8002/reports/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Serwer zwrócił kod ${response.status}`);
      }

      setStatusVariant("success");
      setStatusMessage("Dziękujemy! Zgłoszenie zostało wysłane do weryfikacji.");
      setDescription("");
    } catch (error) {
      setStatusVariant("error");
      setStatusMessage(
        error instanceof Error
          ? `Nie udało się wysłać zgłoszenia: ${error.message}`
          : "Wystąpił błąd podczas wysyłania zgłoszenia."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7fbff] text-slate-900">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 pb-16 pt-10">
        <header className="flex items-center gap-3 text-sm font-semibold text-slate-500">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-500 transition hover:text-slate-800">
            <FaArrowLeftLong />
            Wróć
          </Link>
          <span className="text-xs uppercase tracking-[0.35em] text-slate-400">Zgłoś problem</span>
        </header>

        <section className="space-y-6">
          <div className="rounded-[36px] border border-slate-100 bg-gradient-to-r from-cyan-100 via-sky-50 to-emerald-100 p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <div className="flex items-center gap-3 text-slate-600">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-sky-500">
                  <FaMedal />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Zdobądź punkty</p>
                  <p>Za każde zgłoszenie otrzymasz 15 punktów</p>
                </div>
              </div>
              <div className="text-xs text-slate-500">Twoja aktywność wspiera społeczność pasażerów</div>
            </div>
          </div>

          {statusMessage ? (
            <div
              className={`rounded-3xl border px-5 py-3 text-sm ${
                statusVariant === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                  : "border-rose-200 bg-rose-50 text-rose-600"
              }`}
            >
              {statusMessage}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4 rounded-[32px] border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Wybierz typ problemu</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {issueTypes.map((issue) => {
                  const isActive = selectedIssue === issue.label;
                  return (
                    <button
                      key={issue.label}
                      type="button"
                      onClick={() => setSelectedIssue(issue.label)}
                      className={`flex items-center justify-between gap-3 rounded-3xl border px-5 py-4 text-left text-sm transition ${
                        isActive ? `${issue.tone} shadow-sm` : "border-slate-100 bg-slate-50"
                      }`}
                    >
                      <span>
                        <span className="text-base font-semibold text-slate-800">{issue.label}</span>
                        <p className="text-xs text-slate-500">{issue.description}</p>
                      </span>
                      <span
                        className={`inline-flex h-9 min-w-[70px] items-center justify-center rounded-2xl text-xs font-semibold ${issue.badge} ${
                          isActive ? "brightness-110" : ""
                        }`}
                      >
                        {isActive ? "Wybrane" : "Wybierz"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4 rounded-[32px] border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Lokalizacja</h2>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleUseGPS}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-xs font-semibold text-slate-600 transition hover:border-sky-300 hover:text-slate-900"
                >
                  {isFetchingLocation ? <LuLoader className="h-4 w-4 animate-spin" /> : <TbGps className="h-4 w-4" />}
                  GPS
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Długość geograficzna
                  <input
                    type="text"
                    value={longitude}
                    onChange={(event) => setLongitude(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 outline-none"
                  />
                </label>
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Szerokość geograficzna
                  <input
                    type="text"
                    value={latitude}
                    onChange={(event) => setLatitude(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 outline-none"
                  />
                </label>
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Numer linii / trasy
                  <input
                    type="text"
                    value={routeName}
                    onChange={(event) => setRouteName(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 outline-none"
                    placeholder="np. 52A"
                  />
                </label>
              </div>
            </div>

            <div className="space-y-4 rounded-[32px] border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Dodatkowe informacje</h2>
              <label className="text-sm text-slate-500">
                Opisz sytuację (opcjonalnie)
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  rows={4}
                  placeholder="Opisz szczegóły problemu, np. długość opóźnienia, przyczyna awarii..."
                  className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 outline-none"
                />
              </label>
              <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <LuCamera className="text-sky-300" />
                  Dodaj materiał (opcjonalnie)
                </span>
                <p>Załącz zdjęcie lub krótki film, aby zweryfikować zgłoszenie. Pliki do 20 MB.</p>
                <button type="button" className="self-start rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 transition hover:border-sky-300 hover:text-slate-900">
                  Wybierz plik
                </button>
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-100 bg-gradient-to-r from-sky-500 to-emerald-400 p-[3px]">
              <div className="flex flex-col gap-2 rounded-[30px] bg-white/80 px-8 py-5 text-center text-sm text-slate-600">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mx-auto inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-emerald-400 px-10 py-3 text-sm font-semibold text-white shadow transition disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? <LuLoader className="h-4 w-4 animate-spin" /> : null}
                  {isSubmitting ? "Wysyłanie..." : "Wyślij zgłoszenie"}
                </button>
                <p className="text-xs text-slate-500">
                  Twoje zgłoszenie pomoże innym pasażerom i zostanie zweryfikowane przez nasz system
                </p>
              </div>
            </div>
          </form>

          <div className="space-y-4 rounded-[32px] border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Twoje ostatnie zgłoszenia</h2>
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
