"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Code2, Building2, MapPin } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { aboutCards } from "@/data/personal";
import type { AboutCard, Locale } from "@/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  briefcase: Briefcase,
  "code-2": Code2,
  "building-2": Building2,
  "map-pin": MapPin,
};

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
      className="mb-16 text-center"
    >
      <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
        <span className="gradient-text">{title}</span>
      </h2>
      <p className="mx-auto max-w-2xl text-muted-foreground">{subtitle}</p>
    </motion.div>
  );
}

function InfoCard({
  card,
  index,
  locale,
}: {
  card: AboutCard;
  index: number;
  locale: Locale;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = iconMap[card.icon];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
        {Icon && <Icon className="h-6 w-6" />}
      </div>
      <p className="mb-1 text-sm font-medium text-muted-foreground">
        {card.label[locale]}
      </p>
      <p className="text-lg font-semibold text-foreground">
        {card.value[locale]}
      </p>
    </motion.div>
  );
}

export function About() {
  const t = useTranslations("about");
  const locale = useLocale() as Locale;
  const textRef = useRef(null);
  const isTextInView = useInView(textRef, { once: true, margin: "-100px" });

  const descriptionParagraphs = t("description").split("\n\n");

  return (
    <section id="about" className="section-padding">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="grid gap-12 lg:grid-cols-5 items-start">
          {/* Description */}
          <motion.div
            ref={textRef}
            initial={{ opacity: 0, x: -30 }}
            animate={isTextInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 space-y-4"
          >
            {descriptionParagraphs.map((paragraph, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Info Cards */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {aboutCards.map((card, index) => (
              <InfoCard
                key={card.key}
                card={card}
                index={index}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
