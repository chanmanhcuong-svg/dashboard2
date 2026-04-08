"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useApp } from "./Providers";

const nav = ["explore", "horoscope", "compatibility", "findSign", "quotes", "favorites", "about"] as const;

const hrefFor = (k: string) => `/${k === "findSign" ? "find-my-sign" : k}`;

export function Navbar() {
  const { locale, setLocale, t } = useApp();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#070810]/75 backdrop-blur-xl">
      <nav className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-wide text-glow">Zodiac Glow</Link>
          <div className="hidden items-center gap-3 md:flex">
            {nav.map((k) => (
              <Link key={k} href={hrefFor(k)} className="text-sm text-white/80 hover:text-white">{t(k)}</Link>
            ))}
            <button onClick={() => setLocale(locale === "vi" ? "en" : "vi")} className="glass rounded-full px-3 py-1 text-xs">{locale.toUpperCase()}</button>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <button onClick={() => setLocale(locale === "vi" ? "en" : "vi")} className="glass rounded-full px-3 py-1 text-xs">{locale.toUpperCase()}</button>
            <button className="glass rounded-full p-2" aria-label={open ? t("closeMenu") : t("openMenu")} onClick={() => setOpen((v) => !v)}>
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
        {open && (
          <div className="mt-3 grid gap-2 rounded-2xl border border-white/10 bg-white/5 p-3 md:hidden">
            {nav.map((k) => (
              <Link key={k} href={hrefFor(k)} className="rounded-lg px-2 py-1 text-sm text-white/85 hover:bg-white/10" onClick={() => setOpen(false)}>
                {t(k)}
              </Link>
            ))}
          </div>
        )}
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
  return (
    <div className="fixed right-4 top-20 z-40 space-y-2">
      {toasts.map((x) => <div key={x.id} className="glass rounded-xl px-3 py-2 text-sm">{x.message}</div>)}
    </div>
  );
}
