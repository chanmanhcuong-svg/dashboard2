import { zodiacSigns } from "@/data/zodiacData";

export const cn = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");

export function getSignByBirthday(dateStr: string) {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return null;
  const m = date.getUTCMonth() + 1;
  const d = date.getUTCDate();
  const md = m * 100 + d;
  const ranges: Record<string, [number, number]> = {
    aries: [321, 419], taurus: [420, 520], gemini: [521, 620], cancer: [621, 722], leo: [723, 822], virgo: [823, 922], libra: [923, 1022], scorpio: [1023, 1121], sagittarius: [1122, 1221], capricorn: [1222, 119], aquarius: [120, 218], pisces: [219, 320]
  };
  const sign = zodiacSigns.find((s) => {
    const [start, end] = ranges[s.slug];
    return start <= end ? md >= start && md <= end : md >= start || md <= end;
  });
  return sign ?? null;
}
