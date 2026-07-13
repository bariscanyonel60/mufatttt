"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "mufat-cookie-consent";

export type ConsentValue = "accepted" | "rejected";

/** Analytics yalnızca kabulde yüklenir — hook hazır, script henüz yok. */
export function onAnalyticsConsent(accepted: boolean) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("mufat:consent", { detail: { accepted } }));
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY) as ConsentValue | null;
      if (!v) setVisible(true);
      else if (v === "accepted") onAnalyticsConsent(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const choose = (value: ConsentValue) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch { /* ignore */ }
    onAnalyticsConsent(value === "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Çerez tercihleri"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-line bg-paper/95 p-4 shadow-lift backdrop-blur-md md:p-6"
    >
      <div className="container-x flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-sm leading-relaxed text-concrete">
          Site deneyimini iyileştirmek için zorunlu çerezler kullanıyoruz. İsteğe bağlı analitik çerezler yalnızca onayınızla etkinleşir.{" "}
          <Link href="/cerez-politikasi" className="font-semibold text-ink underline hover:text-gold-deep">
            Çerez Politikası
          </Link>
        </p>
        <div className="flex shrink-0 flex-wrap gap-3">
          <button type="button" onClick={() => choose("rejected")} className="btn btn-ghost-light">
            Reddet
          </button>
          <button type="button" onClick={() => choose("accepted")} className="btn btn-gold">
            Kabul Et
          </button>
        </div>
      </div>
    </div>
  );
}
