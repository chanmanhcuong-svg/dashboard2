"use client";

import { useParams } from "next/navigation";
import { ShareCard } from "@/components/Cards";
import { useApp } from "@/components/Providers";
import { zodiacSigns } from "@/data/zodiacData";

export default function SignPage() {
  const { slug } = useParams<{slug: string}>();
  const { locale } = useApp();
  const sign = zodiacSigns.find((s) => s.slug === slug);
  if (!sign) return null;
  return <div className="space-y-5"><section className="glass rounded-3xl p-6"><p className="text-4xl">{sign.symbol}</p><h1 className="text-3xl font-semibold">{sign.name[locale]}</h1><p className="text-white/65">{sign.dateRange[locale]}</p><p className="mt-4 text-white/85">{sign.personality[locale]}</p><div className="mt-4 grid gap-3 sm:grid-cols-2"><Info label="Element" value={sign.element[locale]} /><Info label="Modality" value={sign.modality[locale]} /><Info label="Ruling Planet" value={sign.rulingPlanet[locale]} /><Info label="Lucky vibe" value={sign.luckyVibe[locale]} /></div></section><section className="grid gap-4 md:grid-cols-3">{sign.strengths.map((x,i)=><Box key={i} title="Strength" val={x[locale]} />)}{sign.weaknesses.map((x,i)=><Box key={i} title="Watch out" val={x[locale]} />)}</section><ShareCard id={`share-${sign.slug}`} title={`${sign.symbol} ${sign.name[locale]}`} body={sign.signatureQuote[locale]} /></div>;
}

const Info = ({ label, value }: {label: string; value: string}) => <div className="rounded-xl bg-white/5 p-3"><p className="text-xs text-white/60">{label}</p><p className="text-sm">{value}</p></div>;
const Box = ({ title, val }: {title: string; val: string}) => <article className="glass rounded-2xl p-4"><p className="text-xs text-white/50">{title}</p><p className="mt-1">{val}</p></article>;
