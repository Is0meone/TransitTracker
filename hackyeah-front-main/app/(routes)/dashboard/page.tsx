"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  FaArrowRightLong,
  FaBell,
  FaPlus,
  FaRegThumbsUp,
  FaRegThumbsDown,
} from "react-icons/fa6";
import { LuMap, LuNavigation, LuTrophy } from "react-icons/lu";
import { FiAlertTriangle } from "react-icons/fi";

const REPORTS_ENDPOINT = "http://217.153.167.103:8002/reports/";
const USERS_ENDPOINT = "http://217.153.167.103:8002/users/";
const DEFAULT_USER_ID = 1;

const statusStyles: Record<string, string> = {
  positive: "bg-rose-100 text-rose-600",
  negative: "bg-emerald-100 text-emerald-600",
  unverified: "bg-amber-100 text-amber-600",
};

const statusLabels: Record<string, string> = {
  positive: "Zatwierdzone",
  negative: "Odrzucone",
  unverified: "Weryfikacja",
};

type ReportDto = {
  id: number;
  description: string;
  route_name: string | null;
  lattidude: number | null;
  longidute: number | null;
  verified: string;
  likes: number;
  dislikes: number;
};

type UiReport = {
  id: number;
  title: string;
  description: string;
  route: string;
  verification: {
    variant: string;
    label: string;
  };
  likes: number;
  dislikes: number;
};

type UserDto = {
  id: number;
  name: string;
  surname: string;
  email: string;
  points: number;
};

const mapReportToUi = (report: ReportDto): UiReport => {
  const verificationKey = report.verified?.toLowerCase() ?? "unverified";
  return {
    id: report.id,
    title: report.route_name?.trim() || "Nieznana linia",
    description:
      report.description?.trim() || "Brak opisu dla tego zgłoszenia.",
    route: report.route_name?.trim() || "Brak informacji",
    verification: {
      variant: statusStyles[verificationKey] || statusStyles.unverified,
      label: statusLabels[verificationKey] || statusLabels.unverified,
    },
    likes: report.likes ?? 0,
    dislikes: report.dislikes ?? 0,
  };
};

