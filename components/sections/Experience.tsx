"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar, CircleDot, Sparkles, TrendingUp } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { experiences } from "@/data/experience";
import type { Experience as ExperienceType, Locale } from "@/types";

function TimelineItem({
  experience,
  index,
  locale,
  currentBadgeLabel,
}: {
  experience: ExperienceType;
  index: number;
  locale: Locale;
  currentBadgeLabel: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const monogramGradients: Record<string, string> = {
    ERP: "from-blue-500/20 via-indigo-500/15 to-purple-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
    TPS: "from-emerald-500/20 via-teal-500/15 to-cyan-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  };

  const gradientClass =
    (experience.monogram && monogramGradients[experience.monogram]) ||
    "from-primary/20 via-primary/10 to-primary/5 text-primary border-primary/25";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative pl-8 md:pl-12"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-1.5 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background md:left-2">
        {experience.isCurrent ? (
          <motion.div
            className="h-3 w-3 rounded-full bg-primary"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        ) : (
          <CircleDot className="h-4 w-4 text-primary" />
        )}
      </div>

      {/* Card */}
      <div className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
        {/* Header with Monogram Badge */}
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3.5">
            {/* Company Monogram Badge with subtle gradient */}
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br font-mono text-sm font-bold tracking-wider shadow-xs border ${gradientClass}`}
            >
              {experience.monogram || experience.company.slice(0, 3).toUpperCase()}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-bold text-foreground">
                  {experience.company}
                </h3>
                {experience.isCurrent && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {currentBadgeLabel}
                  </span>
                )}
              </div>
              <p className="flex items-center gap-1.5 text-sm font-medium text-primary mt-1">
                <Briefcase className="h-3.5 w-3.5" />
                {experience.role[locale]}
              </p>
            </div>
          </div>

          <p className="flex items-center gap-1.5 whitespace-nowrap text-xs font-medium text-muted-foreground sm:text-sm self-start sm:self-auto rounded-lg bg-secondary/60 px-2.5 py-1 sm:bg-transparent sm:p-0">
            <Calendar className="h-3.5 w-3.5" />
            {experience.period[locale]}
          </p>
        </div>

        {/* Measurable Impact Badges */}
        {experience.impactBadges && (
          <div className="mb-5 flex flex-wrap gap-2">
            {experience.impactBadges[locale].map((badge, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary transition-colors hover:border-primary/50 hover:bg-primary/10 dark:bg-primary/10"
              >
                <TrendingUp className="h-3 w-3 text-primary shrink-0" />
                <span>{badge}</span>
              </span>
            ))}
          </div>
        )}

        {/* Responsibilities */}
        <div className="space-y-2">
          <ul className="space-y-2">
            {experience.responsibilities[locale].map((resp, i) => (
              <li
                key={i}
                className="flex gap-3 text-sm text-muted-foreground leading-relaxed"
              >
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/60" />
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Role-specific Technology Stack Tags */}
        {experience.technologies && experience.technologies.length > 0 && (
          <div className="mt-5 pt-4 border-t border-border/60">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-medium text-muted-foreground mr-1.5">
                Tech Stack:
              </span>
              {experience.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-border/80 bg-secondary/50 px-2.5 py-0.5 text-xs font-mono text-foreground/80 transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function Experience() {
  const t = useTranslations("experience");
  const locale = useLocale() as Locale;
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, {
    once: true,
    margin: "-100px",
  });

  return (
    <section id="experience" className="section-padding bg-secondary/30">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
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
            Career Milestones
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="gradient-text">{t("title")}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative space-y-8">
          {/* Vertical line */}
          <div className="absolute left-[15px] top-0 h-full w-px bg-border md:left-[23px]" />

          {experiences.map((exp, index) => (
            <TimelineItem
              key={exp.id}
              experience={exp}
              index={index}
              locale={locale}
              currentBadgeLabel={t("currentBadge")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
