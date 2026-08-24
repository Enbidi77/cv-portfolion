import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://nguyenbaoduy.dev";

  const entries: MetadataRoute.Sitemap = [];

  // Homepages
  entries.push({
    url: siteUrl,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1.0,
    alternates: {
      languages: {
        en: siteUrl,
        vi: `${siteUrl}/vi`,
      },
    },
  });

  entries.push({
    url: `${siteUrl}/vi`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
    alternates: {
      languages: {
        en: siteUrl,
        vi: `${siteUrl}/vi`,
      },
    },
  });

  // Projects list pages
  entries.push({
    url: `${siteUrl}/projects`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
    alternates: {
      languages: {
        en: `${siteUrl}/projects`,
        vi: `${siteUrl}/vi/projects`,
      },
    },
  });

  entries.push({
    url: `${siteUrl}/vi/projects`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
    alternates: {
      languages: {
        en: `${siteUrl}/projects`,
        vi: `${siteUrl}/vi/projects`,
      },
    },
  });

  // Individual Project Details pages
  projects.forEach((project) => {
    entries.push({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${siteUrl}/projects/${project.slug}`,
          vi: `${siteUrl}/vi/projects/${project.slug}`,
        },
      },
    });

    entries.push({
      url: `${siteUrl}/vi/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${siteUrl}/projects/${project.slug}`,
          vi: `${siteUrl}/vi/projects/${project.slug}`,
        },
      },
    });
  });

  return entries;
}
