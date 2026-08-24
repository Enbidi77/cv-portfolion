# NGUYEN BAO DUY — Portfolio

A premium, modern personal portfolio website built with Next.js 16, TypeScript, Tailwind CSS v4, Framer Motion, and shadcn/ui patterns.

## ✨ Features

- **Responsive Design** — Mobile-first layouts that work beautifully on all devices
- **Dark/Light Mode** — Google-style dark mode with clean surfaces
- **Smooth Animations** — Framer Motion scroll reveals, transitions, and micro-interactions
- **Interactive Sections** — Hero, About, Experience Timeline, Skills, Projects, GitHub, Contact
- **Project Showcase** — Grid layout with detail modals, architecture diagrams, and live demo links
- **GitHub Integration** — Dynamic repo and profile data fetched server-side
- **Contact Form** — Validated form with Route Handler backend (email service ready)
- **SEO Optimized** — OpenGraph, sitemap, robots.txt, semantic HTML
- **Vercel Ready** — Zero-config deployment

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Package Manager | pnpm |
| Deployment | Vercel |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd cv-portfolio

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## ⚙️ Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GITHUB_USERNAME` | Yes | GitHub username for the GitHub activity section |
| `GITHUB_TOKEN` | No | GitHub personal access token for higher API rate limits |
| `CONTACT_EMAIL` | Yes | Email address to receive contact form submissions |
| `EMAIL_SERVICE_API_KEY` | No | API key for email service (Resend, SendGrid, etc.) |
| `NEXT_PUBLIC_SITE_URL` | Yes | Public site URL for SEO metadata |

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   ├── contact/route.ts    # Contact form handler
│   │   └── github/route.ts     # GitHub data proxy
│   ├── globals.css             # Design system & theme
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Home page
│   ├── robots.ts               # Robots.txt config
│   └── sitemap.ts              # Sitemap generation
├── components/
│   ├── layout/
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   └── ThemeProvider.tsx
│   └── sections/
│       ├── About.tsx
│       ├── Contact.tsx
│       ├── Experience.tsx
│       ├── GitHub.tsx
│       ├── Hero.tsx
│       ├── Projects.tsx
│       └── Skills.tsx
├── data/                       # Portfolio content (separated from UI)
│   ├── experience.ts
│   ├── personal.ts
│   ├── projects.ts
│   └── skills.ts
├── lib/
│   └── utils.ts
├── types/
│   └── index.ts
└── public/
    └── images/projects/
```

## 🎨 Customization

All portfolio data lives in the `data/` directory. To update your information:

- **Personal info & social links** → `data/personal.ts`
- **Work experience** → `data/experience.ts`
- **Skills & technologies** → `data/skills.ts`
- **Projects** → `data/projects.ts`

No need to touch UI components when updating content.

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy!

### Manual Build

```bash
pnpm build
pnpm start
```

## 📄 Resume

Place your resume PDF at `public/resume.pdf` to enable the download button.

## License

MIT
