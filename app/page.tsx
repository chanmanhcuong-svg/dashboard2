"use client";

import Link from "next/link";
import { ZodiacCard, ShareCard } from "@/components/Cards";
import { useApp } from "@/components/Providers";
import { zodiacSigns } from "@/data/zodiacData";

export default function HomePage() {
  const { t, locale } = useApp();
  const first = zodiacSigns[0];
  return (
    <div className="space-y-8">
      <section className="glass rounded-3xl p-6 md:p-10">
        <p className="text-sm text-glow">{t("appTagline")}</p>
        <h1 className="mt-2 text-4xl font-semibold">{t("heroTitle")}</h1>
        <p className="mt-3 max-w-2xl text-white/80">{t("heroSubtitle")}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="rounded-full bg-glow px-5 py-2 text-sm font-medium text-black" href="/explore">{t("explore")}</Link>
          <Link className="glass rounded-full px-5 py-2 text-sm" href="/horoscope">{t("horoscope")}</Link>
          <Link className="glass rounded-full px-5 py-2 text-sm" href="/find-my-sign">{t("findSign")}</Link>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{zodiacSigns.map((s) => <ZodiacCard key={s.slug} sign={s} />)}</section>
      <section className="grid gap-6 md:grid-cols-2">
        <div className="glass rounded-3xl p-6"><h2 className="font-semibold">{t("todayEnergy")}</h2><p className="mt-2 text-sm text-white/80">{t("homeIntro")}</p></div>
        <ShareCard id="home-share" title={`${first.symbol} ${first.name[locale]}`} body={first.dailyHoroscope.quote[locale]} />
      </section>
    </div>
  );
}
