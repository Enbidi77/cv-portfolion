import type { PersonalInfo, SocialLink, NavItem, AboutCard } from "@/types";

export const personalInfo: PersonalInfo = {
  name: "NGUYEN BAO DUY",
  title: {
    en: "Fullstack Web Developer",
    vi: "Lập trình viên Fullstack",
  },
  summary: {
    en: "Fullstack/Backend Software Engineer with experience developing scalable web applications using Java Spring Boot, ASP.NET Core, NestJS, and modern frontend technologies.",
    vi: "Kỹ sư phần mềm Fullstack / Backend giàu kinh nghiệm xây dựng ứng dụng web mở rộng với Java Spring Boot, ASP.NET Core, NestJS và các công nghệ frontend hiện đại.",
  },
  tagline: {
    en: "Building scalable web applications, real-time systems, and modern digital experiences.",
    vi: "Xây dựng ứng dụng web có khả năng mở rộng, hệ thống thời gian thực và trải nghiệm kỹ thuật số hiện đại.",
  },
  location: {
    en: "Vietnam",
    vi: "Việt Nam",
  },
  email: "contact@nguyenduy.fwk@gmail.com",
  resumeUrl: "https://drive.google.com/file/d/1C1vLqeZNIXZr15uETnkLPOngSoNjq3KW/view?usp=sharing",
};

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/Enbidi77",
    icon: "github",
  },
  {
    name: "Email",
    url: "mailto:contact@nguyenduy.fwk@gmail.com",
    icon: "mail",
  },
];

export const navItems: NavItem[] = [
  { key: "home", href: "#home" },
  { key: "about", href: "#about" },
  { key: "experience", href: "#experience" },
  { key: "skills", href: "#skills" },
  { key: "projects", href: "#projects" },
  { key: "contact", href: "#contact" },
];

export const aboutCards: AboutCard[] = [
  {
    key: "experience",
    icon: "briefcase",
    label: {
      en: "Experience",
      vi: "Kinh nghiệm",
    },
    value: {
      en: "2+ Years",
      vi: "2+ Năm",
    },
  },
  {
    key: "focus",
    icon: "code-2",
    label: {
      en: "Focus",
      vi: "Định hướng",
    },
    value: {
      en: "Fullstack Development",
      vi: "Phát triển Fullstack",
    },
  },
  {
    key: "currentRole",
    icon: "building-2",
    label: {
      en: "Current Role",
      vi: "Vai trò hiện tại",
    },
    value: {
      en: "Enterprise ERP Development",
      vi: "Phát triển ERP doanh nghiệp",
    },
  },
  {
    key: "location",
    icon: "map-pin",
    label: {
      en: "Location",
      vi: "Địa điểm",
    },
    value: {
      en: "Vietnam",
      vi: "Việt Nam",
    },
  },
];
