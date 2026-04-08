export type Locale = "vi" | "en";

export type Translated = Record<Locale, string>;

export type ZodiacSign = {
  slug: string;
  name: Translated;
  symbol: string;
  dateRange: Translated;
  element: Translated;
  modality: Translated;
  rulingPlanet: Translated;
  personality: Translated;
  strengths: Translated[];
  weaknesses: Translated[];
  loveStyle: Translated;
  friendshipStyle: Translated;
  career: Translated;
  luckyVibe: Translated;
  luckyColors: Translated[];
  luckyNumbers: number[];
  signatureQuote: Translated;
  lifestyleSummary: Translated;
  oneLiner: Translated;
  dailyHoroscope: {
    love: Translated;
    career: Translated;
    mood: Translated;
    energy: Translated;
    vibeTag: Translated;
    luckyColor: Translated;
    luckyNumber: number;
    quote: Translated;
  };
  quotes: Translated[];
};

export type CompatibilityResult = {
  score: number;
  romance: number;
  friendship: number;
  communication: number;
  summary: Translated;
  whyWorks: Translated;
  watchOut: Translated;
};
