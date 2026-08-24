"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  X,
  ArrowRight,
  ChevronDown,
  Layers,
  Sparkles,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { projects } from "@/data/projects";
import { Link } from "@/i18n/navigation";
import type { Project, Locale } from "@/types";

function ArchitectureDiagram({
  nodes,
  locale,
  heading,
}: {
  nodes: NonNullable<Project["architecture"]>;
  locale: Locale;
  heading: string;
}) {
  return (
    <div className="space-y-3">
      <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Layers className="h-4 w-4 text-primary" />
        {heading}
      </h4>
      <div className="flex flex-col items-center gap-0">
        {nodes.map((node, i) => (
          <div key={node.label} className="flex flex-col items-center w-full max-w-sm">
            <div className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-center transition-all hover:border-primary/30 shadow-sm">
              <p className="text-sm font-semibold text-foreground font-mono">
                {node.label}
              </p>
              {node.description && (
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {node.description[locale]}
                </p>
              )}
            </div>
            {i < nodes.length - 1 && (
              <div className="flex h-6 items-center">
                <ChevronDown className="h-4 w-4 text-primary/70 animate-bounce" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

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
        className="relative z-10 max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-destructive hover:text-destructive-foreground cursor-pointer"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-secondary">
          <Image
            src={project.image}
            alt={project.title[locale]}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        </div>

        <div className="space-y-6 p-6 lg:p-8">
          {/* Title */}
          <div>
            <h3 className="mb-2 text-2xl font-bold text-foreground">
              {project.title[locale]}
            </h3>
            <p className="text-muted-foreground leading-relaxed">{project.fullDescription[locale]}</p>
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

          {/* Architecture */}
          {project.architecture && (
            <ArchitectureDiagram
              nodes={project.architecture}
              locale={locale}
              heading={t("architecture")}
            />
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={onOpen}
    >
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden bg-secondary">
          <Image
            src={project.image}
            alt={project.title[locale]}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

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
                className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-foreground shadow-lg transition-transform hover:scale-110"
                aria-label={t("sourceCode")}
              >
                <GithubIcon className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="mb-2 text-lg font-bold text-foreground group-hover:text-primary transition-colors">
            {project.title[locale]}
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {project.shortDescription[locale]}
          </p>

          {/* Tech tags */}
          <div className="mb-4 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground font-mono"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* View details */}
          <div className="flex items-center justify-between text-sm font-medium text-primary pt-2 border-t border-border/50">
            <span className="flex items-center gap-1">
              {t("viewDetails")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="text-xs text-muted-foreground font-normal">
              Slug: /{project.slug}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const t = useTranslations("projects");
  const locale = useLocale() as Locale;
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, {
    once: true,
    margin: "-100px",
  });

  return (
    <section id="projects" className="section-padding bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
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
        </motion.div>

        {/* Projects grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              locale={locale}
              t={t}
              onOpen={() => setSelectedProject(project)}
            />
          ))}
        </div>

        {/* Bottom CTA to dedicated /projects page */}
        <div className="mt-12 text-center">
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
