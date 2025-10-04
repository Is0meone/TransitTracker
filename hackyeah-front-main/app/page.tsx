"use client";

import type { ComponentType } from "react";

import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { LuClock3, LuMap, LuMegaphone, LuRadar } from "react-icons/lu";
import { PiShareNetworkBold } from "react-icons/pi";

type Feature = {
  title: string;
  description: string;
  Icon: ComponentType<{ className?: string }>;
};

type Step = {
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    title: "Zglaszanie utrudnien",
    description:
      "Podziel sie informacja o opoznieniach i awariach, aby inni pasazerowie mogli szybciej reagowac.",
    Icon: LuMegaphone,
  },
  {
    title: "Prognozowanie opoznien",
    description:
      "System analizuje dane historyczne oraz biezace zgloszenia, by przewidywac potencjalne utrudnienia.",
    Icon: LuRadar,
  },
  {
    title: "Informacje realtime",
    description:
      "Badz na biezaco dzieki powiadomieniom push oraz tablicy aktualnych komunikatow.",
    Icon: LuClock3,
  },
  {
    title: "Mapy i nawigacja",
    description:
      "Plan trasy z uwzglednieniem weryfikowanych zgloszen i alternatywnych polaczen.",
    Icon: LuMap,
  },
];

const steps: Step[] = [
  {
    title: "Zglos problem",
    description: "Pasazerowie dodaja zgloszenia przez aplikacje mobilna w kilka sekund.",
  },
  {
    title: "System analizuje",
    description:
      "Automatyczny silnik weryfikuje zgloszenia i laczy je z danymi przewoznikow.",
  },
  {
    title: "Wszyscy otrzymuja info",
    description:
      "Zweryfikowane komunikaty pojawiaja sie na mapie oraz w powiadomieniach realtime.",
  },
];

const navItems = [
  { href: "#features", label: "Funkcje" },
  { href: "#how-it-works", label: "Jak dziala" },
  { href: "#problem", label: "Problem" },
  { href: "/dashboard", label: "Dashboard" },
];

