import "./globals.css";
import { Footer, Navbar, Toasts } from "@/components/Layout";
import { Providers } from "@/components/Providers";

export const metadata = {
  title: "Zodiac Glow",
  description: "Premium bilingual astrology experience"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="starfield">
        <Providers>
          <Navbar />
          <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
          <Footer />
          <Toasts />
        </Providers>
      </body>
    </html>
  );
}
