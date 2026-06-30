/**
 * @file app/layout.tsx
 * @description Root layout — sets metadata, fonts, and shared HTML shell.
 */
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
});

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-vietnam",
});

export const metadata: Metadata = {
  title: {
    default: "Synthesis AI — Context-Aware Pitch Generator",
    template: "%s | Synthesis AI",
  },
  description:
    "Generate hyper-personalised professional pitches powered by Google Gemini AI. One Master Profile, infinite contexts.",
  keywords: ["pitch generator", "AI", "Gemini", "sales", "freelance", "context-aware"],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Synthesis AI",
    description: "AI-powered pitch generator for professionals",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable} ${beVietnamPro.variable}`} suppressHydrationWarning>
        <body className="antialiased">{children}</body>
      </html>
    </ClerkProvider>
  );
}
