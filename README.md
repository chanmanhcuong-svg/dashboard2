# Zodiac Glow ✨

Premium bilingual (Vietnamese/English) astrology web app built with Next.js + TypeScript + Tailwind.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build
npm run start
```

## Project structure

- `app/` – Next.js routes and page layouts.
- `components/` – reusable UI components (cards, navbar, footer, providers, toasts).
- `data/zodiacData.ts` – all 12 sign mock content, horoscope, quotes, compatibility logic.
- `data/translations.ts` – UI text for Vietnamese + English.
- `hooks/useLocalStorage.ts` – localStorage persistence for locale and favorites.
- `lib/utils.ts` – helper logic (birthday → zodiac sign).
- `types/index.ts` – shared TypeScript models.
- `app/globals.css` – design tokens, cosmic background, glassmorphism utilities.

## Non-coder edit guide

- Colors and cosmic style: `tailwind.config.ts`, `app/globals.css`
- Zodiac content: `data/zodiacData.ts`
- Vietnamese UI text: `data/translations.ts` (`vi` section)
- English UI text: `data/translations.ts` (`en` section)
- Quotes and share text: `data/zodiacData.ts` (`quotes`, `signatureQuote`, `dailyHoroscope.quote`)
- Lucky numbers/colors: `data/zodiacData.ts` (`luckyNumbers`, `luckyColors`, `dailyHoroscope.luckyColor`)
- Share card format: `components/Cards.tsx` (`ShareCard`)
