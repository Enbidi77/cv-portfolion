"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

interface LanguageSwitcherProps {
  variant?: "pill" | "text" | "mobile";
  className?: string;
}

export function LanguageSwitcher({
  variant = "pill",
  className,
}: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === locale) return;

    // Set NEXT_LOCALE cookie to persist user choice
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;SameSite=Lax`;

    // Navigate to the same pathname in the new locale
    router.replace(pathname, { locale: newLocale });
  };

  if (variant === "mobile") {
    return (
      <div className={cn("flex items-center justify-between gap-2 p-2 rounded-xl bg-secondary/50 border border-border", className)}>
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground px-2">
          <Globe className="h-3.5 w-3.5" />
          <span>Language / Ngôn ngữ</span>
        </div>
        <div className="flex items-center gap-1 bg-background/80 p-1 rounded-lg border border-border">
          <button
            type="button"
            onClick={() => handleLocaleChange("en")}
            className={cn(
              "px-3 py-1 text-xs font-semibold rounded-md transition-all",
              locale === "en"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
            aria-label="Switch to English"
            aria-pressed={locale === "en"}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => handleLocaleChange("vi")}
            className={cn(
              "px-3 py-1 text-xs font-semibold rounded-md transition-all",
              locale === "vi"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
            aria-label="Chuyển sang Tiếng Việt"
            aria-pressed={locale === "vi"}
          >
            VI
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative inline-flex items-center rounded-lg border border-border bg-secondary/50 p-0.5 text-xs font-medium",
        className
      )}
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        onClick={() => handleLocaleChange("en")}
        className={cn(
          "relative z-10 rounded-md px-2.5 py-1 text-xs font-semibold transition-all duration-200",
          locale === "en"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="Switch to English"
        aria-pressed={locale === "en"}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => handleLocaleChange("vi")}
        className={cn(
          "relative z-10 rounded-md px-2.5 py-1 text-xs font-semibold transition-all duration-200",
          locale === "vi"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="Chuyển sang Tiếng Việt"
        aria-pressed={locale === "vi"}
      >
        VI
      </button>
    </div>
  );
}
