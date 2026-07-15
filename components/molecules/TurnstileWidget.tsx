"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        }
      ) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || "";

type Props = {
  onToken: (token: string) => void;
};

export function turnstileConfigured() {
  return Boolean(SITE_KEY);
}

export default function TurnstileWidget({ onToken }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;

  useEffect(() => {
    if (!SITE_KEY || !ref.current) return;

    let cancelled = false;

    const mount = () => {
      if (cancelled || !ref.current || !window.turnstile || widgetId.current) return;
      widgetId.current = window.turnstile.render(ref.current, {
        sitekey: SITE_KEY,
        callback: (token) => onTokenRef.current(token),
        "expired-callback": () => onTokenRef.current(""),
        theme: "light",
      });
    };

    if (window.turnstile) {
      mount();
    } else {
      const existing = document.querySelector<HTMLScriptElement>('script[data-turnstile]');
      if (!existing) {
        const s = document.createElement("script");
        s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        s.async = true;
        s.dataset.turnstile = "1";
        s.onload = mount;
        document.head.appendChild(s);
      } else {
        existing.addEventListener("load", mount);
      }
    }

    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetId.current);
        } catch { /* ignore */ }
        widgetId.current = null;
      }
    };
  }, []);

  if (!SITE_KEY) return null;

  return <div ref={ref} className="flex justify-center" />;
}