const PhoneMockup = () => {
  return (
    <div className="relative mx-auto flex h-[520px] w-[270px] flex-col justify-between rounded-[40px] border border-white/40 bg-gradient-to-br from-cyan-600 via-blue-500 to-slate-900 p-6 text-white shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">TransitTracker</div>
        <div className="text-xs opacity-70">15:42</div>
      </div>
      <div className="space-y-3">
        <div className="rounded-2xl bg-white/10 p-4">
          <div className="text-xs uppercase tracking-wide text-white/60">Najnowsze zgloszenie</div>
          <div className="mt-2 text-base font-semibold">Opoznienie linii S2</div>
          <p className="text-sm text-white/80">Szacowane opoznienie: 12 min. Ostatnia aktualizacja 2 minuty temu.</p>
        </div>
        <div className="rounded-2xl bg-white/10 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Twoja trasa</span>
            <span className="text-xs text-emerald-300">Najlepsza opcja</span>
          </div>
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Dworzec Glowny</span>
              <span className="font-semibold">08:12</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Plac Inwalidow</span>
              <span>08:26</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Bronowice</span>
              <span>08:41</span>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-2xl bg-white p-3 text-slate-900">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Prognoza</div>
            <div className="text-sm font-semibold">Ryzyko opoznienia 35%</div>
          </div>
          <div className="rounded-full bg-slate-900/90 p-3 text-white">
            <PiShareNetworkBold className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="absolute inset-x-0 top-0 -z-10 h-[560px] bg-gradient-to-b from-cyan-50 via-sky-100 to-slate-50" />
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-700 text-white shadow">
            TT
          </span>
          <div>
            <div className="text-base font-semibold">TransitTracker</div>
            <div className="text-xs text-slate-500">Badz o krok przed opoznieniami</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-slate-900">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/auth"
          className="hidden rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-400 hover:text-slate-900 md:inline-flex"
        >
          Zaloguj sie
        </Link>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 pb-24">
        <section className="grid items-center gap-12 rounded-3xl bg-white/60 p-10 shadow-xl shadow-sky-100 ring-1 ring-white/60 md:grid-cols-2">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">
              Inteligentne zarzadzanie transportem
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Badz o krok przed opoznieniami
            </h1>
            <p className="text-base text-slate-600 sm:text-lg">
              Otrzymuj zweryfikowane komunikaty o utrudnieniach, planuj alternatywne polaczenia i reaguj szybciej niz inni pasazerowie.
              TransitTracker laczy dane przewoznikow z informacjami spolecznosci w jednym miejscu.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="#cta"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-200 transition hover:brightness-110"
              >
                Pobierz aplikacje
                <FaArrowRightLong />
              </Link>
              <Link
                href="#problem"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
              >
                Dowiedz sie wiecej
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <PhoneMockup />
          </div>
        </section>

        <section id="problem" className="space-y-8">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              Problem pasazerow transportu publicznego
            </h2>
            <p className="text-base text-slate-600">
              Opoznienia, awarie i chaotyczne komunikaty to codziennosc. Informacje sa rozproszone i docieraja zbyt pozno,
              a brak prognoz sprawia, ze czesto stoimy przed trudnym wyborem trasy.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {["Nieoczekiwane opoznienia", "Chaos informacyjny", "Brak prognozowania"].map((title) => (
              <div key={title} className="rounded-2xl bg-white p-6 shadow-md shadow-slate-100 ring-1 ring-slate-100">
                <div className="mb-4 h-10 w-10 rounded-xl bg-cyan-100 text-cyan-600 ring-8 ring-cyan-50" />
                <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Komunikaty pojawiaja sie z opoznieniem, a pasazerowie musza bazowac na niepewnych zrodlach informacji.
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid items-center gap-10 rounded-3xl bg-slate-900 p-10 text-slate-100 md:grid-cols-[1.2fr_1fr]">
          <div className="space-y-5">
            <h2 className="text-3xl font-semibold sm:text-4xl">Inteligentne rozwiazanie oparte na wspolpracy</h2>
            <p className="text-base text-slate-300">
              TransitTracker laczy dane spolecznosci i przewoznikow. W kilka chwil weryfikuje zgloszenia, dopasowuje je do rozkladow jazdy i prezentuje kontekst na interaktywnej mapie.
            </p>
            <ul className="grid gap-4 text-sm text-slate-200 sm:grid-cols-2">
              <li className="rounded-2xl bg-white/10 p-4">
                <div className="text-sm font-semibold">Weryfikacja przez spolecznosc</div>
                <p className="mt-1 text-slate-300">
                  Oceny wiarygodnosci, punkty za pomocne zgloszenia i system reputacji.
                </p>
              </li>
              <li className="rounded-2xl bg-white/10 p-4">
                <div className="text-sm font-semibold">Dane z systemow dyspozytorskich</div>
                <p className="mt-1 text-slate-300">
                  Integracje API kolejowych i autobusowych przewoznikow regionalnych.
                </p>
              </li>
              <li className="rounded-2xl bg-white/10 p-4">
                <div className="text-sm font-semibold">Analiza predykcyjna</div>
                <p className="mt-1 text-slate-300">
                  Modele przewidujace opoznienia na bazie historycznych wzorcow i pogody.
                </p>
              </li>
              <li className="rounded-2xl bg-white/10 p-4">
                <div className="text-sm font-semibold">Powiadomienia w czasie rzeczywistym</div>
                <p className="mt-1 text-slate-300">
                  Priorytetowe alerty dla tras obserwowanych przez pasazerow i dyspozytorow.
                </p>
              </li>
            </ul>
          </div>
          <div className="relative">
            <div className="absolute inset-0 -translate-y-6 translate-x-6 rounded-3xl bg-cyan-500 opacity-30 blur-3xl" />
            <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-6 shadow-2xl">
              <div className="text-sm font-semibold text-slate-200">Panel dyspozytorski</div>
              <div className="mt-6 space-y-4 text-xs text-slate-300">
                {[
                  { label: "Linia", value: "KMK 124" },
                  { label: "Przewoznik", value: "MPK Krakow" },
                  { label: "Status", value: "Opoznienie 8 min" },
                  { label: "Ostatnie zgloszenie", value: "Awaria sygnalizacji" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                    <span className="text-slate-400">{row.label}</span>
                    <span className="font-semibold text-white">{row.value}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/dispatcher"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900"
              >
                Otworz panel
                <FaArrowRightLong className="text-slate-500" />
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold sm:text-4xl">Funkcjonalnosci, ktore robia roznice</h2>
            <p className="max-w-3xl text-base text-slate-600">
              Kazdy modul projektowalismy z mysla o pasazerach, dyspozytorach i partnerach biznesowych.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {features.map(({ title, description, Icon }) => (
              <div key={title} className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-lg shadow-slate-100 ring-1 ring-slate-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="rounded-3xl bg-white p-10 shadow-xl shadow-slate-100 ring-1 ring-slate-100">
          <div className="mb-10 flex flex-col gap-4 text-center">
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Jak to dziala?</h2>
            <p className="mx-auto max-w-2xl text-base text-slate-600">
              Od zgloszenia pasazera po powiadomienie tysiecy uzytkownikow mija zaledwie chwila.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="flex flex-col gap-4 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-sky-600 text-lg font-semibold text-white shadow-lg">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
                <p className="text-sm text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="cta" className="overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-500 via-sky-600 to-blue-700 p-12 text-white shadow-2xl">
          <div className="grid items-center gap-8 md:grid-cols-[2fr_1fr]">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold sm:text-4xl">Przemieszczaj sie bez stresu</h2>
              <p className="max-w-2xl text-base text-white/80">
                Dolacz do spolecznosci TransitTracker i poznaj nowy standard informacji o opoznieniach. Pobierz aplikacje lub zaloguj sie jako przewoznik.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/auth"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-cyan-700/30"
                >
                  Pobierz aplikacje
                  <FaArrowRightLong />
                </Link>
                <Link
                  href="/dispatcher"
                  className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Panel dla przewoznikow
                </Link>
              </div>
            </div>
            <div className="relative mx-auto flex h-64 w-full max-w-xs items-center justify-center">
              <div className="absolute h-48 w-48 rounded-full bg-white/10 blur-2xl" />
              <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-white/50 bg-white/10 text-center text-sm font-semibold">
                Dane realtime
                <br />
                zgromadzone w jednym miejscu
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-16 bg-slate-900 py-12 text-slate-300">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 md:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-lg font-semibold text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-600 text-white">TT</span>
              TransitTracker
            </div>
            <p className="text-sm text-slate-400">
              Inteligentne zarzadzanie komunikacja miejska i regionalna w czasie rzeczywistym.
            </p>
          </div>
          <div className="space-y-2 text-sm">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Produkt</div>
            <Link href="#features" className="block text-slate-300 transition hover:text-white">
              Funkcje
            </Link>
            <Link href="/map" className="block text-slate-300 transition hover:text-white">
              Mapa
            </Link>
            <Link href="/dashboard" className="block text-slate-300 transition hover:text-white">
              Dashboard
            </Link>
          </div>
          <div className="space-y-2 text-sm">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Firma</div>
            <Link href="#" className="block text-slate-300 transition hover:text-white">
              Polityka prywatnosci
            </Link>
            <Link href="#" className="block text-slate-300 transition hover:text-white">
              Regulamin
            </Link>
            <Link href="#" className="block text-slate-300 transition hover:text-white">
              Kontakt
            </Link>
          </div>
        </div>
        <div className="mt-12 text-center text-xs text-slate-500">
          (c) {new Date().getFullYear()} TransitTracker. Wszystkie prawa zastrzezone.
        </div>
      </footer>
    </div>
  );
}
