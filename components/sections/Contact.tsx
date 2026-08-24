"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Mail,
  MapPin,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { GithubIcon } from "@/components/ui/brand-icons";
import { socialLinks } from "@/data/personal";
import { cn } from "@/lib/utils";

const contactIcons: Record<string, React.ComponentType<{ className?: string }>> =
  {
    github: GithubIcon,
    mail: Mail,
  };

interface FormState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
}

export function Contact() {
  const t = useTranslations("contact");
  const [formState, setFormState] = useState<FormState>({
    status: "idle",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, {
    once: true,
    margin: "-100px",
  });

  function validate(data: FormData): Record<string, string> {
    const errs: Record<string, string> = {};
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const subject = data.get("subject") as string;
    const message = data.get("message") as string;

    if (!name || name.trim().length < 2) {
      errs.name = t("validation.name");
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = t("validation.email");
    }
    if (!subject || subject.trim().length < 3) {
      errs.subject = t("validation.subject");
    }
    if (!message || message.trim().length < 10) {
      errs.message = t("validation.message");
    }

    return errs;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setFormState({ status: "loading", message: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setFormState({
        status: "success",
        message: t("form.success"),
      });
      formRef.current?.reset();
    } catch {
      setFormState({
        status: "error",
        message: t("form.error"),
      });
    }
  }

  return (
    <section id="contact" className="section-padding">
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

        <div className="grid gap-12 lg:grid-cols-5 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h3 className="mb-2 text-lg font-bold text-foreground">
                {t("letsConnect")}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("connectDescription")}
              </p>
            </div>

            <div className="space-y-4">
              {socialLinks.map((link) => {
                const Icon = contactIcons[link.icon];
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                      {Icon && <Icon className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {link.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {link.url.replace("mailto:", "").replace("https://", "")}
                      </p>
                    </div>
                  </a>
                );
              })}

              <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {t("location")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("locationValue")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-5 rounded-2xl border border-border bg-card p-6 lg:p-8 shadow-sm"
              noValidate
            >
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    {t("form.name")}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    className={cn(
                      "w-full rounded-xl border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors",
                      errors.name ? "border-destructive" : "border-input"
                    )}
                    placeholder={t("form.namePlaceholder")}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    {t("form.email")}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={cn(
                      "w-full rounded-xl border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors",
                      errors.email ? "border-destructive" : "border-input"
                    )}
                    placeholder={t("form.emailPlaceholder")}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  {t("form.subject")}
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  className={cn(
                    "w-full rounded-xl border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors",
                    errors.subject ? "border-destructive" : "border-input"
                  )}
                  placeholder={t("form.subjectPlaceholder")}
                />
                {errors.subject && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  {t("form.message")}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  className={cn(
                    "w-full resize-none rounded-xl border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors",
                    errors.message ? "border-destructive" : "border-input"
                  )}
                  placeholder={t("form.messagePlaceholder")}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={formState.status === "loading"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:opacity-90 hover:shadow-xl hover:shadow-primary/30 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto cursor-pointer"
              >
                {formState.status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t("form.sending")}
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    {t("form.send")}
                  </>
                )}
              </button>

              {/* Status messages */}
              {formState.status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-xl bg-emerald-500/10 p-4 text-sm text-emerald-500 border border-emerald-500/20"
                >
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                  {formState.message}
                </motion.div>
              )}

              {formState.status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-xl bg-destructive/10 p-4 text-sm text-destructive border border-destructive/20"
                >
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  {formState.message}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
