"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  FileCode2,
  Server,
  Layout,
  Database,
  Cloud,
  Radio,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { skillCategories } from "@/data/skills";
import type { SkillCategory, SkillLevel, Locale } from "@/types";
import { cn } from "@/lib/utils";

const categoryIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  "file-code-2": FileCode2,
  server: Server,
  layout: Layout,
  database: Database,
  cloud: Cloud,
  radio: Radio,
};

const levelColors: Record<SkillLevel, string> = {
  beginner: "bg-blue-400/20 text-blue-400",
  intermediate: "bg-amber-400/20 text-amber-400",
  advanced: "bg-emerald-400/20 text-emerald-400",
  expert: "bg-primary/20 text-primary",
};

function SkillCard({
  category,
  index,
  isSelected,
  onSelect,
  locale,
  countLabel,
}: {
  category: SkillCategory;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  locale: Locale;
  countLabel: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = categoryIcons[category.icon];

  return (
    <motion.button
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={onSelect}
      className={cn(
        "group relative w-full rounded-2xl border p-6 text-left transition-all duration-300 hover:-translate-y-1 cursor-pointer",
        isSelected
          ? "border-primary/50 bg-primary/5 shadow-lg shadow-primary/10"
          : "border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
      )}
    >
      <div className="mb-4 flex items-center gap-3">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
            isSelected ? "bg-primary/15 text-primary" : "bg-primary/10 text-primary"
          )}
        >
          {Icon && <Icon className="h-5 w-5" />}
        </div>
        <div>
          <h3 className="text-sm font-bold text-foreground">{category.name[locale]}</h3>
          <p className="text-xs text-muted-foreground">
            {countLabel}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill.name}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all",
              isSelected
                ? "bg-primary/10 text-primary"
                : "bg-secondary text-muted-foreground group-hover:bg-primary/5 group-hover:text-foreground"
            )}
          >
            {skill.name}
          </span>
        ))}
      </div>
    </motion.button>
  );
}

function SkillDetail({
  category,
  locale,
  levelsMap,
}: {
  category: SkillCategory;
  locale: Locale;
  levelsMap: Record<SkillLevel, string>;
}) {
  return (
    <motion.div
      key={category.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-border bg-card p-6 lg:p-8 shadow-sm"
    >
      <h3 className="mb-6 text-xl font-bold text-foreground">
        {category.name[locale]}
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {category.skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center justify-between rounded-xl border border-border bg-secondary/30 px-4 py-3 transition-all hover:border-primary/20 hover:bg-primary/5"
          >
            <span className="text-sm font-medium text-foreground font-mono">
              {skill.name}
            </span>
            {skill.level && (
              <span
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-xs font-medium",
                  levelColors[skill.level]
                )}
              >
                {levelsMap[skill.level]}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function Skills() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const t = useTranslations("skills");
  const locale = useLocale() as Locale;
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, {
    once: true,
    margin: "-100px",
  });

  const levelsMap: Record<SkillLevel, string> = {
    beginner: t("levels.beginner"),
    intermediate: t("levels.intermediate"),
    advanced: t("levels.advanced"),
    expert: t("levels.expert"),
  };

  return (
    <section id="skills" className="section-padding">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Category cards */}
          <div className="lg:col-span-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((cat, i) => (
              <SkillCard
                key={cat.id}
                category={cat}
                index={i}
                isSelected={selectedIndex === i}
                onSelect={() => setSelectedIndex(i)}
                locale={locale}
                countLabel={t("technologiesCount", { count: cat.skills.length })}
              />
            ))}
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <SkillDetail
                category={skillCategories[selectedIndex]}
                locale={locale}
                levelsMap={levelsMap}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
