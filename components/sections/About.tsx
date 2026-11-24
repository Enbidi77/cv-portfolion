"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Sparkles,
  Radio,
  Layers,
  Compass,
  Database,
  Server,
  Layout,
  Zap,
  Cpu,
  Building2,
  MapPin,
  Clock,
  ShieldCheck,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { useTranslations } from "next-intl";

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mb-14 text-center"
    >
      <h2 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
        <span className="gradient-text">{title}</span>
      </h2>
      <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
        {subtitle}
      </p>
    </motion.div>
  );
}

export function About() {
  const t = useTranslations("about");
  const gridRef = useRef(null);
  const isGridInView = useInView(gridRef, { once: true, margin: "-80px" });

  const radarItems = [
    {
      id: "sql",
      icon: Database,
      name: t("bento.radar.items.sql.name"),
      desc: t("bento.radar.items.sql.desc"),
      tag: t("bento.radar.items.sql.tag"),
      color: "text-amber-400 bg-amber-400/10 border-amber-400/20",
      accent: "from-amber-500/20 to-transparent",
    },
    {
      id: "nestjs",
      icon: Server,
      name: t("bento.radar.items.nestjs.name"),
      desc: t("bento.radar.items.nestjs.desc"),
      tag: t("bento.radar.items.nestjs.tag"),
      color: "text-rose-400 bg-rose-400/10 border-rose-400/20",
      accent: "from-rose-500/20 to-transparent",
    },
    {
      id: "nextjs",
      icon: Layout,
      name: t("bento.radar.items.nextjs.name"),
      desc: t("bento.radar.items.nextjs.desc"),
      tag: t("bento.radar.items.nextjs.tag"),
      color: "text-sky-400 bg-sky-400/10 border-sky-400/20",
      accent: "from-sky-500/20 to-transparent",
    },
    {
      id: "redis",
      icon: Zap,
      name: t("bento.radar.items.redis.name"),
      desc: t("bento.radar.items.redis.desc"),
      tag: t("bento.radar.items.redis.tag"),
      color: "text-red-400 bg-red-400/10 border-red-400/20",
      accent: "from-red-500/20 to-transparent",
    },
    {
      id: "ai",
      icon: Cpu,
      name: t("bento.radar.items.ai.name"),
      desc: t("bento.radar.items.ai.desc"),
      tag: t("bento.radar.items.ai.tag"),
      color: "text-purple-400 bg-purple-400/10 border-purple-400/20",
      accent: "from-purple-500/20 to-transparent",
    },
  ];

  const valueItems = [
    {
      id: "clean",
      icon: Layers,
      title: t("bento.values.items.clean.title"),
      desc: t("bento.values.items.clean.desc"),
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      id: "scale",
      icon: Activity,
      title: t("bento.values.items.scale.title"),
      desc: t("bento.values.items.scale.desc"),
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    {
      id: "perf",
      icon: Zap,
      title: t("bento.values.items.perf.title"),
      desc: t("bento.values.items.perf.desc"),
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      id: "realtime",
      icon: Radio,
      title: t("bento.values.items.realtime.title"),
      desc: t("bento.values.items.realtime.desc"),
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
  ];

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute -left-1/3 top-1/3 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="pointer-events-none absolute -right-1/3 bottom-1/4 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-6"
        >
          {/* ================================================================= */}
          {/* TILE 1: Bio & Engineering Philosophy (lg:col-span-7)              */}
          {/* ================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isGridInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative rounded-3xl border border-border/60 bg-gradient-to-br from-card/80 via-card/50 to-primary/5 p-6 sm:p-8 backdrop-blur-md shadow-xl lg:col-span-7 flex flex-col justify-between overflow-hidden hover:border-primary/40 transition-all duration-300"
          >
            {/* Ambient accent corner glow */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-opacity group-hover:opacity-100 opacity-60" />

            <div className="space-y-4">
              {/* Header Badge */}
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span className="text-xs font-mono font-semibold tracking-wider uppercase text-primary">
                  {t("bento.bio.badge")}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {t("bento.bio.heading")}
              </h3>

              {/* Body Paragraphs */}
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                {t("bento.bio.p1")}
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                {t("bento.bio.p2")}
              </p>

              {/* Engineering Quote */}
              <blockquote className="my-3 rounded-2xl border-l-2 border-primary bg-primary/5 px-4 py-3 text-xs sm:text-sm font-mono italic text-foreground/90 backdrop-blur-sm">
                {t("bento.bio.quote")}
              </blockquote>
            </div>

            {/* Philosophy Tags */}
            <div className="mt-5 pt-4 border-t border-border/40 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-mono font-medium text-primary">
                <CheckCircle2 className="h-3 w-3" />
                {t("bento.bio.tagClean")}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-mono font-medium text-blue-400">
                <CheckCircle2 className="h-3 w-3" />
                {t("bento.bio.tagDomain")}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-mono font-medium text-emerald-400">
                <CheckCircle2 className="h-3 w-3" />
                {t("bento.bio.tagZero")}
              </span>
            </div>
          </motion.div>

          {/* ================================================================= */}
          {/* TILE 4: Quick Facts & Location (lg:col-span-5)                    */}
          {/* ================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isGridInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group relative rounded-3xl border border-border/60 bg-card/60 p-6 sm:p-8 backdrop-blur-md shadow-xl lg:col-span-5 flex flex-col justify-between overflow-hidden hover:border-primary/40 transition-all duration-300"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center gap-2.5 mb-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Compass className="h-4 w-4" />
                </div>
                <span className="text-xs font-mono font-semibold tracking-wider uppercase text-emerald-400">
                  {t("bento.facts.badge")}
                </span>
              </div>

              {/* Facts Grid */}
              <div className="grid grid-cols-2 gap-3.5">
                {/* Fact 1: Experience */}
                <div className="rounded-2xl border border-border/50 bg-background/50 p-4 transition-all hover:border-primary/30">
                  <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block">
                    {t("bento.facts.experience")}
                  </span>
                  <div className="mt-1 text-2xl font-extrabold text-foreground tracking-tight">
                    {t("bento.facts.experienceValue")}
                  </div>
                  <span className="text-xs text-muted-foreground block mt-0.5">
                    {t("bento.facts.experienceDesc")}
                  </span>
                </div>

                {/* Fact 2: Current Focus */}
                <div className="rounded-2xl border border-border/50 bg-background/50 p-4 transition-all hover:border-primary/30">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                    <Building2 className="h-3 w-3 text-primary" />
                    <span>{t("bento.facts.role")}</span>
                  </div>
                  <div className="mt-1 text-base font-bold text-foreground leading-snug">
                    {t("bento.facts.roleValue")}
                  </div>
                  <span className="text-xs text-muted-foreground block mt-0.5">
                    {t("bento.facts.roleDesc")}
                  </span>
                </div>

                {/* Fact 3: Location */}
                <div className="rounded-2xl border border-border/50 bg-background/50 p-4 transition-all hover:border-primary/30">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                    <MapPin className="h-3 w-3 text-emerald-400" />
                    <span>{t("bento.facts.location")}</span>
                  </div>
                  <div className="mt-1 text-base font-bold text-foreground">
                    {t("bento.facts.locationValue")}
                  </div>
                  <span className="text-xs text-muted-foreground block mt-0.5">
                    {t("bento.facts.locationDesc")}
                  </span>
                </div>

                {/* Fact 4: Timezone */}
                <div className="rounded-2xl border border-border/50 bg-background/50 p-4 transition-all hover:border-primary/30">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                    <Clock className="h-3 w-3 text-sky-400" />
                    <span>{t("bento.facts.timezone")}</span>
                  </div>
                  <div className="mt-1 text-base font-bold text-foreground">
                    {t("bento.facts.timezoneValue")}
                  </div>
                  <span className="text-xs text-muted-foreground block mt-0.5">
                    {t("bento.facts.timezoneDesc")}
                  </span>
                </div>
              </div>
            </div>

            {/* Live Availability Status */}
            <div className="mt-4 flex items-center justify-between rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-xs backdrop-blur-sm">
              <div className="flex items-center gap-2 font-medium text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{t("bento.facts.statusValue")}</span>
              </div>
              <span className="font-mono text-muted-foreground text-[11px]">
                {t("bento.facts.statusDesc")}
              </span>
            </div>
          </motion.div>

          {/* ================================================================= */}
          {/* TILE 2: Active Tech Radar (lg:col-span-7)                          */}
          {/* ================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isGridInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group relative rounded-3xl border border-border/60 bg-card/60 p-6 sm:p-8 backdrop-blur-md shadow-xl lg:col-span-7 flex flex-col justify-between overflow-hidden hover:border-primary/40 transition-all duration-300"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <Radio className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-semibold tracking-wider uppercase text-primary block">
                      {t("bento.radar.badge")}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                      {t("bento.radar.title")}
                    </h3>
                  </div>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[11px] font-mono text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  PROD ACTIVE
                </span>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                {t("bento.radar.subtitle")}
              </p>

              {/* Radar Stack Items */}
              <div className="space-y-2.5">
                {radarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      className="group/item flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-2xl border border-border/50 bg-background/40 p-3 sm:px-4 sm:py-3 transition-all hover:border-primary/30 hover:bg-background/80"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${item.color}`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-foreground">
                            {item.name}
                          </div>
                          <div className="text-xs text-muted-foreground line-clamp-1">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                      <span className="self-start sm:self-center shrink-0 rounded-lg border border-border/60 bg-muted/30 px-2 py-0.5 text-[11px] font-mono text-muted-foreground">
                        {item.tag}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* ================================================================= */}
          {/* TILE 3: Engineering Values (lg:col-span-5)                        */}
          {/* ================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isGridInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="group relative rounded-3xl border border-border/60 bg-gradient-to-br from-card/80 via-card/50 to-primary/5 p-6 sm:p-8 backdrop-blur-md shadow-xl lg:col-span-5 flex flex-col justify-between overflow-hidden hover:border-primary/40 transition-all duration-300"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center gap-2.5 mb-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <span className="text-xs font-mono font-semibold tracking-wider uppercase text-blue-400">
                  {t("bento.values.badge")}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground mb-1">
                {t("bento.values.title")}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                {t("bento.values.subtitle")}
              </p>

              {/* 4 Values Cards */}
              <div className="space-y-3">
                {valueItems.map((val) => {
                  const Icon = val.icon;
                  return (
                    <div
                      key={val.id}
                      className="rounded-2xl border border-border/50 bg-background/50 p-3.5 transition-all hover:border-primary/30 hover:bg-background/80"
                    >
                      <div className="flex items-center gap-2.5 mb-1">
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-lg border ${val.color}`}
                        >
                          <Icon className="h-3 w-3" />
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-foreground">
                          {val.title}
                        </h4>
                      </div>
                      <p className="text-xs leading-relaxed text-muted-foreground pl-8">
                        {val.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
