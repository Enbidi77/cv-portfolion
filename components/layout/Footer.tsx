"use client";

import { useTranslations } from "next-intl";
import { Mail, Heart, ArrowUp } from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import { personalInfo, socialLinks, navItems } from "@/data/personal";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> =
  {
    github: GithubIcon,
    mail: Mail,
  };

export function Footer() {
  const tFooter = useTranslations("footer");
  const tNav = useTranslations("navigation");
  const pathname = usePathname();
  const router = useRouter();

  const isHomePage = pathname === "/" || pathname === "";

  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    if (!isHomePage) {
      router.push(`/${href}`);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/#home");
    }
  };

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold gradient-text font-mono">
              {personalInfo.name}
            </h3>
            <p className="max-w-xs text-sm text-muted-foreground">
              {tNav("skills")} • {tNav("projects")} • {tNav("experience")}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link) => {
                const Icon = socialIcons[link.icon];
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all hover:border-primary/50 hover:text-primary hover:shadow-md hover:shadow-primary/10"
                    aria-label={link.name}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {tFooter("quickLinks")}
            </h4>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.href)}
                  className="text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {tNav(item.key)}
                </button>
              ))}
              <Link
                href="/projects"
                className="text-left text-sm text-primary transition-colors hover:underline"
              >
                {tNav("allProjects")} →
              </Link>
            </nav>
          </div>

          {/* Tech Credits */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {tFooter("builtWith")}
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                "Next.js",
                "TypeScript",
                "next-intl",
                "Tailwind CSS",
                "Framer Motion",
                "Vercel",
              ].map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-border bg-secondary/50 px-2.5 py-1 text-xs text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground text-center sm:text-left">
            <span>
              {tFooter("copyright", {
                year: new Date().getFullYear(),
                name: personalInfo.name,
              })}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1">
              {tFooter("madeWith")} <Heart className="inline h-3.5 w-3.5 text-red-500 fill-red-500" />
            </span>
          </p>
          <button
            onClick={handleBackToTop}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
            aria-label={tFooter("backToTop")}
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
