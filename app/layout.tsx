import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import ToasterTheme from "@/components/providers/ToasterTheme";

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
    default: "Lingual Leap AI",
    template: "%s | Lingual Leap AI",
  },
  description:
    "Lingual Leap AI is an AI-powered language learning platform that helps you practice, improve, and master new languages through personalized lessons and real conversations.",
  applicationName: "Lingual Leap AI",
  keywords: [
    "AI language learning",
    "learn languages with AI",
    "language practice",
    "language SaaS",
    "English learning",
    "Spanish learning",
    "AI education platform",
  ],
  authors: [{ name: "Lingual Leap AI" }],
  creator: "Lingual Leap AI",
  metadataBase: new URL("https://lingualleapai.com"), // depois você troca
  openGraph: {
    title: "Lingual Leap AI",
    description:
      "Learn languages faster with AI-powered lessons, conversations, and personalized practice.",
    url: "https://lingualleapai.com",
    siteName: "Lingual Leap AI",
    images: [
      {
        url: "/og-image.png", // você pode criar depois
        width: 1200,
        height: 630,
        alt: "Lingual Leap AI - AI-powered language learning",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lingual Leap AI",
    description:
      "Master new languages with AI-powered lessons and real-time practice.",
    images: ["/og-image.png"],
    creator: "@lingualleapai", // opcional
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToasterTheme />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
