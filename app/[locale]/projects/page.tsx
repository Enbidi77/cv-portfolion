import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { projects } from "@/data/projects";
import { ProjectsListClient } from "@/components/sections/ProjectsListClient";
import type { Locale } from "@/types";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: "Projects | NGUYEN BAO DUY",
    vi: "Dự án | NGUYEN BAO DUY",
  };
  const descriptions: Record<string, string> = {
    en: "Explore fullstack web applications, real-time communication systems, and software engineering projects by NGUYEN BAO DUY.",
    vi: "Khám phá các ứng dụng web fullstack, hệ thống truyền thông thời gian thực và các dự án kỹ thuật phần mềm của NGUYEN BAO DUY.",
  };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projects");

  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProjectsListClient
          projects={projects}
          locale={locale as Locale}
          title={t("allProjects")}
          subtitle={t("allProjectsSubtitle")}
          searchPlaceholder={t("searchPlaceholder")}
          filterAll={t("filterAll")}
          noProjectsFound={t("noProjectsFound")}
          viewDetails={t("viewDetails")}
          liveDemo={t("liveDemo")}
          sourceCode={t("sourceCode")}
          backToHome={t("backToHome")}
        />
      </div>
    </div>
  );
}
