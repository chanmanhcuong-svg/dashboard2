"use client";
import Link from "next/link";
import { useApp } from "@/components/Providers";

export default function FavoritesPage(){
  const { favorites, t } = useApp();
  return <div className="space-y-4"><h1 className="text-2xl font-semibold">{t("favorites")}</h1>{favorites.length===0?<div className="glass rounded-2xl p-4 text-white/70">{t("savedEmpty")}</div>:<ul className="grid gap-2">{favorites.map((f)=><li key={f} className="glass rounded-xl p-3 text-sm">{f.startsWith("sign:")?<Link href={`/sign/${f.replace("sign:","")}`}>{f}</Link>:f}</li>)}</ul>}</div>
}
