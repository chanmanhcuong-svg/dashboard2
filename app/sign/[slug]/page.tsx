"use client";

import { useParams } from "next/navigation";
import { ShareCard } from "@/components/Cards";
import { useApp } from "@/components/Providers";
import { zodiacSigns } from "@/data/zodiacData";

export default function SignPage() {
  const { slug } = useParams<{ slug: string }>();
  const { locale, t } = useApp();
  const sign = zodiacSigns.find((s) => s.slug === slug);

  if (!sign) return <div className="glass rounded-2xl p-4">{t("noMatch")}</div>;

  return (
    <div className="space-y-5">
      <section className="glass rounded-3xl p-6">
        <p className="text-4xl">{sign.symbol}</p>
        <h1 className="text-3xl font-semibold">{sign.name[locale]}</h1>
        <p className="text-white/65">{sign.dateRange[locale]}</p>
        <p className="mt-4 text-white/85">{sign.personality[locale]}</p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Info label={t("element")} value={sign.element[locale]} />
          <Info label={t("modality")} value={sign.modality[locale]} />
          <Info label={t("rulingPlanet")} value={sign.rulingPlanet[locale]} />
          <Info label={t("luckyVibe")} value={sign.luckyVibe[locale]} />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <InfoCard title={t("loveStyle")} value={sign.loveStyle[locale]} />
        <InfoCard title={t("friendshipStyle")} value={sign.friendshipStyle[locale]} />
        <InfoCard title={t("career")} value={sign.career[locale]} />
        <InfoCard title={t("luckyColors")} value={sign.luckyColors.map((x) => x[locale]).join(" • ")} />
        <InfoCard title={t("luckyNumbers")} value={sign.luckyNumbers.join(" • ")} />
        <InfoCard title="Lifestyle" value={sign.lifestyleSummary[locale]} />
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {sign.strengths.map((x, i) => <Box key={`s-${i}`} title={t("strength")} val={x[locale]} />)}
        {sign.weaknesses.map((x, i) => <Box key={`w-${i}`} title={t("weakness")} val={x[locale]} />)}
      </section>

      <ShareCard id={`share-${sign.slug}`} title={`${sign.symbol} ${sign.name[locale]}`} body={sign.signatureQuote[locale]} />
    </div>
  );
}

const Info = ({ label, value }: { label: string; value: string }) => <div className="rounded-xl bg-white/5 p-3"><p className="text-xs text-white/60">{label}</p><p className="text-sm">{value}</p></div>;
const Box = ({ title, val }: { title: string; val: string }) => <article className="glass rounded-2xl p-4"><p className="text-xs text-white/50">{title}</p><p className="mt-1">{val}</p></article>;
const InfoCard = ({ title, value }: { title: string; value: string }) => <article className="glass rounded-2xl p-4"><p className="text-xs uppercase text-white/60">{title}</p><p className="mt-2">{value}</p></article>;
