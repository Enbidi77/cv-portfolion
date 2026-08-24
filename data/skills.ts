import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    name: {
      en: "Languages",
      vi: "Ngôn ngữ lập trình",
    },
    icon: "file-code-2",
    skills: [
      { name: "Java", level: "advanced" },
      { name: "C#", level: "advanced" },
      { name: "TypeScript", level: "expert" },
      { name: "JavaScript", level: "expert" },
    ],
  },
  {
    id: "backend",
    name: {
      en: "Backend",
      vi: "Backend",
    },
    icon: "server",
    skills: [
      { name: "Spring Boot", level: "advanced" },
      { name: "ASP.NET Core", level: "advanced" },
      { name: "NestJS", level: "expert" },
      { name: "Express.js", level: "advanced" },
      { name: "Hibernate", level: "intermediate" },
      { name: "Entity Framework Core", level: "advanced" },
    ],
  },
  {
    id: "frontend",
    name: {
      en: "Frontend",
      vi: "Frontend",
    },
    icon: "layout",
    skills: [
      { name: "React", level: "expert" },
      { name: "Next.js", level: "expert" },
      { name: "Angular", level: "advanced" },
      { name: "Tailwind CSS", level: "expert" },
      { name: "Bootstrap", level: "advanced" },
    ],
  },
  {
    id: "databases",
    name: {
      en: "Databases",
      vi: "Cơ sở dữ liệu",
    },
    icon: "database",
    skills: [
      { name: "PostgreSQL", level: "expert" },
      { name: "SQL Server", level: "advanced" },
      { name: "MySQL", level: "intermediate" },
      { name: "MongoDB", level: "intermediate" },
    ],
  },
  {
    id: "cloud-devops",
    name: {
      en: "Cloud & DevOps",
      vi: "Cloud & DevOps",
    },
    icon: "cloud",
    skills: [
      { name: "Docker", level: "advanced" },
      { name: "AWS", level: "advanced" },
      { name: "Azure", level: "advanced" },
      { name: "GitHub Actions", level: "advanced" },
      { name: "CI/CD", level: "advanced" },
    ],
  },
  {
    id: "messaging-realtime",
    name: {
      en: "Messaging & Realtime",
      vi: "Messaging & Thời gian thực",
    },
    icon: "radio",
    skills: [
      { name: "Kafka", level: "intermediate" },
      { name: "RabbitMQ", level: "intermediate" },
      { name: "Redis", level: "advanced" },
      { name: "BullMQ", level: "advanced" },
      { name: "WebSocket", level: "expert" },
      { name: "WebRTC", level: "advanced" },
    ],
  },
];
