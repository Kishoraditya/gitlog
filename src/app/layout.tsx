import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { FloatingTipJar } from "@/components/FloatingTipJar";
import { FeedbackSidebar } from "@/components/FeedbackSidebar";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "GitLog AI - AI-Powered Changelog Generator",
    template: "%s | GitLog AI",
  },
  description: "Transform your messy Git commits into polished, professional changelogs using AI. Supports Keep a Changelog, GitHub Releases, and more.",
  keywords: ["changelog", "git", "ai", "release notes", "semver", "conventional commits", "github"],
  authors: [{ name: "Kishoraditya", url: "https://github.com/Kishoraditya" }],
  creator: "Kishoraditya",
  metadataBase: new URL("https://gitlog.ai"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gitlog.ai",
    title: "GitLog AI - AI-Powered Changelog Generator",
    description: "Transform your messy Git commits into polished changelogs using AI.",
    siteName: "GitLog AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GitLog AI - AI-Powered Changelog Generator",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased dark min-h-screen flex flex-col`}>
        <SessionProvider>
          <Analytics>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <FloatingTipJar />
            <FeedbackSidebar />
            <Toaster position="bottom-right" richColors theme="dark" />
          </Analytics>
        </SessionProvider>
      </body>
    </html>
  );
}
