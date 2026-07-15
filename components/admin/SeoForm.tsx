"use client";

import { useState } from "react";
import type { SeoSettings } from "@/lib/admin/types";

export default function SeoForm({ initial }: { initial: SeoSettings }) {
  const [seo, setSeo] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function save() {
    setSaving(true);
    setMsg("");
    setErr("");
    try {
      const res = await fetch("/api/admin/content/seo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: seo }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Kayıt başarısız");
      setSeo(data.seo);
      setMsg("SEO ayarları kaydedildi.");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Hata");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">SEO</h1>
          <p className="mt-1 text-sm text-white/45">Varsayılan meta başlık, açıklama ve anahtar kelimeler</p>
        </div>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {saving ? "Kaydediliyor…" : "Kaydet"}
        </button>
      </div>

      {(msg || err) && (
        <p className={`rounded-lg px-3 py-2 text-sm ${err ? "bg-red-500/15 text-red-300" : "bg-emerald-500/15 text-emerald-300"}`}>
          {err || msg}
        </p>
      )}

      <div className="space-y-4 rounded-xl border border-white/8 bg-[#151922] p-5">
        <label className="block">
          <span className="mb-1.5 block text-xs text-white/50">Varsayılan başlık</span>
          <input className="admin-input" value={seo.defaultTitle} onChange={(e) => setSeo({ ...seo, defaultTitle: e.target.value })} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs text-white/50">Başlık şablonu</span>
          <input className="admin-input" value={seo.titleTemplate} onChange={(e) => setSeo({ ...seo, titleTemplate: e.target.value })} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs text-white/50">Açıklama</span>
          <textarea className="admin-input min-h-[100px]" value={seo.description} onChange={(e) => setSeo({ ...seo, description: e.target.value })} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs text-white/50">Anahtar kelimeler (virgülle)</span>
          <textarea
            className="admin-input min-h-[80px]"
            value={seo.keywords.join(", ")}
            onChange={(e) =>
              setSeo({
                ...seo,
                keywords: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
              })
            }
          />
        </label>
      </div>
    </div>
  );
}
