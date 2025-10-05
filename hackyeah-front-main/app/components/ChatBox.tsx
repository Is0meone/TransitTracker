"use client";

import { useEffect, useRef, useState } from "react";
import { FaPaperPlane, FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa6";

type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  ts: number;
};

type ChatBoxProps = {
  /** Jeśli zostawisz pusty, użyje /api/chat (proxy) */
  directAgentUrl?: "http://217.153.167.103:5050/chat"; // np. "http://localhost:5050/chat"
  title?: string;
  placeholder?: string;
  className?: string;
};

export default function ChatBox({
  directAgentUrl,
  title = "Zapytaj asystenta AI",
  placeholder = "Napisz wiadomość i naciśnij Enter…",
  className = "",
}: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const postMessage = async (text: string) => {
    setIsSending(true);
    setError(null);

    // optimistic add
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      ts: Date.now(),
    };
    setMessages((m) => [...m, userMsg]);

    try {
      const res = await fetch(directAgentUrl || "/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json", accept: "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) {
        throw new Error(`Błąd sieci (${res.status})`);
      }

      // Oczekujemy { answer: string }
      const data = (await res.json()) as { answer?: string; [k: string]: unknown };

      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: (data?.answer ?? "").toString().trim() || "Brak odpowiedzi.",
        ts: Date.now(),
      };

      setMessages((m) => [...m, assistantMsg]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Nieznany błąd.";
      setError(msg);
      // dodać krótką systemową informację
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: "system",
          content:
            "Nie udało się pobrać odpowiedzi. Spróbuj ponownie lub sprawdź czy agent działa na porcie 5050.",
          ts: Date.now(),
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isSending) return;
    setInput("");
    void postMessage(text);
  };

  // autoscroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isSending]);

  return (
    <div
      className={`flex h-[480px] w-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
        <h4 className="text-sm font-semibold text-slate-800">{title}</h4>
        <span className="text-[10px] uppercase tracking-wide text-slate-400">
          Beta
        </span>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
        {messages.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
            Napisz pytanie (np. “Rozpisz mi krok po kroku drogę z Tauron Areny do
            lotniska w Krakowie, czy są jakieś opóźnienia?”)
          </div>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                m.role === "user"
                  ? "ml-auto bg-sky-600 text-white"
                  : m.role === "assistant"
                    ? "bg-white text-slate-800"
                    : "bg-amber-50 text-amber-700"
              }`}
            >
              {m.content}
              {m.role === "assistant" && (
                <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
                  <button
                    type="button"
                    aria-label="Przydatne"
                    className="inline-flex items-center gap-1 hover:text-slate-600"
                  >
                    <FaRegThumbsUp className="h-4 w-4" /> Przydatne
                  </button>
                  <button
                    type="button"
                    aria-label="Nieprzydatne"
                    className="inline-flex items-center gap-1 hover:text-slate-600"
                  >
                    <FaRegThumbsDown className="h-4 w-4" /> Nieprzydatne
                  </button>
                </div>
              )}
            </div>
          ))
        )}
        <div ref={endRef} />
      </div>

      <form onSubmit={onSubmit} className="border-t border-slate-100 p-3">
        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="h-11 w-full bg-transparent px-2 text-sm text-slate-700 outline-none"
          />
          <button
            type="submit"
            disabled={isSending || input.trim().length === 0}
            className="inline-flex h-9 items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-emerald-400 px-3 text-sm font-semibold text-white disabled:opacity-50"
            title="Wyślij"
          >
            {isSending ? (
              <span className="animate-pulse px-2 text-xs">Wysyłanie…</span>
            ) : (
              <FaPaperPlane className="h-4 w-4" />
            )}
          </button>
        </div>
        {error && (
          <p className="mt-2 text-xs text-rose-600">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
