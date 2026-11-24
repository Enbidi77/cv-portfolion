"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Mail,
  ChevronDown,
  Play,
  Copy,
  Check,
  FileCode,
  Braces,
  Terminal,
  GitBranch,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { GithubIcon } from "@/components/ui/brand-icons";
import { personalInfo, socialLinks } from "@/data/personal";
import type { Locale } from "@/types";

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  github: GithubIcon,
  mail: Mail,
};

const staticParticles = [
  { width: 4.2, height: 4.2, left: 12, top: 18, x: 8, duration: 6.5, delay: 0.2 },
  { width: 3.5, height: 3.5, left: 28, top: 72, x: -6, duration: 7.2, delay: 1.1 },
  { width: 5.1, height: 5.1, left: 45, top: 34, x: 10, duration: 5.8, delay: 2.4 },
  { width: 2.8, height: 2.8, left: 62, top: 85, x: -8, duration: 6.9, delay: 0.7 },
  { width: 4.6, height: 4.6, left: 78, top: 22, x: 5, duration: 7.5, delay: 1.8 },
  { width: 3.2, height: 3.2, left: 89, top: 64, x: -7, duration: 5.4, delay: 2.1 },
  { width: 5.5, height: 5.5, left: 15, top: 52, x: 9, duration: 6.1, delay: 0.5 },
  { width: 2.5, height: 2.5, left: 35, top: 15, x: -5, duration: 7.8, delay: 1.5 },
  { width: 4.0, height: 4.0, left: 55, top: 90, x: 6, duration: 5.9, delay: 2.7 },
  { width: 3.8, height: 3.8, left: 72, top: 48, x: -9, duration: 6.7, delay: 0.9 },
  { width: 4.8, height: 4.8, left: 82, top: 78, x: 7, duration: 7.1, delay: 1.3 },
  { width: 3.0, height: 3.0, left: 22, top: 88, x: -4, duration: 5.6, delay: 2.0 },
  { width: 5.2, height: 5.2, left: 93, top: 12, x: 8, duration: 6.4, delay: 0.4 },
  { width: 2.7, height: 2.7, left: 8, top: 40, x: -6, duration: 7.9, delay: 1.7 },
  { width: 4.4, height: 4.4, left: 40, top: 60, x: 5, duration: 6.3, delay: 2.5 },
  { width: 3.6, height: 3.6, left: 68, top: 10, x: -8, duration: 7.0, delay: 0.8 },
  { width: 5.0, height: 5.0, left: 85, top: 42, x: 7, duration: 5.7, delay: 1.9 },
  { width: 2.9, height: 2.9, left: 30, top: 95, x: -5, duration: 6.8, delay: 2.2 },
  { width: 4.5, height: 4.5, left: 50, top: 5, x: 6, duration: 7.4, delay: 0.6 },
  { width: 3.3, height: 3.3, left: 95, top: 55, x: -7, duration: 5.5, delay: 1.4 },
];

