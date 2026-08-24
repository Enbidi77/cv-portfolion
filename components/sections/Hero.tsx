"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, ChevronDown } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { GithubIcon } from "@/components/ui/brand-icons";
import { personalInfo, socialLinks } from "@/data/personal";
import type { Locale } from "@/types";

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> =
  {
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

function CodeVisual({ role, passion }: { role: string; passion: string }) {
  const lines = [
    { indent: 0, text: "const developer = {", color: "text-blue-400" },
    {
      indent: 1,
      text: 'name: "Nguyen Bao Duy",',
      color: "text-emerald-400",
    },
    {
      indent: 1,
      text: `role: "${role}",`,
      color: "text-emerald-400",
    },
    {
      indent: 1,
      text: "skills: [",
      color: "text-blue-400",
    },
    {
      indent: 2,
      text: '"TypeScript", "Java", "C#",',
      color: "text-amber-400",
    },
    {
      indent: 2,
      text: '"NestJS", "Spring Boot",',
      color: "text-amber-400",
    },
    {
      indent: 2,
      text: '"React", "Next.js", "Angular"',
      color: "text-amber-400",
    },
    { indent: 1, text: "],", color: "text-blue-400" },
    {
      indent: 1,
      text: `passion: "${passion}"`,
      color: "text-purple-400",
    },
    { indent: 0, text: "};", color: "text-blue-400" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="hidden lg:block relative"
    >
      <div className="relative rounded-2xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm shadow-xl">
        {/* Window dots */}
        <div className="mb-4 flex gap-2">
          <div className="h-3 w-3 rounded-full bg-red-400/60" />
          <div className="h-3 w-3 rounded-full bg-amber-400/60" />
          <div className="h-3 w-3 rounded-full bg-emerald-400/60" />
        </div>
        {/* Code lines */}
        <div className="space-y-1.5 font-mono text-sm">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.08 }}
              className="flex items-center"
            >
              <span className="mr-4 w-6 text-right text-xs text-muted-foreground/40 select-none">
                {i + 1}
              </span>
              <span style={{ paddingLeft: `${line.indent * 1.5}rem` }}>
                <span className={line.color}>{line.text}</span>
              </span>
            </motion.div>
          ))}
        </div>
        {/* Cursor */}
        <motion.div
          className="absolute bottom-6 left-[3.5rem] h-5 w-0.5 bg-primary"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>
      {/* Glow */}
      <div className="absolute -inset-4 -z-10 rounded-3xl bg-primary/5 blur-2xl" />
    </motion.div>
  );
}

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale() as Locale;

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
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                {t("availableBadge")}
              </span>
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
              className="flex flex-col gap-4 sm:flex-row"
            >
              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                {t("viewProjects")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card/50 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-primary/5 hover:-translate-y-0.5"
              >
                <Mail className="h-4 w-4" />
                {t("contactMe")}
              </a>
            </motion.div>

            {/* Social Links */}
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

          {/* Right visual */}
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
          href="#about"
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
