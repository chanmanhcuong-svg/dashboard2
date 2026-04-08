"use client";

import Link from "next/link";
import { useApp } from "@/components/Providers";
import { zodiacSigns } from "@/data/zodiacData";

function favoriteLabel(id: string, locale: "vi" | "en") {
  if (id.startsWith("sign:")) {
    const slug = id.replace("sign:", "");
    const sign = zodiacSigns.find((s) => s.slug === slug);
    return sign ? `${sign.symbol} ${sign.name[locale]}` : id;
  }
  if (id.startsWith("quote:")) {
    const [, slug, idx] = id.split(":");
    const sign = zodiacSigns.find((s) => s.slug === slug);
    const quote = sign?.quotes[Number(idx)]?.[locale];
    return quote ?? id;
  }
  return id;
}

export default function FavoritesPage() {
  const { favorites, t, locale } = useApp();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{t("favorites")}</h1>
      {favorites.length === 0 ? (
        <div className="glass rounded-2xl p-4 text-white/70">{t("savedEmpty")}</div>
      ) : (
        <ul className="grid gap-2">
          {favorites.map((f) => (
            <li key={f} className="glass rounded-xl p-3 text-sm">
              {f.startsWith("sign:") ? <Link href={`/sign/${f.replace("sign:", "")}`}>{favoriteLabel(f, locale)}</Link> : favoriteLabel(f, locale)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
