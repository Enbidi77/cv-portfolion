"use client";

import { useRef, useState, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  X,
  ArrowRight,
  Sparkles,
  Layers,
  Cpu,
  Radio,
  Building2,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { ArchitectureFlow } from "@/components/sections/ArchitectureFlow";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { projects } from "@/data/projects";
import { Link } from "@/i18n/navigation";
import type { Project, Locale, ProjectCategory } from "@/types";
import { cn } from "@/lib/utils";

const CATEGORY_TABS: {
  id: ProjectCategory;
  label: { en: string; vi: string };
  icon: typeof Layers;
}[] = [
  {
    id: "all",
    label: { en: "All", vi: "Tất cả" },
    icon: Layers,
  },
  {
    id: "fullstack",
    label: {
      en: "Fullstack & Microservices",
      vi: "Fullstack & Microservices",
    },
    icon: Cpu,
  },
  {
    id: "realtime",
    label: {
      en: "Real-Time Systems",
      vi: "Hệ thống thời gian thực",
    },
    icon: Radio,
  },
  {
    id: "enterprise",
    label: {
      en: "Enterprise & ERP",
      vi: "Doanh nghiệp & ERP",
    },
    icon: Building2,
  },
];

function ProjectModal({
  project,
  onClose,
  locale,
  t,
}: {
  project: Project;
  onClose: () => void;
  locale: Locale;
  t: ReturnType<typeof useTranslations<"projects">>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/80 text-muted-foreground backdrop-blur-xs transition-colors hover:bg-destructive hover:text-destructive-foreground cursor-pointer"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Browser Mockup Header */}
        <BrowserFrame
          url={project.previewUrl || project.liveUrl || `https://${project.slug}.vercel.app`}
          externalUrl={project.liveUrl}
          className="rounded-t-2xl border-0 border-b border-border shadow-none"
        >
          <div className="relative aspect-video w-full overflow-hidden bg-secondary">
            <Image
              src={project.image}
              alt={project.title[locale]}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          </div>
        </BrowserFrame>

        <div className="space-y-6 p-6 lg:p-8">
          {/* Title & Description */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h3 className="text-2xl font-bold text-foreground">
                {project.title[locale]}
              </h3>
              {project.category && (
                <span className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-xs font-mono font-medium text-primary capitalize">
                  {project.category}
                </span>
              )}
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {project.fullDescription[locale]}
            </p>
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-lg bg-primary/10 px-3 py-1 text-xs font-medium text-primary font-mono"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Features */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">
              {t("keyFeatures")}
            </h4>
            <ul className="grid gap-2 sm:grid-cols-2">
              {project.features[locale].map((feature, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/60" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Upgraded Connected Architecture Diagram */}
          {project.architecture && (
            <div className="rounded-xl border border-border/70 bg-secondary/20 p-4 sm:p-5">
              <ArchitectureFlow
                nodes={project.architecture}
                locale={locale}
                heading={t("architecture")}
              />
            </div>
          )}

          {/* Challenges & Solutions */}
          {project.challenges && project.solutions && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h4 className="mb-3 text-sm font-semibold text-foreground">
                  {t("challenges")}
                </h4>
                <ul className="space-y-2">
                  {project.challenges[locale].map((c, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400/60" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-3 text-sm font-semibold text-foreground">
                  {t("solutions")}
                </h4>
                <ul className="space-y-2">
                  {project.solutions[locale].map((s, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400/60" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
            <div className="flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 hover:shadow-lg hover:shadow-primary/25"
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
                  className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:bg-primary/5"
                >
                  <GithubIcon className="h-4 w-4" />
                  {t("sourceCode")}
                </a>
              )}
            </div>

            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              {t("viewProject")} page
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
  locale,
  t,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
  locale: Locale;
  t: ReturnType<typeof useTranslations<"projects">>;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const previewUrl =
    project.previewUrl ||
    project.liveUrl ||
    `https://${project.slug}.vercel.app`;

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group cursor-pointer flex flex-col"
      onClick={onOpen}
    >
      <div className="relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1.5">
        {/* Modern Browser Frame Mockup */}
        <BrowserFrame
          url={previewUrl}
          externalUrl={project.liveUrl}
          className="rounded-t-2xl border-0 border-b border-border/80 shadow-none"
        >
          <div className="relative aspect-video w-full overflow-hidden bg-secondary">
            <Image
              src={project.image}
              alt={project.title[locale]}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/85 via-card/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Hover overlay actions */}
            <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110"
                  aria-label={t("liveDemo")}
                  title={t("liveDemo")}
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-foreground border border-border shadow-lg transition-transform hover:scale-110"
                  aria-label={t("sourceCode")}
                  title={t("sourceCode")}
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </BrowserFrame>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {project.title[locale]}
            </h3>
            {project.category && (
              <span className="shrink-0 rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 font-mono text-[10px] font-medium text-primary">
                {project.category}
              </span>
            )}
          </div>

          <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2 flex-1">
            {project.shortDescription[locale]}
          </p>

          {/* Tech tags */}
          <div className="mb-4 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-secondary/80 px-2 py-0.5 text-xs text-muted-foreground font-mono"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="rounded-md bg-secondary/80 px-2 py-0.5 text-xs text-muted-foreground">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* View details footer */}
          <div className="flex items-center justify-between text-sm font-medium text-primary pt-3 border-t border-border/50 mt-auto">
            <span className="flex items-center gap-1">
              {t("viewDetails")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="text-xs text-muted-foreground font-normal font-mono">
              /{project.slug}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const t = useTranslations("projects");
  const locale = useLocale() as Locale;
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, {
    once: true,
    margin: "-100px",
  });

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter(
      (p) =>
        p.category === activeCategory ||
        (p.categories && p.categories.includes(activeCategory))
    );
  }, [activeCategory]);

  return (
    <section id="projects" className="section-padding bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-medium text-primary mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Portfolio Highlights
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="gradient-text">{t("title")}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            {t("subtitle")}
          </p>

          {/* Category Filter Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {CATEGORY_TABS.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeCategory === tab.id;
              const count =
                tab.id === "all"
                  ? projects.length
                  : projects.filter(
                      (p) =>
                        p.category === tab.id ||
                        p.categories?.includes(tab.id)
                    ).length;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={cn(
                    "relative flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer",
                    isActive
                      ? "text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/70 border border-border/60 bg-card/60"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-category-pill"
                      className="absolute inset-0 rounded-xl bg-primary"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <TabIcon className="h-3.5 w-3.5" />
                    <span>{tab.label[locale] || tab.label.en}</span>
                    <span
                      className={cn(
                        "ml-0.5 rounded-full px-1.5 py-0.2 text-[10px] font-mono",
                        isActive
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-secondary text-muted-foreground"
                      )}
                    >
                      {count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Projects grid with layout transitions */}
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                locale={locale}
                t={t}
                onOpen={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA to dedicated /projects page */}
        <div className="mt-14 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-xl bg-card border border-border px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-all hover:border-primary/40 hover:bg-primary/5 hover:-translate-y-0.5"
          >
            {t("allProjects")}
            <ArrowRight className="h-4 w-4 text-primary" />
          </Link>
        </div>
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            locale={locale}
            t={t}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
