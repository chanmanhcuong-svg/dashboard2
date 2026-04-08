"use client";
import { useState } from "react";
import { ShareCard } from "@/components/Cards";
import { useApp } from "@/components/Providers";
import { getCompatibility, zodiacSigns } from "@/data/zodiacData";

export default function CompatibilityPage() {
  const { locale, t } = useApp();
  const [a, setA] = useState("aries");
  const [b, setB] = useState("taurus");
  const r = getCompatibility(a,b);
  return <div className="space-y-4"><h1 className="text-2xl font-semibold">{t("compatibilityTitle")}</h1><div className="grid gap-2 sm:grid-cols-2">{[a,b].map((v,i)=><select key={i} value={v} onChange={(e)=> i===0?setA(e.target.value):setB(e.target.value)} className="glass rounded-xl px-3 py-2">{zodiacSigns.map((s)=><option key={s.slug} value={s.slug}>{s.name[locale]}</option>)}</select>)}</div><section className="glass rounded-3xl p-5"><p className="text-4xl font-semibold text-glow">{r.score}%</p><div className="mt-2 grid grid-cols-3 gap-2 text-sm"><P n="Romance" v={r.romance}/><P n="Friendship" v={r.friendship}/><P n="Comms" v={r.communication}/></div><p className="mt-3">{r.summary[locale]}</p><p className="mt-2 text-white/80">{r.whyWorks[locale]}</p><p className="mt-2 text-rose-200">{r.watchOut[locale]}</p></section><ShareCard id="comp-card" title="Compatibility Aura" body={`${r.score}% — ${r.summary[locale]}`} /></div>;
}
const P=({n,v}:{n:string;v:number})=><div className="rounded-xl bg-white/5 p-2"><p className="text-white/60">{n}</p><p className="font-semibold">{v}%</p></div>;
