"use client";

import html2canvas from "html2canvas";
import Link from "next/link";
import { ZodiacSign } from "@/types";
import { useApp } from "./Providers";

export function ZodiacCard({ sign }: { sign: ZodiacSign }) {
  const { locale, favorites, toggleFavorite, notify, t } = useApp();
  const key = `sign:${sign.slug}`;
  const saved = favorites.includes(key);
  return (
    <article className="glass rounded-3xl p-4 transition hover:-translate-y-1">
      <Link href={`/sign/${sign.slug}`}>
        <div className="text-3xl">{sign.symbol}</div>
        <h3 className="mt-2 font-semibold">{sign.name[locale]}</h3>
        <p className="text-xs text-white/60">{sign.dateRange[locale]}</p>
        <p className="mt-2 text-sm text-white/80">{sign.oneLiner[locale]}</p>
      </Link>
      <button className="mt-3 rounded-full border border-white/15 px-3 py-1 text-xs" onClick={() => { toggleFavorite(key); notify(saved ? t("unsave") : t("save")); }}>{saved ? t("unsave") : t("save")}</button>
    </article>
  );
}

export function ShareCard({ title, body, id }: { title: string; body: string; id: string }) {
  const { t, notify } = useApp();
  const download = async () => {
    const el = document.getElementById(id);
    if (!el) return;
    const canvas = await html2canvas(el, { backgroundColor: null, scale: 2 });
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `${id}.png`;
    a.click();
    notify("Downloaded");
  };

  return (
    <div className="space-y-3">
      <div id={id} className="glass mx-auto w-[280px] rounded-[28px] bg-gradient-to-b from-violet/70 to-black/60 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-glow">Zodiac Glow</p>
        <h4 className="mt-2 text-xl font-semibold">{title}</h4>
        <p className="mt-4 text-sm text-white/85">{body}</p>
      </div>
      <div className="flex justify-center gap-2">
        <button className="glass rounded-full px-3 py-1 text-xs" onClick={() => { navigator.clipboard.writeText(`${title} — ${body}`); notify("Copied"); }}>{t("copy")}</button>
        <button className="glass rounded-full px-3 py-1 text-xs" onClick={download}>{t("download")}</button>
      </div>
    </div>
  );
}
