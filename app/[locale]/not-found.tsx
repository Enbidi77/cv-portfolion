import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  const tNav = useTranslations("navigation");

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center px-4">
      <div className="rounded-2xl border border-border bg-card p-8 sm:p-12 max-w-md w-full shadow-lg space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <FileQuestion className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground font-mono">
            404
          </h1>
          <p className="text-muted-foreground text-sm">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90"
        >
          <ArrowLeft className="h-4 w-4" />
          {tNav("home")}
        </Link>
      </div>
    </div>
  );
}
