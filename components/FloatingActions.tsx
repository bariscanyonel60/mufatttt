"use client";
import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";

export default function FloatingActions({ whatsapp }: { whatsapp: string }) {
  const [showTop, setShowTop] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      setShowTop(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent" aria-hidden>
        <div className="h-full bg-gold transition-[width] duration-150" style={{ width: `${progress * 100}%` }} />
      </div>

      <a
        href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Merhaba, projem için bilgi almak istiyorum.")}`}
        target="_blank" rel="noopener noreferrer"
        aria-label="WhatsApp ile yazın"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition hover:scale-110"
      >
        <MessageCircle />
      </a>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Başa dön"
        className={`fixed bottom-6 right-24 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-ink shadow-card transition-all hover:border-gold hover:text-gold-deep ${
          showTop ? "opacity-100" : "pointer-events-none opacity-0 translate-y-3"
        }`}
      >
        <ArrowUp size={18} />
      </button>
    </>
  );
}
