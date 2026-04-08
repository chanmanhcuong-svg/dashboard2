"use client";

import Link from "next/link";
import { useApp } from "./Providers";

const nav = ["explore", "horoscope", "compatibility", "findSign", "quotes", "favorites", "about"] as const;

export function Navbar() {
  const { locale, setLocale, t } = useApp();
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#070810]/75 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link href="/" className="font-semibold tracking-wide text-glow">Zodiac Glow</Link>
        <div className="hidden gap-3 md:flex">
          {nav.map((k) => <Link key={k} href={`/${k === "findSign" ? "find-my-sign" : k}`} className="text-sm text-white/80 hover:text-white">{t(k)}</Link>)}
        </div>
        <button onClick={() => setLocale(locale === "vi" ? "en" : "vi")} className="glass rounded-full px-3 py-1 text-xs">{locale.toUpperCase()}</button>
      </nav>
    </header>
  );
}

export function Footer() {
  const { t } = useApp();
  return <footer className="mx-auto max-w-6xl px-4 py-10 text-center text-sm text-white/60">{t("entertainment")}</footer>;
}

export function Toasts() {
  const { toasts } = useApp();
  return <div className="fixed right-4 top-20 z-40 space-y-2">{toasts.map((x) => <div key={x.id} className="glass rounded-xl px-3 py-2 text-sm">{x.message}</div>)}</div>;
}
