"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar, CircleDot } from "lucide-react";
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative pl-8 md:pl-12"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background md:left-2">
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
      <div className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        {/* Header */}
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-foreground">
                {experience.company}
              </h3>
              {experience.isCurrent && (
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-500">
                  {currentBadgeLabel}
                </span>
              )}
            </div>
            <p className="flex items-center gap-1.5 text-sm text-primary font-medium mt-0.5">
              <Briefcase className="h-3.5 w-3.5" />
              {experience.role[locale]}
            </p>
          </div>
          <p className="flex items-center gap-1.5 whitespace-nowrap text-sm text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            {experience.period[locale]}
          </p>
        </div>

        {/* Responsibilities */}
        <ul className="space-y-2">
          {experience.responsibilities[locale].map((resp, i) => (
            <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/60" />
              <span>{resp}</span>
            </li>
          ))}
        </ul>
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
          <div className="absolute left-[15px] top-0 h-full w-px bg-border md:left-[25px]" />

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
