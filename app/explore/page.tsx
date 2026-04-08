"use client";

import { useMemo, useState } from "react";
import { ZodiacCard } from "@/components/Cards";
import { useApp } from "@/components/Providers";
import { zodiacSigns } from "@/data/zodiacData";

export default function ExplorePage() {
  const { t, locale } = useApp();
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("asc");
  const list = useMemo(() => zodiacSigns
    .filter((s) => s.name[locale].toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => sort === "asc" ? a.name[locale].localeCompare(b.name[locale]) : b.name[locale].localeCompare(a.name[locale])), [q, sort, locale]);
  return <div className="space-y-4"><h1 className="text-2xl font-semibold">{t("explore")}</h1><div className="flex gap-2"><input className="glass w-full rounded-xl px-4 py-2 text-sm" placeholder={t("search")} value={q} onChange={(e) => setQ(e.target.value)} /><select className="glass rounded-xl px-3 py-2 text-sm" value={sort} onChange={(e) => setSort(e.target.value)}><option value="asc">A-Z</option><option value="desc">Z-A</option></select></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{list.map((s) => <ZodiacCard key={s.slug} sign={s} />)}</div></div>;
}
