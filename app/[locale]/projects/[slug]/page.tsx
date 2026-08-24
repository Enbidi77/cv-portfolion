import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  ExternalLink,
  ArrowLeft,
  ChevronDown,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import { routing } from "@/i18n/routing";
import { projects, getProjectBySlug } from "@/data/projects";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/types";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  routing.locales.forEach((locale) => {
    projects.forEach((project) => {
      params.push({
        locale,
        slug: project.slug,
      });
    });
  });
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | NGUYEN BAO DUY",
    };
  }

  const validLocale = (locale === "vi" ? "vi" : "en") as Locale;
  const title = `${project.title[validLocale]} | NGUYEN BAO DUY`;
  const description = project.shortDescription[validLocale];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title[validLocale],
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const validLocale = (locale === "vi" ? "vi" : "en") as Locale;
  setRequestLocale(locale);

  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  const t = await getTranslations("projects");
  const tNav = await getTranslations("navigation");

  return (
    <article className="pt-24 pb-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap"
        >
          <Link href="/" className="hover:text-primary transition-colors">
            {tNav("home")}
          </Link>
          <span>/</span>
          <Link href="/projects" className="hover:text-primary transition-colors">
            {tNav("projects")}
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate max-w-xs sm:max-w-md">
            {project.title[validLocale]}
          </span>
        </nav>

        {/* Header Title & CTA Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-border">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3 w-3" />
              Featured Project
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
              {project.title[validLocale]}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {project.shortDescription[validLocale]}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:opacity-90 hover:shadow-xl hover:shadow-primary/30"
              >
                <ExternalLink className="h-4 w-4" />
                {t("liveDemo")}
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary/50 hover:bg-primary/5 shadow-sm"
              >
                <GithubIcon className="h-4 w-4" />
                {t("sourceCode")}
              </a>
            )}
          </div>
        </div>

        {/* Hero Image Showcase */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border bg-secondary shadow-xl">
          <Image
            src={project.image}
            alt={project.title[validLocale]}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>

        {/* Technologies Grid */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Technologies & Frameworks
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-mono font-medium text-primary shadow-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Full Overview */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Overview
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
            {project.fullDescription[validLocale]}
          </p>
        </div>

        {/* Key Features */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            {t("keyFeatures")}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {project.features[validLocale].map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-xs"
              >
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture Section (Pure UI components, no image) */}
        {project.architecture && project.architecture.length > 0 && (
          <div className="space-y-6 rounded-2xl border border-border bg-secondary/30 p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">
                {t("architecture")}
              </h2>
            </div>

            <div className="flex flex-col items-center gap-0 py-4 max-w-lg mx-auto w-full">
              {project.architecture.map((node, index) => {
                const isNotLast = index < (project.architecture?.length ?? 0) - 1;
                return (
                  <div key={node.label} className="flex flex-col items-center w-full">
                    <div className="w-full rounded-2xl border border-border bg-card p-5 text-center shadow-md transition-all hover:border-primary/50">
                      <p className="text-base font-bold text-foreground font-mono">
                        {node.label}
                      </p>
                      {node.description && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          {node.description[validLocale]}
                        </p>
                      )}
                    </div>
                    {isNotLast && (
                      <div className="flex h-8 items-center">
                        <ChevronDown className="h-5 w-5 text-primary animate-bounce" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Challenges & Solutions */}
        {project.challenges && project.solutions && (
          <div className="grid gap-6 md:grid-cols-2">
            {/* Challenges */}
            <div className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-amber-500 font-bold">
                <AlertTriangle className="h-5 w-5" />
                <h2 className="text-xl text-foreground">
                  {t("challenges")}
                </h2>
              </div>
              <ul className="space-y-3">
                {project.challenges[validLocale].map((c, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-500 font-bold">
                <Lightbulb className="h-5 w-5" />
                <h2 className="text-xl text-foreground">
                  {t("solutions")}
                </h2>
              </div>
              <ul className="space-y-3">
                {project.solutions[validLocale].map((s, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="pt-6 border-t border-border flex items-center justify-between">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToProjects")}
          </Link>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("backToHome")}
          </Link>
        </div>
      </div>
    </article>
  );
}
