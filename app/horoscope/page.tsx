"use client";
import { useState } from "react";
import { ShareCard } from "@/components/Cards";
import { useApp } from "@/components/Providers";
import { zodiacSigns } from "@/data/zodiacData";

export default function HoroscopePage() {
  const { locale, t } = useApp();
  const [slug, setSlug] = useState("aries");
  const s = zodiacSigns.find((z) => z.slug === slug)!;
  return <div className="space-y-4"><h1 className="text-2xl font-semibold">{t("horoscope")}</h1><select value={slug} onChange={(e) => setSlug(e.target.value)} className="glass rounded-xl px-3 py-2">{zodiacSigns.map((z)=><option key={z.slug} value={z.slug}>{z.name[locale]}</option>)}</select><section className="grid gap-3 md:grid-cols-2">{(["love","career","mood","energy"] as const).map((k)=><article key={k} className="glass rounded-2xl p-4"><p className="text-xs uppercase text-white/60">{k}</p><p className="mt-2">{s.dailyHoroscope[k][locale]}</p></article>)}</section><section className="glass rounded-2xl p-4"><p className="text-sm text-glow">{t("dailyExtra")}</p><p>{s.dailyHoroscope.vibeTag[locale]} · {s.dailyHoroscope.luckyColor[locale]} · #{s.dailyHoroscope.luckyNumber}</p></section><ShareCard id={`horo-${slug}`} title={`${s.name[locale]} • ${s.dailyHoroscope.vibeTag[locale]}`} body={s.dailyHoroscope.quote[locale]} /></div>;
}
