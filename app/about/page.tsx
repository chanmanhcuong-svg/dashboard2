"use client";
import { useApp } from "@/components/Providers";

export default function AboutPage(){
  const { locale, t } = useApp();
  return <div className="glass rounded-3xl p-6 space-y-3"><h1 className="text-2xl font-semibold">{t("about")}</h1><p>{locale==="vi"?"Zodiac Glow mang chiêm tinh phương Tây vào một trải nghiệm hiện đại: đọc nhanh, hiểu sâu, share đẹp.":"Zodiac Glow translates Western astrology into a modern ritual: quick to read, deep to feel, beautiful to share."}</p><p>{locale==="vi"?"Chúng tôi tập trung vào horoscope hằng ngày, quote truyền cảm hứng, độ hợp và card chia sẻ cho mạng xã hội.":"We focus on daily horoscope content, emotionally smart quotes, compatibility insights, and social-ready share cards."}</p><p className="text-white/70">{t("entertainment")}</p></div>
}
