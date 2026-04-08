"use client";
import { useState } from "react";
import { ShareCard } from "@/components/Cards";
import { useApp } from "@/components/Providers";
import { getSignByBirthday } from "@/lib/utils";

export default function FindMySignPage(){
  const { locale, t } = useApp();
  const [date, setDate] = useState("");
  const sign = date ? getSignByBirthday(date) : null;
  return <div className="space-y-4"><h1 className="text-2xl font-semibold">{t("findSign")}</h1><div className="glass rounded-2xl p-4"><label className="text-sm">{t("birthday")}</label><input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="mt-2 w-full rounded-xl bg-white/5 p-2"/></div>{!date && <div className="glass rounded-2xl p-4 text-white/70">{t("empty")}</div>}{date && !sign && <div className="glass rounded-2xl p-4 text-rose-200">Invalid date</div>}{sign && <><article className="glass rounded-2xl p-4"><p className="text-3xl">{sign.symbol}</p><h2 className="text-xl font-semibold">{sign.name[locale]}</h2><p className="text-white/70">{sign.dateRange[locale]}</p><p className="mt-2">{sign.personality[locale]}</p></article><ShareCard id="find-share" title={`${sign.symbol} ${sign.name[locale]}`} body={sign.oneLiner[locale]} /></>}</div>
}
