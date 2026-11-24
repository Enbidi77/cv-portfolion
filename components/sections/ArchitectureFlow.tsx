"use client";

import { motion } from "framer-motion";
import {
  Layers,
  ChevronDown,
  Server,
  Database,
  Globe,
  Cpu,
  Workflow,
} from "lucide-react";
import type { ArchitectureNode, Locale } from "@/types";

interface ArchitectureFlowProps {
  nodes: ArchitectureNode[];
  locale: Locale;
  heading?: string;
}

const layerIcons: Record<string, typeof Globe> = {
  Presentation: Globe,
  Gateway: Server,
  Services: Cpu,
  Compute: Cpu,
  Application: Cpu,
  Backend: Server,
  "Search & Integration": Workflow,
  Messaging: Workflow,
  DevOps: Workflow,
  "Data Store": Database,
};

export function ArchitectureFlow({
  nodes,
  locale,
  heading,
}: ArchitectureFlowProps) {
  if (!nodes || nodes.length === 0) return null;

  return (
    <div className="space-y-4">
      {heading && (
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Layers className="h-4 w-4 text-primary" />
          <span>{heading}</span>
        </div>
      )}

      <div className="relative flex flex-col items-center py-2">
        {nodes.map((node, index) => {
          const isNotLast = index < nodes.length - 1;
          const Icon =
            (node.layer && layerIcons[node.layer]) ||
            (index === 0
              ? Globe
              : index === nodes.length - 1
              ? Database
              : Server);

          return (
            <div
              key={node.label + index}
              className="flex w-full max-w-lg flex-col items-center"
            >
              {/* Node Card */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative w-full rounded-xl border border-border/90 bg-card p-4 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  {/* Layer Icon */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-primary">
                          {node.layer || `Layer 0${index + 1}`}
                        </span>
                        <span className="text-xs text-muted-foreground/50">•</span>
                        <span className="font-mono text-xs text-muted-foreground">
                          Step 0{index + 1}
                        </span>
                      </div>

                      {node.protocol && (
                        <span className="rounded-md border border-border/80 bg-secondary/80 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                          {node.protocol}
                        </span>
                      )}
                    </div>

                    <h5 className="font-mono text-sm font-bold text-foreground">
                      {node.label}
                    </h5>

                    {node.description && (
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {node.description[locale]}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Connected Connector Line with Animated Signal Dot */}
              {isNotLast && (
                <div className="relative flex h-14 w-full items-center justify-center">
                  {/* Vertical Guide Line */}
                  <div className="relative h-full w-[2px] bg-gradient-to-b from-primary/40 via-primary/70 to-primary/40">
                    {/* Animated Pulsing Signal Dot traveling downwards */}
                    <motion.div
                      className="absolute -left-[3px] h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)]"
                      animate={{
                        top: ["10%", "85%"],
                        opacity: [0.2, 1, 0.2],
                        scale: [0.9, 1.3, 0.9],
                      }}
                      transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3,
                      }}
                    />
                  </div>

                  {/* Flow Direction Indicator Pill */}
                  <div className="absolute right-1/2 translate-x-[42px] sm:translate-x-[50px] flex items-center gap-1 rounded-full border border-primary/20 bg-background/95 px-2 py-0.5 text-[10px] font-mono text-primary shadow-xs backdrop-blur-xs select-none">
                    <span>Data Flow</span>
                    <ChevronDown className="h-3 w-3 text-primary animate-pulse" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
