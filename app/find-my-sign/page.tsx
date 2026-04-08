"use client";

import { useState } from "react";
import { ShareCard } from "@/components/Cards";
import { useApp } from "@/components/Providers";
import { getSignByBirthday } from "@/lib/utils";

export default function FindMySignPage() {
  const { locale, t } = useApp();
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const sign = checked && date ? getSignByBirthday(date) : null;

  const onCheck = () => {
    setLoading(true);
    setTimeout(() => {
      setChecked(true);
      setLoading(false);
    }, 400);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{t("findSign")}</h1>
      <div className="glass rounded-2xl p-4">
        <label className="text-sm">{t("birthday")}</label>
        <input type="date" value={date} onChange={(e) => { setDate(e.target.value); setChecked(false); }} className="mt-2 w-full rounded-xl bg-white/5 p-2" />
        <button type="button" onClick={onCheck} className="mt-3 rounded-full bg-glow px-4 py-2 text-xs font-medium text-black">{t("check")}</button>
      </div>

      {!checked && <div className="glass rounded-2xl p-4 text-white/70">{t("empty")}</div>}
      {loading && <div className="glass animate-pulse rounded-2xl p-4 text-white/70">{t("loading")}</div>}
      {checked && date && !sign && !loading && <div className="glass rounded-2xl p-4 text-rose-200">{t("invalidDate")}</div>}

      {checked && sign && !loading && (
        <>
          <article className="glass rounded-2xl p-4">
            <p className="text-3xl">{sign.symbol}</p>
            <h2 className="text-xl font-semibold">{sign.name[locale]}</h2>
            <p className="text-white/70">{sign.dateRange[locale]}</p>
            <p className="mt-2">{sign.personality[locale]}</p>
          </article>
          <ShareCard id="find-share" title={`${sign.symbol} ${sign.name[locale]}`} body={sign.oneLiner[locale]} />
        </>
      )}
    </div>
  );
}