export default function DashboardPage() {
  const [reports, setReports] = useState<UiReport[]>([]);
  const [isLoadingReports, setIsLoadingReports] = useState(false);
  const [reportsError, setReportsError] = useState<string | null>(null);

  // ---- NEW: user points state ----
  const [userPoints, setUserPoints] = useState<number | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [userError, setUserError] = useState<string | null>(null);
  // (opcjonalnie możesz podstawiać inny ID z query / stanu aplikacji)
  const userId = DEFAULT_USER_ID;

  useEffect(() => {
    const controller = new AbortController();

    const fetchReports = async () => {
      try {
        setIsLoadingReports(true);
        setReportsError(null);
        const response = await fetch(REPORTS_ENDPOINT, {
          headers: { accept: "application/json" },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Serwer zwrócił kod ${response.status}`);
        }

        const data = (await response.json()) as ReportDto[];
        const uiReports = data.slice(0, 6).map(mapReportToUi);
        setReports(uiReports);
      } catch (error) {
        if (controller.signal.aborted) return;
        setReportsError(
          error instanceof Error
            ? `Nie udało się pobrać zgłoszeń: ${error.message}`
            : "Wystąpił nieoczekiwany błąd przy pobieraniu zgłoszeń."
        );
      } finally {
        if (!controller.signal.aborted) setIsLoadingReports(false);
      }
    };

    const fetchUser = async () => {
      try {
        setIsLoadingUser(true);
        setUserError(null);
        const response = await fetch(`${USERS_ENDPOINT}${userId}`, {
          headers: { accept: "application/json" },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Serwer (users) zwrócił kod ${response.status}`);
        }

        const data = (await response.json()) as UserDto;
        setUserPoints(Number.isFinite(data.points as number) ? data.points : 0);
      } catch (error) {
        if (controller.signal.aborted) return;
        setUserError(
          error instanceof Error
            ? `Nie udało się pobrać punktów: ${error.message}`
            : "Wystąpił nieoczekiwany błąd przy pobieraniu punktów."
        );
        setUserPoints(null);
      } finally {
        if (!controller.signal.aborted) setIsLoadingUser(false);
      }
    };

    fetchReports();
    fetchUser();

    return () => controller.abort();
  }, [userId]);

  const reportsContent = useMemo(() => {
    if (isLoadingReports && reports.length === 0) {
      return (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="h-20 animate-pulse rounded-2xl border border-slate-100 bg-slate-100/60"
            />
          ))}
        </div>
      );
    }

    if (reportsError) {
      return (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
          {reportsError}
        </div>
      );
    }

    if (reports.length === 0) {
      return (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
          Brak zgłoszeń w ostatnim czasie. Bądź pierwszą osobą, która doda informację.
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {reports.map((report) => (
          <div
            key={report.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-slate-500">
                <span className="rounded-full bg-white px-3 py-1 text-slate-600">
                  {report.title}
                </span>

                {/* Same ikony + licznik, bez klikania */}
                <div className="inline-flex items-center gap-4 text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <FaRegThumbsUp className="h-4 w-4" />
                    <span className="text-slate-700">{report.likes}</span>
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <FaRegThumbsDown className="h-4 w-4" />
                    <span className="text-slate-700">{report.dislikes}</span>
                  </span>
                </div>
              </div>

              <p className="text-sm font-semibold text-slate-800">
                {report.description}
              </p>
            </div>

            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${report.verification.variant}`}
            >
              <FiAlertTriangle className="h-4 w-4" />
              {report.verification.label}
            </span>
          </div>
        ))}
      </div>
    );
  }, [isLoadingReports, reports, reportsError]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 text-white">
            <span className="text-lg font-bold">TT</span>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              TransitTracker
            </p>
            <h1 className="text-xl font-semibold">Dashboard pasażera</h1>
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
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                Witaj z powrotem!
              </span>
              <h2 className="text-3xl font-semibold">
                Sprawdź aktualne informacje o transporcie publicznym
              </h2>
              <p className="text-sm text-white/80">
                Zgłoś utrudnienia, otwórz mapę realtime lub znajdź najlepsze
                połączenie.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/report"
                className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/25"
              >
                <FiAlertTriangle />
                Zgłoś problem
              </Link>
              <Link
                href="/reports-map"
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
              <form className="space-y-4 text-sm" method="GET" action="/map">
                <div className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3">
                  <LuNavigation className="text-slate-400" />
                  <input
                    name="from"
                    type="text"
                    placeholder="np. Nowa Huta Centrum, Rynek Główny..."
                    className="w-full bg-transparent text-slate-700 outline-none"
                  />
                </div>
                <div className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3">
                  <LuNavigation className="text-slate-400" />
                  <input
                    name="to"
                    type="text"
                    placeholder="np. Bronowice, Dworzec Główny..."
                    className="w-full bg-transparent text-slate-700 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-sky-500 to-emerald-400 px-6 py-3 text-sm font-semibold text-white shadow-sm"
                >
                  Znajdź połączenie
                  <FaArrowRightLong />
                </button>
              </form>
            </div>
            <div className="space-y-4 text-sm">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <h4 className="text-sm font-semibold text-slate-700">
                  Zgłoś problem
                </h4>
                <p className="mt-1 text-xs text-slate-500">
                  Opóźnienia, awarie, korki
                </p>
                <Link
                  href="/report"
                  className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-sky-600"
                >
                  Przejdź
                  <FaArrowRightLong />
                </Link>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <h4 className="text-sm font-semibold text-slate-700">Mapa</h4>
                <p className="mt-1 text-xs text-slate-500">
                  Zobacz utrudnienia
                </p>
                <Link
                  href="/reports-map"
                  className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-sky-600"
                >
                  Otwórz
                  <FaArrowRightLong />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-slate-100 bg-white p-8 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Najnowsze zgłoszenia</h3>
              <p className="text-sm text-slate-500">
                Zobacz co dzieje się na trasach obserwowanych przez społeczność.
              </p>
            </div>
            <Link href="/trip" className="text-sm font-semibold text-sky-600">
              Zobacz wszystkie
            </Link>
          </div>
          {reportsContent}
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {/* Karta z punktami pobranymi z /users/{id} */}
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
              Punkty za zgłoszenia
            </p>

            {/* licznik + stany */}
            {isLoadingUser ? (
              <p className="mt-2 h-8 animate-pulse rounded-xl bg-emerald-100/70"></p>
            ) : (
              <p className="mt-2 text-3xl font-semibold text-emerald-600">
                {userPoints ?? "--"}
              </p>
            )}

            <p className="mt-1 text-xs text-emerald-500">
              Twoja aktywność nagradza całą społeczność
            </p>
            {userError && (
              <p className="mt-2 text-xs text-emerald-700/80">
                {userError}
              </p>
            )}
          </div>

          <div className="rounded-3xl border border-sky-200 bg-sky-50 p-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">
              Zgłoszenia w tym miesiącu
            </p>
            <p className="mt-2 text-3xl font-semibold text-sky-600">18</p>
            <p className="mt-1 text-xs text-sky-500">
              3 potwierdzone przez dyspozytorów
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center">
            <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <LuTrophy />
              Misja dnia
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Dodaj zdjęcie do zgłoszenia aby zdobyć +15 punktów.
            </p>
          </div>
        </section>

        <nav className="mt-4 grid gap-3 rounded-[28px] border border-slate-100 bg-white p-3 shadow-sm sm:grid-cols-4">
          <Link
            href="/dashboard"
            className="flex flex-col items-center gap-1 rounded-2xl bg-sky-50 px-4 py-3 text-xs font-semibold text-sky-600"
          >
            <LuNavigation className="h-5 w-5" />
            Główna
          </Link>
          <Link
            href="/reports-map"
            className="flex flex-col items-center gap-1 rounded-2xl px-4 py-3 text-xs font-semibold text-slate-500 transition hover:bg-slate-50"
          >
            <LuMap className="h-5 w-5" />
            Mapa
          </Link>
          <Link
            href="/report"
            className="flex flex-col items-center gap-1 rounded-2xl px-4 py-3 text-xs font-semibold text-slate-500 transition hover:bg-slate-50"
          >
            <FiAlertTriangle className="h-5 w-5" />
            Zgłoś
          </Link>
            <FaPlus className="h-4 w-4" />
            Ustawienia
        </nav>
      </main>
    </div>
  );
}
