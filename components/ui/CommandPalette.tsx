"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Home,
  User,
  Video,
  Briefcase,
  Code2,
  FolderGit2,
  Mail,
  Copy,
  Check,
  Download,
  Sun,
  Moon,
  CornerDownLeft,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { personalInfo } from "@/data/personal";
import { GithubIcon } from "@/components/ui/brand-icons";
import { useRouter, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: "navigation" | "actions";
  icon: ReactNode;
  shortcut?: string;
  keywords?: string[];
  perform: () => void;
}

function removeDiacritics(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const t = useTranslations("commandPalette");
  const tNav = useTranslations("navigation");
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedToast, setCopiedToast] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const isHomePage = pathname === "/" || pathname === "";

  const handleNavigate = useCallback(
    (href: string) => {
      onOpenChange(false);
      const id = href.replace("#", "");

      if (!isHomePage) {
        router.push(`/${href}`);
        return;
      }

      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const top =
          element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    },
    [isHomePage, onOpenChange, router]
  );

  const handleCopyEmail = useCallback(() => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(personalInfo.email);
    }
    setCopiedToast(true);
    setTimeout(() => {
      setCopiedToast(false);
    }, 2800);
    onOpenChange(false);
  }, [onOpenChange]);

  const handleDownloadResume = useCallback(() => {
    window.open(personalInfo.resumeUrl, "_blank", "noopener,noreferrer");
    onOpenChange(false);
  }, [onOpenChange]);

  const handleToggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
    onOpenChange(false);
  }, [theme, setTheme, onOpenChange]);

  const handleOpenGithub = useCallback(() => {
    window.open("https://github.com/Enbidi77", "_blank", "noopener,noreferrer");
    onOpenChange(false);
  }, [onOpenChange]);

  // Construct items
  const items = useMemo<CommandItem[]>(() => {
    return [
      // Navigation
      {
        id: "nav-home",
        title: tNav("home"),
        subtitle: "#home",
        category: "navigation",
        icon: <Home className="h-4 w-4" />,
        keywords: ["home", "hero", "top", "trang chu", "dau trang"],
        perform: () => handleNavigate("#home"),
      },
      {
        id: "nav-showreel",
        title: tNav("showreel"),
        subtitle: "#showreel",
        category: "navigation",
        icon: <Video className="h-4 w-4" />,
        keywords: ["showreel", "video", "motion", "clip", "cv", "gioi thieu video"],
        perform: () => handleNavigate("#showreel"),
      },
      {
        id: "nav-about",
        title: tNav("about"),
        subtitle: "#about",
        category: "navigation",
        icon: <User className="h-4 w-4" />,
        keywords: ["about", "bio", "profile", "story", "gioi thieu", "thong tin"],
        perform: () => handleNavigate("#about"),
      },
      {
        id: "nav-experience",
        title: tNav("experience"),
        subtitle: "#experience",
        category: "navigation",
        icon: <Briefcase className="h-4 w-4" />,
        keywords: [
          "experience",
          "career",
          "jobs",
          "work",
          "kinh nghiem",
          "lam viec",
        ],
        perform: () => handleNavigate("#experience"),
      },
      {
        id: "nav-skills",
        title: tNav("skills"),
        subtitle: "#skills",
        category: "navigation",
        icon: <Code2 className="h-4 w-4" />,
        keywords: [
          "skills",
          "technologies",
          "stack",
          "frontend",
          "backend",
          "ky nang",
          "cong nghe",
        ],
        perform: () => handleNavigate("#skills"),
      },
      {
        id: "nav-projects",
        title: tNav("projects"),
        subtitle: "#projects",
        category: "navigation",
        icon: <FolderGit2 className="h-4 w-4" />,
        keywords: [
          "projects",
          "portfolio",
          "showcase",
          "work",
          "du an",
          "san pham",
        ],
        perform: () => handleNavigate("#projects"),
      },
      {
        id: "nav-contact",
        title: tNav("contact"),
        subtitle: "#contact",
        category: "navigation",
        icon: <Mail className="h-4 w-4" />,
        keywords: ["contact", "email", "touch", "message", "lien he", "gui tin"],
        perform: () => handleNavigate("#contact"),
      },

      // Quick Actions
      {
        id: "action-copy-email",
        title: t("copyEmail"),
        subtitle: personalInfo.email,
        category: "actions",
        icon: <Copy className="h-4 w-4" />,
        shortcut: personalInfo.email,
        keywords: [
          "copy email",
          "email",
          "address",
          "sao chep email",
          "thu dien tu",
          personalInfo.email,
        ],
        perform: handleCopyEmail,
      },
      {
        id: "action-download-resume",
        title: t("downloadResume"),
        subtitle: "Google Drive PDF",
        category: "actions",
        icon: <Download className="h-4 w-4" />,
        keywords: [
          "resume",
          "cv",
          "pdf",
          "download",
          "tai cv",
          "ho so",
        ],
        perform: handleDownloadResume,
      },
      {
        id: "action-toggle-theme",
        title: theme === "dark" ? t("themeLight") : t("themeDark"),
        subtitle: t("toggleTheme"),
        category: "actions",
        icon:
          theme === "dark" ? (
            <Sun className="h-4 w-4 text-amber-400" />
          ) : (
            <Moon className="h-4 w-4 text-primary" />
          ),
        keywords: [
          "theme",
          "dark",
          "light",
          "mode",
          "giao dien",
          "sang",
          "toi",
        ],
        perform: handleToggleTheme,
      },
      {
        id: "action-open-github",
        title: t("openGithub"),
        subtitle: "github.com/Enbidi77",
        category: "actions",
        icon: <GithubIcon className="h-4 w-4" />,
        shortcut: "↗",
        keywords: ["github", "git", "source code", "ma nguon", "profile"],
        perform: handleOpenGithub,
      },
    ];
  }, [
    t,
    tNav,
    theme,
    handleNavigate,
    handleCopyEmail,
    handleDownloadResume,
    handleToggleTheme,
    handleOpenGithub,
  ]);

  // Filter items based on query
  const filteredItems = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return items;

    const normalizedQuery = removeDiacritics(trimmed);

    return items.filter((item) => {
      const matchTitle = removeDiacritics(item.title).includes(normalizedQuery);
      const matchSubtitle = item.subtitle
        ? removeDiacritics(item.subtitle).includes(normalizedQuery)
        : false;
      const matchKeywords = item.keywords?.some((k) =>
        removeDiacritics(k).includes(normalizedQuery)
      );

      return matchTitle || matchSubtitle || matchKeywords;
    });
  }, [items, query]);

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) {
        setQuery("");
        setSelectedIndex(0);
      }
      onOpenChange(nextOpen);
    },
    [onOpenChange]
  );

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedIndex(0);
  };

  const handleClearQuery = () => {
    setQuery("");
    setSelectedIndex(0);
    inputRef.current?.focus();
  };

  // Safe selected index bounded to filtered items length
  const activeIndex =
    filteredItems.length > 0
      ? Math.min(selectedIndex, filteredItems.length - 1)
      : 0;

  // Scroll active item into view
  useEffect(() => {
    if (!open) return;
    const activeEl = listRef.current?.querySelector(
      `[data-item-index="${activeIndex}"]`
    );
    if (activeEl && typeof activeEl.scrollIntoView === "function") {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex, open]);

  // Keyboard navigation inside palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredItems.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(
        (prev) => (prev - 1 + filteredItems.length) % filteredItems.length
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const current = filteredItems[activeIndex];
      if (current) {
        current.perform();
      }
    }
  };

  // Group items by category while preserving filtered order index
  const navigationItemsWithIndex = useMemo(() => {
    return filteredItems
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => item.category === "navigation");
  }, [filteredItems]);

  const actionItemsWithIndex = useMemo(() => {
    return filteredItems
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => item.category === "actions");
  }, [filteredItems]);

  return (
    <>
      <Dialog.Root open={open} onOpenChange={handleOpenChange}>
        <Dialog.Portal forceMount>
          <AnimatePresence>
            {open && (
              <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] sm:pt-[15vh]">
                {/* Backdrop Overlay */}
                <Dialog.Overlay asChild>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                  />
                </Dialog.Overlay>

                {/* Dialog Content */}
                <Dialog.Content asChild onKeyDown={handleKeyDown}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -12 }}
                    transition={{
                      duration: 0.2,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="relative z-50 w-[92vw] max-w-xl overflow-hidden rounded-2xl border border-border/70 bg-card/95 shadow-2xl backdrop-blur-xl focus:outline-none"
                  >
                    <Dialog.Title className="sr-only">
                      {t("openPalette")}
                    </Dialog.Title>
                    <Dialog.Description className="sr-only">
                      {t("searchPlaceholder")}
                    </Dialog.Description>

                    {/* Search Input Bar */}
                    <div className="relative flex items-center border-b border-border/60 px-4 py-3.5">
                      <Search className="mr-3 h-5 w-5 shrink-0 text-muted-foreground" />
                      <input
                        ref={inputRef}
                        type="text"
                        autoFocus
                        value={query}
                        onChange={handleQueryChange}
                        placeholder={t("searchPlaceholder")}
                        className="w-full bg-transparent text-sm sm:text-base font-medium text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                      />
                      {query ? (
                        <button
                          onClick={handleClearQuery}
                          className="mr-2 flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"
                          aria-label={t("closeHint")}
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      ) : null}
                      <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-border bg-muted/60 px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground">
                        ESC
                      </kbd>
                    </div>

                    {/* Scrollable Command List */}
                    <div
                      ref={listRef}
                      className="max-h-[340px] overflow-y-auto p-2"
                    >
                      {filteredItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 text-center">
                          <Search className="mb-2 h-8 w-8 text-muted-foreground/40" />
                          <p className="text-sm font-medium text-muted-foreground">
                            {t("noResults", { query })}
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {/* Navigation Group */}
                          {navigationItemsWithIndex.length > 0 && (
                            <div>
                              <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                                {t("navigationGroup")}
                              </div>
                              <div className="mt-1 space-y-0.5">
                                {navigationItemsWithIndex.map(
                                  ({ item, index }) => {
                                    const isSelected = index === activeIndex;
                                    return (
                                      <div
                                        key={item.id}
                                        data-item-index={index}
                                        onClick={item.perform}
                                        onMouseEnter={() =>
                                          setSelectedIndex(index)
                                        }
                                        className={cn(
                                          "group flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors",
                                          isSelected
                                            ? "bg-primary/10 text-primary font-medium"
                                            : "text-foreground hover:bg-secondary/60"
                                        )}
                                      >
                                        <div className="flex items-center gap-3 min-w-0">
                                          <div
                                            className={cn(
                                              "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors",
                                              isSelected
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-secondary text-muted-foreground group-hover:text-foreground"
                                            )}
                                          >
                                            {item.icon}
                                          </div>
                                          <div className="flex items-center gap-2 truncate">
                                            <span className="truncate">
                                              {item.title}
                                            </span>
                                            {item.subtitle && (
                                              <span className="text-xs text-muted-foreground/70 font-mono">
                                                {item.subtitle}
                                              </span>
                                            )}
                                          </div>
                                        </div>

                                        <div className="ml-2 flex shrink-0 items-center gap-1.5">
                                          {isSelected && (
                                            <span className="flex items-center gap-1 text-[10px] text-primary">
                                              <CornerDownLeft className="h-3 w-3" />
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          )}

                          {/* Quick Actions Group */}
                          {actionItemsWithIndex.length > 0 && (
                            <div>
                              <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                                {t("actionsGroup")}
                              </div>
                              <div className="mt-1 space-y-0.5">
                                {actionItemsWithIndex.map(({ item, index }) => {
                                  const isSelected = index === activeIndex;
                                  return (
                                    <div
                                      key={item.id}
                                      data-item-index={index}
                                      onClick={item.perform}
                                      onMouseEnter={() =>
                                        setSelectedIndex(index)
                                      }
                                      className={cn(
                                        "group flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors",
                                        isSelected
                                          ? "bg-primary/10 text-primary font-medium"
                                          : "text-foreground hover:bg-secondary/60"
                                      )}
                                    >
                                      <div className="flex items-center gap-3 min-w-0">
                                        <div
                                          className={cn(
                                            "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors",
                                            isSelected
                                              ? "bg-primary text-primary-foreground"
                                              : "bg-secondary text-muted-foreground group-hover:text-foreground"
                                          )}
                                        >
                                          {item.icon}
                                        </div>
                                        <div className="flex flex-col truncate">
                                          <span className="truncate">
                                            {item.title}
                                          </span>
                                          {item.subtitle && (
                                            <span className="text-xs text-muted-foreground truncate">
                                              {item.subtitle}
                                            </span>
                                          )}
                                        </div>
                                      </div>

                                      <div className="ml-2 flex shrink-0 items-center gap-1.5">
                                        {item.shortcut && (
                                          <span className="hidden sm:inline-block font-mono text-[11px] text-muted-foreground">
                                            {item.shortcut}
                                          </span>
                                        )}
                                        {isSelected && (
                                          <span className="flex items-center gap-1 text-[10px] text-primary">
                                            <CornerDownLeft className="h-3 w-3" />
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Footer Instructions */}
                    <div className="flex items-center justify-between border-t border-border/60 bg-muted/40 px-4 py-2 text-[11px] text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <kbd className="rounded border border-border bg-background px-1 py-0.5 font-mono text-[10px]">
                            ↑
                          </kbd>
                          <kbd className="rounded border border-border bg-background px-1 py-0.5 font-mono text-[10px]">
                            ↓
                          </kbd>
                          <span className="hidden sm:inline">
                            {t("navigationHint")}
                          </span>
                        </span>
                        <span className="flex items-center gap-1">
                          <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">
                            ↵
                          </kbd>
                          <span className="hidden sm:inline">
                            {t("selectHint")}
                          </span>
                        </span>
                      </div>
                      <span className="flex items-center gap-1">
                        <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">
                          ESC
                        </kbd>
                        <span>{t("closeHint")}</span>
                      </span>
                    </div>
                  </motion.div>
                </Dialog.Content>
              </div>
            )}
          </AnimatePresence>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Floating Copied Toast Feedback */}
      <AnimatePresence>
        {copiedToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2.5 rounded-full border border-primary/30 bg-card/95 px-4 py-2.5 text-sm font-medium text-foreground shadow-2xl backdrop-blur-md"
          >
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="h-3 w-3" />
            </div>
            <span>{t("emailCopied")}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
