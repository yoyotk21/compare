import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/shared/providers";
import SiteHeader from "@/components/layout/site-header";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "compare_llm",
  description: "See how top LLMs respond to the same prompt.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-canvas text-ink">
      <body
        className={`${display.variable} ${body.variable} font-body bg-canvas text-ink antialiased`}
      >
        <Providers>
          <div className="relative min-h-screen w-full bg-noise">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(127,255,212,0.25),_transparent_60%)] opacity-60" />
            <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 pb-16 pt-10">
              <SiteHeader />
              <main className="flex-1">{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
