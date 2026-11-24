"use client";

import { useRef, useState, useEffect, useCallback, useSyncExternalStore } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Film,
  Sparkles,
  Layers,
  FileText,
  Download,
  ExternalLink,
  Tv,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { personalInfo } from "@/data/personal";
import { cn } from "@/lib/utils";

function SectionHeader({
  badge,
  title,
  subtitle,
}: {
  badge: string;
  title: string;
  subtitle: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mb-12 text-center"
    >
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary">
        <Sparkles className="h-3.5 w-3.5 text-primary" />
        {badge}
      </div>
      <h2 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
        <span className="gradient-text">{title}</span>
      </h2>
      <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
        {subtitle}
      </p>
    </motion.div>
  );
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export function Showreel() {
  const t = useTranslations("showreel");

  const sectionRef = useRef<HTMLElement>(null);
  const isSectionInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(65);
  const [buffered, setBuffered] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isEnded, setIsEnded] = useState(false);
  const supportsPiP = useSyncExternalStore(
    () => () => {},
    () => typeof document !== "undefined" && "pictureInPictureEnabled" in document,
    () => false
  );

  // Listen for custom trigger from Hero or Navbar
  useEffect(() => {
    const handleTriggerPlay = () => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setIsEnded(false);
          })
          .catch(() => {});
      }
    };

    window.addEventListener("play-showreel", handleTriggerPlay);
    return () => window.removeEventListener("play-showreel", handleTriggerPlay);
  }, []);

  // Handle Fullscreen change
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  // Auto-hide controls when playing and inactive
  const resetControlsTimeout = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  }, [isPlaying]);

  const handleMouseMove = () => {
    resetControlsTimeout();
  };

  const handleMouseLeave = () => {
    if (isPlaying) {
      setShowControls(false);
    }
  };

  // Play / Pause toggle
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;

    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsEnded(false);
        })
        .catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowControls(true);
    }
  }, []);

  // Mute toggle
  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && volume === 0) {
      setVolume(0.5);
      videoRef.current.volume = 0.5;
    }
  }, [isMuted, volume]);

  // Volume slider change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      const shouldMute = newVol === 0;
      videoRef.current.muted = shouldMute;
      setIsMuted(shouldMute);
    }
  };

  // Time update
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);

    // Buffer progress
    if (videoRef.current.buffered.length > 0) {
      const bufferedEnd = videoRef.current.buffered.end(
        videoRef.current.buffered.length - 1
      );
      setBuffered((bufferedEnd / (videoRef.current.duration || 65)) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    if (videoRef.current.duration && !isNaN(videoRef.current.duration)) {
      setDuration(videoRef.current.duration);
    }
    videoRef.current.volume = volume;
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setIsEnded(true);
    setShowControls(true);
  };

  // Seek bar click
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !videoRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newTime = pos * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Toggle fullscreen on the container
  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      try {
        await containerRef.current.requestFullscreen();
      } catch (err) {
        console.error("Fullscreen error:", err);
      }
    } else {
      try {
        await document.exitFullscreen();
      } catch (err) {
        console.error("Exit fullscreen error:", err);
      }
    }
  };

  // Toggle PiP
  const togglePiP = async () => {
    if (!videoRef.current) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (err) {
      console.error("PiP error:", err);
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section
      id="showreel"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t("badge")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        {/* Studio Video Showcase Container */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "group relative mx-auto max-w-5xl rounded-3xl border border-border/80 bg-card/60 backdrop-blur-xl shadow-2xl transition-all duration-500",
            isFullscreen && "rounded-none border-none p-0 max-w-none w-screen h-screen flex flex-col justify-center bg-black"
          )}
        >
          {/* Ambient cinematic glow behind bezel */}
          {!isFullscreen && (
            <div className="absolute -inset-2.5 -z-10 rounded-[2rem] bg-gradient-to-r from-primary/25 via-blue-600/15 to-purple-600/25 blur-2xl opacity-60 dark:opacity-85 transition-opacity duration-700 pointer-events-none" />
          )}

          {/* Window Title Bar */}
          {!isFullscreen && (
            <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-5 py-3.5 rounded-t-3xl select-none">
              {/* Traffic light dots */}
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500/80 transition-colors hover:bg-red-500" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80 transition-colors hover:bg-amber-500" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80 transition-colors hover:bg-emerald-500" />
              </div>

              {/* Title & info badge */}
              <div className="flex items-center gap-2">
                <Film className="h-4 w-4 text-primary" />
                <span className="font-mono text-xs font-medium text-foreground/90 sm:text-sm">
                  {t("fileName")}
                </span>
                <span className="hidden sm:inline-flex rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[11px] font-mono text-primary">
                  {t("fileInfo")}
                </span>
              </div>

              {/* Quick actions */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? t("unmute") : t("mute")}
                  className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  aria-label={t("fullscreen")}
                  className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Maximize className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Video Player Display Area */}
          <div
            className={cn(
              "relative aspect-video w-full overflow-hidden bg-neutral-950 select-none",
              !isFullscreen && "rounded-b-3xl",
              isFullscreen && "h-full w-full max-h-screen"
            )}
            onClick={togglePlay}
          >
            <video
              ref={videoRef}
              src="/videos/Nguyen_Bao_Duy_Showreel.mp4"
              playsInline
              preload="metadata"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleVideoEnded}
              className="h-full w-full object-contain cursor-pointer"
            />

            {/* Initial & Pause Center Play Overlay */}
            <AnimatePresence>
              {(!isPlaying || isEnded) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer"
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                    aria-label={isEnded ? t("replay") : t("play")}
                    className="group/btn flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-primary ring-4 ring-primary/30"
                  >
                    {isEnded ? (
                      <RotateCcw className="h-8 w-8 sm:h-10 sm:w-10 transition-transform group-hover/btn:-rotate-45" />
                    ) : (
                      <Play className="h-8 w-8 sm:h-10 sm:w-10 fill-current ml-1 transition-transform group-hover/btn:scale-110" />
                    )}
                  </button>
                  <p className="mt-4 font-mono text-xs sm:text-sm font-semibold tracking-wider text-white/90 uppercase drop-shadow">
                    {isEnded ? t("replay") : `${t("play")} (01:05)`}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Controls Bar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/70 to-transparent px-4 pb-4 pt-10 transition-opacity duration-300 select-none",
                showControls || !isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
              )}
            >
              {/* Progress Scrubber */}
              <div
                ref={progressBarRef}
                onClick={handleSeek}
                className="group/scrubber relative mb-3 h-2 w-full cursor-pointer rounded-full bg-white/20 transition-all hover:h-3"
              >
                {/* Buffered fill */}
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-white/30"
                  style={{ width: `${buffered}%` }}
                />
                {/* Played fill */}
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-primary"
                  style={{ width: `${progressPercent}%` }}
                />
                {/* Scrubber thumb */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-white shadow-md opacity-0 group-hover/scrubber:opacity-100 transition-opacity pointer-events-none"
                  style={{ left: `calc(${progressPercent}% - 7px)` }}
                />
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between gap-3 text-white">
                {/* Left controls: Play/Pause, Replay, Time */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? t("pause") : t("play")}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20 active:scale-95"
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4 fill-white" />
                    ) : (
                      <Play className="h-4 w-4 fill-white ml-0.5" />
                    )}
                  </button>

                  <div className="font-mono text-xs sm:text-sm font-medium text-white/90 select-none">
                    <span>{formatTime(currentTime)}</span>
                    <span className="mx-1 text-white/40">/</span>
                    <span className="text-white/60">{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Right controls: Volume, PiP, Fullscreen */}
                <div className="flex items-center gap-2">
                  {/* Volume with hover slider */}
                  <div className="group/vol flex items-center gap-2">
                    <button
                      type="button"
                      onClick={toggleMute}
                      aria-label={isMuted ? t("unmute") : t("mute")}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20"
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      aria-label="Volume slider"
                      className="h-1.5 w-16 sm:w-20 cursor-pointer accent-primary bg-white/20 rounded-full transition-all"
                    />
                  </div>

                  {/* PiP */}
                  {supportsPiP && (
                    <button
                      type="button"
                      onClick={togglePiP}
                      aria-label={t("pip")}
                      className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20"
                    >
                      <Tv className="h-4 w-4" />
                    </button>
                  )}

                  {/* Fullscreen */}
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    aria-label={isFullscreen ? t("exitFullscreen") : t("fullscreen")}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20"
                  >
                    {isFullscreen ? (
                      <Minimize className="h-4 w-4" />
                    ) : (
                      <Maximize className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature Highlights Row beneath Video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-3"
        >
          {/* Card 1: 1-Min Motion Summary */}
          <div className="group rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="mb-1 text-sm font-bold text-foreground">
              {t("features.motionSummary.title")}
            </h3>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {t("features.motionSummary.desc")}
            </p>
          </div>

          {/* Card 2: Tech Stack in Motion */}
          <div className="group rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="mb-1 text-sm font-bold text-foreground">
              {t("features.techStack.title")}
            </h3>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {t("features.techStack.desc")}
            </p>
          </div>

          {/* Card 3: Download PDF Resume */}
          <div className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
            <div>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="mb-1 text-sm font-bold text-foreground">
                {t("features.resumeDownload.title")}
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {t("features.resumeDownload.desc")}
              </p>
            </div>
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-xs font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground shadow-sm"
            >
              <Download className="h-3.5 w-3.5" />
              {t("features.resumeDownload.action")}
              <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
