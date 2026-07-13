"use client";

import { useState } from "react";
import type { SiteContent } from "@/lib/admin/types";

export default function SiteSettingsForm({ initial }: { initial: SiteContent }) {
  const [site, setSite] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  function set<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    setSite((s) => ({ ...s, [key]: value }));
  }

  async function save() {
    setSaving(true);
    setMsg("");
    setErr("");
    try {
      const res = await fetch("/api/admin/content/site", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: site }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Kayıt başarısız");
      setSite(data.site);
      setMsg("Site ayarları kaydedildi.");
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
          <h1 className="font-display text-2xl font-bold">Site Ayarları</h1>
          <p className="mt-1 text-sm text-white/45">İletişim, marka ve istatistik bilgileri</p>
        </div>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-ink disabled:opacity-60"
        >
          {saving ? "Kaydediliyor…" : "Kaydet"}
        </button>
      </div>

      {(msg || err) && (
        <p className={`rounded-lg px-3 py-2 text-sm ${err ? "bg-red-500/15 text-red-300" : "bg-emerald-500/15 text-emerald-300"}`}>
          {err || msg}
        </p>
      )}

      <section className="grid gap-4 rounded-xl border border-white/8 bg-[#151922] p-5 sm:grid-cols-2">
        <Field label="Firma adı" value={site.name} onChange={(v) => set("name", v)} />
        <Field label="Kısa ad" value={site.shortName} onChange={(v) => set("shortName", v)} />
        <Field label="Ticari unvan" value={site.legalName} onChange={(v) => set("legalName", v)} full />
        <Field label="Slogan" value={site.tagline} onChange={(v) => set("tagline", v)} full />
        <Field label="Telefon" value={site.phone} onChange={(v) => set("phone", v)} />
        <Field label="WhatsApp" value={site.whatsapp} onChange={(v) => set("whatsapp", v)} />
        <Field label="E-posta" value={site.email} onChange={(v) => set("email", v)} />
        <Field label="Adres" value={site.address} onChange={(v) => set("address", v)} full />
        <Field label="Çalışma saatleri" value={site.hours} onChange={(v) => set("hours", v)} />
        <Field label="Kuruluş yılı" value={String(site.founded)} onChange={(v) => set("founded", Number(v) || 2002)} />
        <Field label="Site URL" value={site.url} onChange={(v) => set("url", v)} full />
        <Field label="Harita embed URL" value={site.mapEmbedUrl} onChange={(v) => set("mapEmbedUrl", v)} full />
        <Field label="Instagram" value={site.socials.instagram} onChange={(v) => set("socials", { ...site.socials, instagram: v })} full />
        <Field label="LinkedIn" value={site.socials.linkedin} onChange={(v) => set("socials", { ...site.socials, linkedin: v })} full />
        <Field label="Facebook" value={site.socials.facebook} onChange={(v) => set("socials", { ...site.socials, facebook: v })} full />
      </section>

      <section className="rounded-xl border border-white/8 bg-[#151922] p-5">
        <h2 className="mb-4 font-semibold">Ana sayfa istatistikleri</h2>
        <div className="space-y-3">
          {site.stats.map((stat, i) => (
            <div key={i} className="grid gap-3 sm:grid-cols-3">
              <Field
                label="Değer"
                value={String(stat.value)}
                onChange={(v) => {
                  const stats = [...site.stats];
                  stats[i] = { ...stats[i], value: Number(v) || 0 };
                  set("stats", stats);
                }}
              />
              <Field
                label="Suffix"
                value={stat.suffix}
                onChange={(v) => {
                  const stats = [...site.stats];
                  stats[i] = { ...stats[i], suffix: v };
                  set("stats", stats);
                }}
              />
              <Field
                label="Etiket"
                value={stat.label}
                onChange={(v) => {
                  const stats = [...site.stats];
                  stats[i] = { ...stats[i], label: v };
                  set("stats", stats);
                }}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  full,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  full?: boolean;
}) {
  return (
    <label className={full ? "block sm:col-span-2" : "block"}>
      <span className="mb-1.5 block text-xs font-medium text-white/50">{label}</span>
      <input className="admin-input" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}
