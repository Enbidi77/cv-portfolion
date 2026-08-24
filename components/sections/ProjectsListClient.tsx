"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowLeft,
  ExternalLink,
  ArrowRight,
  Layers,
} from "lucide-react";
import Image from "next/image";
import { GithubIcon } from "@/components/ui/brand-icons";
import { Link } from "@/i18n/navigation";
import type { Project, Locale } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectsListClientProps {
  projects: Project[];
  locale: Locale;
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  filterAll: string;
  noProjectsFound: string;
  viewDetails: string;
  liveDemo: string;
  sourceCode: string;
  backToHome: string;
}

export function ProjectsListClient({
  projects,
  locale,
  title,
  subtitle,
  searchPlaceholder,
  filterAll,
  noProjectsFound,
  viewDetails,
  liveDemo,
  sourceCode,
  backToHome,
}: ProjectsListClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTech, setSelectedTech] = useState<string>("all");

  // Extract unique technologies across projects
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((p) => {
      p.technologies.forEach((t) => techSet.add(t));
    });
    return Array.from(techSet).sort();
  }, [projects]);

  // Filter projects by search and tech
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        project.title[locale].toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.shortDescription[locale].toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesTech =
        selectedTech === "all" || project.technologies.includes(selectedTech);

      return matchesSearch && matchesTech;
    });
  }, [projects, locale, searchQuery, selectedTech]);

  return (
    <div className="space-y-12">
      {/* Top Breadcrumb & Heading */}
      <div className="space-y-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {backToHome}
        </Link>

        <div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="gradient-text">{title}</span>
          </h1>
          <p className="mt-2 text-lg text-muted-foreground max-w-3xl">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Controls: Search Bar & Tech Filter Chips */}
      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-xl border border-input bg-card pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
            >
              Clear
            </button>
          )}
        </div>

        {/* Tech Filter Chips */}
        <div className="flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => setSelectedTech("all")}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer",
              selectedTech === "all"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-secondary/70 text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            {filterAll}
          </button>
          {allTechnologies.map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium font-mono transition-all cursor-pointer",
                selectedTech === tech
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary/70 text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:-translate-y-1.5"
            >
              {/* Image Banner */}
              <div className="relative aspect-video w-full bg-secondary overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title[locale]}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-6 space-y-4">
                <div className="space-y-2 flex-1">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title[locale]}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {project.shortDescription[locale]}
                  </p>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                      +{project.technologies.length - 5}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between gap-2 border-t border-border/60 pt-4 mt-auto">
                  <div className="flex items-center gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                        title={liveDemo}
                        aria-label={liveDemo}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                        title={sourceCode}
                        aria-label={sourceCode}
                      >
                        <GithubIcon className="h-4 w-4" />
                      </a>
                    )}
                  </div>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    {viewDetails}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-20 rounded-2xl border border-dashed border-border bg-secondary/20">
          <Layers className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">{noProjectsFound}</p>
        </div>
      )}
    </div>
  );
}
