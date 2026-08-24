"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Star, GitFork, ExternalLink, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { GithubIcon } from "@/components/ui/brand-icons";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  homepage: string | null;
}

interface GitHubUser {
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubData {
  user: GitHubUser;
  repos: GitHubRepo[];
}

const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  Java: "bg-orange-500",
  "C#": "bg-green-600",
  Python: "bg-blue-400",
  Vue: "bg-emerald-500",
  HTML: "bg-red-500",
  CSS: "bg-purple-500",
  Dockerfile: "bg-blue-600",
};

export function GitHubSection() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations("github");
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, {
    once: true,
    margin: "-100px",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/github");
        if (!res.ok) throw new Error("Failed to fetch GitHub data");
        const json = await res.json();
        setData(json);
      } catch {
        setError(t("error"));
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [t]);

  const languageDistribution = data
    ? data.repos.reduce(
        (acc, repo) => {
          if (repo.language) {
            acc[repo.language] = (acc[repo.language] || 0) + 1;
          }
          return acc;
        },
        {} as Record<string, number>
      )
    : {};

  const totalReposWithLang = Object.values(languageDistribution).reduce(
    (a, b) => a + b,
    0
  );

  const sortedLanguages = Object.entries(languageDistribution)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6);

  return (
    <section className="section-padding">
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

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 text-center">
            <GithubIcon className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <p className="mb-3 text-sm text-muted-foreground">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-sm font-medium text-primary hover:underline cursor-pointer"
            >
              {t("tryAgain")}
            </button>
          </div>
        )}

        {/* Data */}
        {data && (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Stats */}
            <div className="space-y-6">
              {/* Profile card */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-primary/30">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={data.user.avatar_url}
                      alt="GitHub avatar"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">GitHub</p>
                    <p className="text-sm text-muted-foreground">
                      {t("repositoriesCount", { count: data.user.public_repos })}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xl font-bold text-foreground">
                      {data.user.public_repos}
                    </p>
                    <p className="text-xs text-muted-foreground">{t("repos")}</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">
                      {data.user.followers}
                    </p>
                    <p className="text-xs text-muted-foreground">{t("followers")}</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">
                      {data.user.following}
                    </p>
                    <p className="text-xs text-muted-foreground">{t("following")}</p>
                  </div>
                </div>
              </div>

              {/* Language distribution */}
              {sortedLanguages.length > 0 && (
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="mb-4 text-sm font-semibold text-foreground">
                    {t("technologyDistribution")}
                  </h3>
                  <div className="space-y-3">
                    {sortedLanguages.map(([lang, count]) => {
                      const percentage = Math.round(
                        (count / totalReposWithLang) * 100
                      );
                      return (
                        <div key={lang}>
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2 text-foreground">
                              <span
                                className={`h-2.5 w-2.5 rounded-full ${
                                  languageColors[lang] || "bg-gray-400"
                                }`}
                              />
                              {lang}
                            </span>
                            <span className="text-muted-foreground">
                              {percentage}%
                            </span>
                          </div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className={`h-full rounded-full ${
                                languageColors[lang] || "bg-gray-400"
                              }`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Repos grid */}
            <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
              {data.repos.slice(0, 6).map((repo, i) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="group rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {repo.name}
                    </h4>
                    <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  {repo.description && (
                    <p className="mb-3 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {repo.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            languageColors[repo.language] || "bg-gray-400"
                          }`}
                        />
                        {repo.language}
                      </span>
                    )}
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {repo.stargazers_count}
                      </span>
                    )}
                    {repo.forks_count > 0 && (
                      <span className="flex items-center gap-1">
                        <GitFork className="h-3 w-3" />
                        {repo.forks_count}
                      </span>
                    )}
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
