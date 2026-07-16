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

/** Higher = snappier follow; lower = silkier lag. */
const LERP = 0.14;

export default function HeroVideo({ progress, autoplay = false, className = "" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const durationRef = useRef(0);
  const targetRef = useRef(0);
  const smoothRef = useRef(0);
  const seekingRef = useRef(false);
  const rafRef = useRef(0);

  useEffect(() => {
    if (progress !== undefined) targetRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMeta = () => {
      durationRef.current = el.duration || 0;
    };
    const onSeeked = () => {
      seekingRef.current = false;
    };

    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("seeked", onSeeked);
    if (el.readyState >= 1) onMeta();

    return () => {
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("seeked", onSeeked);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (autoplay) {
      cancelAnimationFrame(rafRef.current);
      el.play().catch(() => {});
      return;
    }

    el.pause();
    smoothRef.current = targetRef.current;

    let alive = true;
    const tick = () => {
      if (!alive) return;
      const d = durationRef.current || el.duration;
      if (d && Number.isFinite(d) && d > 0) {
        const delta = targetRef.current - smoothRef.current;
        // Ease more when far, settle when close — feels continuous while scrolling
        const k = Math.abs(delta) > 0.08 ? LERP * 1.35 : LERP;
        smoothRef.current += delta * k;

        if (Math.abs(delta) < 0.0008) {
          smoothRef.current = targetRef.current;
        }

        const t = Math.min(d - 0.04, Math.max(0, smoothRef.current * d));
        if (!seekingRef.current && Math.abs(el.currentTime - t) > 0.018) {
          seekingRef.current = true;
          try {
            el.currentTime = t;
          } catch {
            seekingRef.current = false;
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      alive = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [autoplay]);

  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden>
      <video
        ref={ref}
        src={HERO_VIDEO_SRC}
        poster={HERO_VIDEO_POSTER}
        className="absolute inset-0 h-full w-full object-cover will-change-[opacity]"
        muted
        playsInline
        loop={autoplay}
        preload="auto"
        autoPlay={autoplay}
        // Browser extensions (e.g. image zoom) inject classes like hoverZoomLink before hydrate.
        suppressHydrationWarning
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#171717]/70 via-transparent to-[#171717]/25" />
    </div>
  );
}
