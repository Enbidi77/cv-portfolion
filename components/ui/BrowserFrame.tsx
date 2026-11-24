"use client";

import { ReactNode } from "react";
import { Lock, RotateCw, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface BrowserFrameProps {
  url: string;
  children: ReactNode;
  className?: string;
  externalUrl?: string;
}

export function BrowserFrame({
  url,
  children,
  className,
  externalUrl,
}: BrowserFrameProps) {
  // Format display url cleanly if needed
  const displayUrl = url.startsWith("http") ? url : `https://${url}`;

  return (
    <div
      className={cn(
        "group/browser relative flex flex-col overflow-hidden rounded-xl border border-neutral-800/80 bg-neutral-950 shadow-xl transition-all duration-300",
        className
      )}
    >
      {/* macOS / Safari Dark Title Bar */}
      <div className="flex h-9 w-full select-none items-center justify-between border-b border-neutral-800/80 bg-neutral-900/95 px-3 backdrop-blur-md">
        {/* Left: Window Control Buttons (Traffic Lights) */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] border border-[#e0443e]/40 shadow-xs transition-transform group-hover/browser:scale-105" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e] border border-[#d89e24]/40 shadow-xs transition-transform group-hover/browser:scale-105" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840] border border-[#1aab29]/40 shadow-xs transition-transform group-hover/browser:scale-105" />
        </div>

        {/* Center: Realistic Safari / Chrome URL Bar */}
        <div className="flex flex-1 items-center justify-center px-2">
          <div className="flex h-6 w-full max-w-[240px] sm:max-w-[320px] items-center justify-center gap-1.5 rounded-md border border-neutral-700/60 bg-neutral-950/80 px-2.5 text-[11px] font-mono text-neutral-300 shadow-inner transition-colors group-hover/browser:border-neutral-600">
            <Lock className="h-2.5 w-2.5 shrink-0 text-emerald-400" />
            <span className="truncate text-neutral-300 text-[11px] select-all">
              {displayUrl}
            </span>
          </div>
        </div>

        {/* Right: Actions / Reload */}
        <div className="flex items-center gap-1.5 shrink-0 text-neutral-500">
          {externalUrl ? (
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-neutral-400 hover:text-white transition-colors"
              title="Open Live Website"
              aria-label="Open Live Website"
            >
              <ExternalLink className="h-3 w-3" />
            </a>
          ) : (
            <RotateCw className="h-3 w-3 opacity-60" />
          )}
        </div>
      </div>

      {/* Browser Viewport */}
      <div className="relative w-full overflow-hidden bg-neutral-900">
        {children}
      </div>
    </div>
  );
}
