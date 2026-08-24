export type Locale = "en" | "vi";

export type Localized<T = string> = {
  en: T;
  vi: T;
};

export interface PersonalInfo {
  name: string;
  title: Localized<string>;
  summary: Localized<string>;
  tagline: Localized<string>;
  location: Localized<string>;
  email: string;
  resumeUrl: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export type NavKey =
  | "home"
  | "about"
  | "experience"
  | "skills"
  | "projects"
  | "contact";

export interface NavItem {
  key: NavKey;
  href: string;
}

export interface AboutCard {
  key: string;
  icon: string;
  value: Localized<string>;
  label: Localized<string>;
}

export interface Experience {
  id: string;
  company: string;
  role: Localized<string>;
  period: Localized<string>;
  isCurrent: boolean;
  responsibilities: Localized<string[]>;
}

export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

export interface Skill {
  name: string;
  icon?: string;
  level?: SkillLevel;
}

export interface SkillCategory {
  id: string;
  name: Localized<string>;
  icon: string;
  skills: Skill[];
}

export interface ArchitectureNode {
  label: string;
  description?: Localized<string>;
}

export interface Project {
  id: string;
  slug: string;
  title: Localized<string>;
  shortDescription: Localized<string>;
  fullDescription: Localized<string>;
  image: string;
  technologies: string[];
  features: Localized<string[]>;
  githubUrl?: string;
  liveUrl?: string;
  architecture?: ArchitectureNode[];
  challenges?: Localized<string[]>;
  solutions?: Localized<string[]>;
}
