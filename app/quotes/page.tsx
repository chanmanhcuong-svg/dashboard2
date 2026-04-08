"use client";
import { useMemo, useState } from "react";
import { ShareCard } from "@/components/Cards";
import { useApp } from "@/components/Providers";
import { zodiacSigns } from "@/data/zodiacData";

export default function QuotesPage() {
  const { locale, t, favorites, toggleFavorite, notify } = useApp();
  const [slug, setSlug] = useState("aries");
  const sign = zodiacSigns.find((s) => s.slug === slug)!;
  const daily = useMemo(() => sign.quotes[new Date().getUTCDate() % sign.quotes.length][locale], [sign, locale]);
  return <div className="space-y-4"><h1 className="text-2xl font-semibold">{t("quotes")}</h1><div className="flex gap-2"><select className="glass rounded-xl px-3 py-2" value={slug} onChange={(e)=>setSlug(e.target.value)}>{zodiacSigns.map((s)=><option key={s.slug} value={s.slug}>{s.name[locale]}</option>)}</select><button className="glass rounded-xl px-3 py-2 text-sm" onClick={()=>notify(daily)}>{t("randomQuote")}</button></div><div className="grid gap-3">{sign.quotes.map((q,i)=>{const id=`quote:${slug}:${i}`; const saved=favorites.includes(id); return <article key={id} className="glass rounded-2xl p-4"><p>{q[locale]}</p><button className="mt-2 rounded-full border border-white/20 px-3 py-1 text-xs" onClick={()=>{toggleFavorite(id); notify(saved?t("unsave"):t("save"));}}>{saved?t("unsave"):t("save")}</button></article>;})}</div><ShareCard id="quote-share" title={`${sign.name[locale]} Quote`} body={daily} /></div>;
}