function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {staticParticles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/10"
          style={{
            width: p.width,
            height: p.height,
            left: `${p.left}%`,
            top: `${p.top}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, p.x, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

type TabKey = "profile" | "stack" | "status";

const tabsConfig: {
  key: TabKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeColor: string;
}[] = [
  { key: "profile", label: "Profile.ts", icon: FileCode, badgeColor: "text-blue-400" },
  { key: "stack", label: "Stack.json", icon: Braces, badgeColor: "text-amber-400" },
  { key: "status", label: "Status.log", icon: Terminal, badgeColor: "text-emerald-400" },
];

function CodeVisual({
  role,
  passion,
}: {
  role: string;
  passion: string;
}) {
  const [activeTab, setActiveTab] = useState<TabKey>("profile");

  const profileLines = [
    { indent: 0, text: "export const developer: FullstackEngineer = {", color: "text-blue-400" },
    { indent: 1, text: `name: "${personalInfo.name}",`, color: "text-emerald-400" },
    { indent: 1, text: `role: "${role}",`, color: "text-emerald-400" },
    { indent: 1, text: 'location: "Vietnam (Remote / Hybrid)",', color: "text-amber-300" },
    { indent: 1, text: 'experience: "2+ Years in Production",', color: "text-teal-300" },
    { indent: 1, text: "architecture: [", color: "text-blue-400" },
    { indent: 2, text: '"Enterprise ERP Systems",', color: "text-sky-300" },
    { indent: 2, text: '"High-Throughput Microservices",', color: "text-sky-300" },
    { indent: 2, text: '"Sub-100ms API Optimization"', color: "text-sky-300" },
    { indent: 1, text: "],", color: "text-blue-400" },
    { indent: 1, text: `passion: "${passion}",`, color: "text-purple-400" },
    { indent: 1, text: "availableForHire: true,", color: "text-rose-400 font-semibold" },
    { indent: 0, text: "};", color: "text-blue-400" },
  ];

  const stackJsonLines = [
    { indent: 0, text: "{", color: "text-muted-foreground" },
    { indent: 1, text: '"runtime": ["TypeScript", "Java 21", "C# .NET 8"],', color: "text-sky-400" },
    { indent: 1, text: '"backend": {', color: "text-blue-400" },
    { indent: 2, text: '"frameworks": ["NestJS", "Spring Boot", "ASP.NET Core"],', color: "text-emerald-400" },
    { indent: 2, text: '"databases": ["SQL Server (Stored Procs)", "PostgreSQL"],', color: "text-amber-400" },
    { indent: 2, text: '"messaging": ["Redis Pub/Sub", "AWS SQS", "WebSockets"]', color: "text-purple-400" },
    { indent: 1, text: "},", color: "text-blue-400" },
    { indent: 1, text: '"frontend": ["Next.js 16", "React 19", "Tailwind CSS 4"],', color: "text-cyan-400" },
    { indent: 1, text: '"infrastructure": ["Docker", "Azure VMs", "AWS SES/Lambda"],', color: "text-teal-400" },
    { indent: 1, text: '"practices": ["Clean Architecture", "Query Tuning", "CI/CD"]', color: "text-indigo-400" },
    { indent: 0, text: "}", color: "text-muted-foreground" },
  ];

  const activeTechPills = [
    { name: "SQL Server (SPs)", color: "border-amber-500/30 bg-amber-500/10 text-amber-300" },
    { name: "NestJS Microservices", color: "border-rose-500/30 bg-rose-500/10 text-rose-300" },
    { name: "Next.js 16 / React 19", color: "border-sky-500/30 bg-sky-500/10 text-sky-300" },
    { name: "Redis Pub/Sub", color: "border-red-500/30 bg-red-500/10 text-red-300" },
    { name: "Spring Boot", color: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" },
    { name: "AI Tooling", color: "border-purple-500/30 bg-purple-500/10 text-purple-300" },
  ];

  const statusLogs = [
    { time: "09:00:12", level: "SYS", text: "Runtime initialized with Node.js & .NET", color: "text-blue-400" },
    { time: "09:00:13", level: "INFO", text: "Enterprise ERP: Maintenance & stored procedures active", color: "text-emerald-400" },
    { time: "09:00:14", level: "PERF", text: "SQL Server query execution plan optimized (-42% I/O)", color: "text-amber-400" },
    { time: "09:00:15", level: "EVENT", text: "NestJS microservice WebSocket gateway connected", color: "text-cyan-400" },
    { time: "09:00:16", level: "METRIC", text: "Health check: 100% UP | API avg response latency: 32ms", color: "text-emerald-400" },
    { time: "LIVE NOW", level: "LIVE", text: "Available for High-Impact Fullstack / Backend Roles", color: "text-primary font-semibold" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="hidden lg:block relative"
    >
      <div className="relative rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md shadow-2xl overflow-hidden">
        {/* Mini-IDE Window Chrome & Tab Bar */}
        <div className="flex items-center justify-between border-b border-border/50 bg-muted/40 px-4 py-2.5">
          {/* macOS window dots */}
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400/80 transition-opacity hover:opacity-100" />
            <span className="h-3 w-3 rounded-full bg-amber-400/80 transition-opacity hover:opacity-100" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/80 transition-opacity hover:opacity-100" />
            <span className="ml-2 text-[11px] font-mono text-muted-foreground/50 hidden xl:inline">
              duy-ide ~ /src/core
            </span>
          </div>

          {/* Interactive Clickable Tabs */}
          <div className="flex items-center gap-1">
            {tabsConfig.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-mono transition-all cursor-pointer ${
                    isActive
                      ? "bg-card text-foreground shadow-sm border border-border/70 font-medium"
                      : "text-muted-foreground/70 hover:bg-card/40 hover:text-foreground"
                  }`}
                  aria-label={`Switch to ${tab.label}`}
                >
                  <TabIcon className={`h-3.5 w-3.5 ${tab.badgeColor}`} />
                  <span>{tab.label}</span>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse ml-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Panes */}
        <div className="p-5 font-mono text-xs sm:text-sm min-h-[340px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {activeTab === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-1.5"
              >
                {profileLines.map((line, i) => (
                  <div key={i} className="flex items-center leading-relaxed">
                    <span className="mr-3 w-5 text-right text-xs text-muted-foreground/35 select-none font-mono">
                      {i + 1}
                    </span>
                    <span style={{ paddingLeft: `${line.indent * 1.25}rem` }}>
                      <span className={line.color}>{line.text}</span>
                    </span>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "stack" && (
              <motion.div
                key="stack"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                <div className="space-y-1">
                  {stackJsonLines.map((line, i) => (
                    <div key={i} className="flex items-center leading-relaxed">
                      <span className="mr-3 w-5 text-right text-xs text-muted-foreground/35 select-none font-mono">
                        {i + 1}
                      </span>
                      <span style={{ paddingLeft: `${line.indent * 1.25}rem` }}>
                        <span className={line.color}>{line.text}</span>
                      </span>
                    </div>
                  ))}
                </div>

                {/* Visual Active Stack Pills */}
                <div className="pt-2 border-t border-border/40">
                  <div className="text-[11px] text-muted-foreground mb-1.5 font-sans font-medium">
                    Active Production Highlights:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeTechPills.map((pill) => (
                      <span
                        key={pill.name}
                        className={`rounded-md border px-2 py-0.5 text-[11px] font-mono ${pill.color}`}
                      >
                        {pill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "status" && (
              <motion.div
                key="status"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-2 font-mono text-xs"
              >
                <div className="flex items-center justify-between pb-2 border-b border-border/40 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE ENTERPRISE MONITOR
                  </span>
                  <span>LATENCY: 32ms</span>
                </div>

                <div className="space-y-2 pt-1">
                  {statusLogs.map((log, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 rounded-md bg-muted/20 p-1.5 transition-colors hover:bg-muted/40"
                    >
                      <span className="text-muted-foreground/50 select-none text-[11px]">
                        [{log.time}]
                      </span>
                      <span className="rounded bg-primary/10 px-1 py-0.2 text-[10px] font-bold text-primary">
                        {log.level}
                      </span>
                      <span className={`flex-1 ${log.color}`}>{log.text}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground">
                  <span className="text-emerald-400">$</span>
                  <span>ready for deployment</span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                    className="inline-block h-3.5 w-1.5 bg-primary"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* IDE Footer: Status Bar + Terminal Run Showreel Action */}
          <div className="mt-4 pt-3 border-t border-border/40 flex flex-col gap-2">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground/60 font-mono">
              <span className="flex items-center gap-1.5">
                <GitBranch className="h-3 w-3 text-primary/70" />
                <span>main*</span>
                <span className="ml-2 text-emerald-400/80">0 errors</span>
              </span>
              <span>UTF-8 • {activeTab.toUpperCase()}</span>
            </div>

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("showreel");
                if (el) {
                  const offset = 80;
                  const top = el.getBoundingClientRect().top + window.scrollY - offset;
                  window.scrollTo({ top, behavior: "smooth" });
                  setTimeout(() => {
                    window.dispatchEvent(new CustomEvent("play-showreel"));
                  }, 600);
                }
              }}
              className="flex w-full items-center justify-between rounded-xl border border-primary/20 bg-primary/5 px-3.5 py-2 text-xs font-mono text-primary transition-all hover:border-primary/50 hover:bg-primary/10 cursor-pointer shadow-sm group"
            >
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-muted-foreground">$</span>
                <span className="group-hover:text-foreground transition-colors">
                  developer.playShowreel()
                </span>
              </span>
              <span className="flex items-center gap-1.5 font-medium text-primary">
                <Play className="h-3 w-3 fill-primary group-hover:scale-110 transition-transform" />
                <span>01:05 MP4</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Ambient background glow */}
      <div className="absolute -inset-4 -z-10 rounded-3xl bg-primary/10 blur-2xl" />
    </motion.div>
  );
}

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale() as Locale;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg" />
      <FloatingParticles />

      {/* Gradient orbs */}
      <div className="pointer-events-none absolute -left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/8 blur-[100px]" />
      <div className="pointer-events-none absolute -right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-blue-500/8 blur-[100px]" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left content */}
          <div className="relative z-10 space-y-8">
            {/* Badges & 1-Click Copy Email Pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-3"
            >
              {/* Availability Badge */}
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary shadow-sm backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                {t("availableBadge")}
              </span>

              {/* Sleek 1-Click Copy Email Pill */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className="group relative inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/60 px-3.5 py-1.5 text-xs font-mono text-muted-foreground backdrop-blur-md transition-all hover:border-primary/50 hover:bg-card hover:text-foreground hover:shadow-sm active:scale-95 cursor-pointer"
                aria-label="Copy email address"
                title={copied ? t("copiedFeedback") : t("clickToCopy")}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span
                      key="copied"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                      className="inline-flex items-center gap-1.5 font-medium text-emerald-400"
                    >
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span>{t("copiedFeedback")}</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                      className="inline-flex items-center gap-1.5"
                    >
                      <Copy className="h-3.5 w-3.5 text-primary/70 transition-colors group-hover:text-primary" />
                      <span className="select-all">{personalInfo.email}</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>

            {/* Name & Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-2"
            >
              <p className="text-lg text-muted-foreground sm:text-xl">
                {t("greeting")}
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="gradient-text font-mono">{personalInfo.name}</span>
              </h1>
              <h2 className="text-xl font-medium text-muted-foreground sm:text-2xl md:text-3xl">
                {personalInfo.title[locale] || t("role")}
              </h2>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {personalInfo.tagline[locale] || t("tagline")}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col gap-3.5 sm:flex-row sm:flex-wrap"
            >
              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                {t("viewProjects")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("showreel");
                  if (el) {
                    const offset = 80;
                    const top = el.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top, behavior: "smooth" });
                    setTimeout(() => {
                      window.dispatchEvent(new CustomEvent("play-showreel"));
                    }, 600);
                  }
                }}
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl border border-primary/30 bg-primary/10 px-5 py-3 text-sm font-semibold text-primary backdrop-blur-sm transition-all hover:border-primary/60 hover:bg-primary/20 hover:shadow-lg hover:shadow-primary/15 hover:-translate-y-0.5 cursor-pointer"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 transition-transform group-hover:scale-110">
                  <Play className="h-2.5 w-2.5 fill-primary text-primary ml-0.5" />
                </span>
                {t("watchShowreel")}
                <span className="rounded-md bg-primary/20 px-1.5 py-0.5 text-xs font-mono font-medium">
                  01:05
                </span>
              </button>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card/50 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-primary/5 hover:-translate-y-0.5"
              >
                <Mail className="h-4 w-4" />
                {t("contactMe")}
              </a>
            </motion.div>

            {/* Social Links & Quick Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-4 pt-2"
            >
              <span className="text-sm text-muted-foreground">{t("findMeOn")}</span>
              <div className="flex gap-2">
                {socialLinks.map((link) => {
                  const Icon = socialIcons[link.icon];
                  return (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all hover:border-primary/50 hover:text-primary hover:shadow-md hover:shadow-primary/10 hover:-translate-y-0.5"
                      aria-label={link.name}
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right visual - Interactive Mini-IDE */}
          <CodeVisual
            role={t("codeVisual.role")}
            passion={t("codeVisual.passion")}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <a
          href="#showreel"
          className="flex flex-col items-center gap-2 text-muted-foreground/50 transition-colors hover:text-muted-foreground"
          aria-label={t("scroll")}
        >
          <span className="text-xs uppercase tracking-widest">{t("scroll")}</span>
          <ChevronDown className="h-4 w-4" />
        </a>
      </motion.div>
    </section>
  );
}
