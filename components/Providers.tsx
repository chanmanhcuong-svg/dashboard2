"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { Locale } from "@/types";
import { uiText } from "@/data/translations";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type Toast = { id: number; message: string };

type AppCtx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (k: string) => string;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  toasts: Toast[];
  notify: (msg: string) => void;
};

const AppContext = createContext<AppCtx | null>(null);

export function Providers({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useLocalStorage<Locale>("zg-locale", "vi");
  const [favorites, setFavorites] = useLocalStorage<string[]>("zg-favs", []);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const notify = (message: string) => {
    const toast = { id: Date.now(), message };
    setToasts((v) => [...v, toast]);
    setTimeout(() => setToasts((v) => v.filter((t) => t.id !== toast.id)), 2400);
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const value = useMemo(() => ({
    locale,
    setLocale,
    t: (k: string) => uiText[locale][k] ?? k,
    favorites,
    toggleFavorite,
    toasts,
    notify
  }), [favorites, locale, setLocale, toasts]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("AppContext missing");
  return ctx;
};
