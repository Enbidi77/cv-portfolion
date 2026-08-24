import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "@/app/globals.css";
import type { Locale } from "@/types";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nguyenbaoduy.dev";

  const titles: Record<string, string> = {
    en: "NGUYEN BAO DUY — Fullstack Web Developer",
    vi: "NGUYEN BAO DUY — Lập trình viên Fullstack",
  };

  const descriptions: Record<string, string> = {
    en: "Fullstack/Backend Software Engineer developing scalable web applications using Java Spring Boot, ASP.NET Core, NestJS, and modern frontend technologies.",
    vi: "Kỹ sư phần mềm Fullstack / Backend giàu kinh nghiệm xây dựng ứng dụng web mở rộng với Java Spring Boot, ASP.NET Core, NestJS và các công nghệ frontend hiện đại.",
  };

  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | NGUYEN BAO DUY`,
    },
    description,
    keywords: [
      "Fullstack Developer",
      "Lập trình viên Fullstack",
      "Software Engineer",
      "Kỹ sư phần mềm",
      "React",
      "Next.js",
      "NestJS",
      "Spring Boot",
      "ASP.NET Core",
      "TypeScript",
      "Java",
      "C#",
      "Portfolio",
      "NGUYEN BAO DUY",
    ],
    authors: [{ name: "NGUYEN BAO DUY" }],
    creator: "NGUYEN BAO DUY",
    openGraph: {
      type: "website",
      locale: locale === "vi" ? "vi_VN" : "en_US",
      url: locale === "vi" ? `${siteUrl}/vi` : siteUrl,
      title,
      description,
      siteName: "NGUYEN BAO DUY Portfolio",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
