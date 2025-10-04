"use client";

import Link from "next/link";
import { FaApple, FaArrowLeftLong, FaGoogle } from "react-icons/fa6";
import { LuEye, LuEyeOff, LuLock, LuMail } from "react-icons/lu";

const providers = [
  { label: "Kontynuuj z Google", Icon: FaGoogle },
  { label: "Kontynuuj z Apple", Icon: FaApple },
];

export default function AuthPage() {
  return (
    <div className="relative min-h-screen bg-[radial-gradient(circle_at_top,_#e0f7ff_0%,_#f5f9ff_40%,_#f6f8ff_70%,_#f3f6ff_100%)] text-slate-900">
      <div className="absolute inset-x-0 top-0 mx-auto h-40 w-full max-w-5xl rounded-b-[56px] bg-gradient-to-r from-cyan-500 via-sky-500 to-emerald-400 opacity-80 blur-3xl" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-xl flex-col px-6 pb-16 pt-10">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-800"
        >
          <FaArrowLeftLong />
          Powrot
        </Link>
        <div className="rounded-[36px] border border-white/80 bg-white/80 p-10 shadow-xl backdrop-blur">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 text-white shadow-inner">
              <span className="text-2xl font-bold">TT</span>
            </div>
            <h1 className="text-3xl font-semibold">Zaloguj sie do swojego konta</h1>
            <p className="text-sm text-slate-500">Odzyskaj kontrola nad podrozami w czasie rzeczywistym.</p>
          </div>

          <div className="mt-8 space-y-3">
            {providers.map(({ label, Icon }) => (
              <button
                key={label}
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-400 hover:text-slate-900"
              >
                <Icon />
                {label}
              </button>
            ))}
          </div>

          <div className="my-8 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            <span className="h-px flex-1 bg-slate-200" />
            lub
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <form className="space-y-5">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</span>
              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 focus-within:border-sky-400">
                <LuMail className="text-slate-400" />
                <input
                  type="email"
                  placeholder="twoj@email.com"
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Haslo</span>
              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 focus-within:border-sky-400">
                <LuLock className="text-slate-400" />
                <input
                  type="password"
                  placeholder="********"
                  className="w-full bg-transparent outline-none"
                />
                <LuEyeOff className="text-slate-300" />
              </div>
            </label>
            <div className="flex items-center justify-between text-xs">
              <Link href="#" className="font-semibold text-sky-600 hover:text-sky-700">
                Zapomniales hasla?
              </Link>
              <div className="flex items-center gap-2 text-slate-500">
                <LuEye className="text-slate-300" />
                Dostep dla pasazerow i dyspozytorow
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-900/10 transition hover:brightness-110"
            >
              Zaloguj sie
            </button>
          </form>

          <div className="mt-6 space-y-4 text-center text-sm text-slate-500">
            <p>
              Nie masz konta?{" "}
              <Link href="#" className="font-semibold text-sky-600 hover:text-sky-700">
                Zarejestruj sie
              </Link>
            </p>
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Wchodz jako gosc
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
