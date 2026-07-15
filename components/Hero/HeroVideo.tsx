"use client";

import { useEffect, useRef } from "react";
import { HERO_VIDEO_POSTER, HERO_VIDEO_SRC } from "@/lib/media";

type Props = {
  /** 0–1 scroll progress; when set, video is scrubbed instead of playing. */
  progress?: number;
  /** Autoplay muted loop (mobile / reduced-motion). */
  autoplay?: boolean;
  className?: string;
};

export default function HeroVideo({ progress, autoplay = false, className = "" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const durationRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMeta = () => {
      durationRef.current = el.duration || 0;
    };
    el.addEventListener("loadedmetadata", onMeta);
    if (el.readyState >= 1) onMeta();
    return () => el.removeEventListener("loadedmetadata", onMeta);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (autoplay) {
      el.play().catch(() => {});
      return;
    }

    el.pause();
    if (progress === undefined) return;
    const d = durationRef.current || el.duration;
    if (!d || !Number.isFinite(d)) return;
    const t = Math.min(d - 0.05, Math.max(0, progress * d));
    if (Math.abs(el.currentTime - t) > 0.04) {
      el.currentTime = t;
    }
  }, [progress, autoplay]);

  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden>
      <video
        ref={ref}
        src={HERO_VIDEO_SRC}
        poster={HERO_VIDEO_POSTER}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        playsInline
        loop={autoplay}
        preload={autoplay ? "metadata" : "auto"}
        autoPlay={autoplay}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#171717]/70 via-transparent to-[#171717]/25" />
    </div>
  );
}
