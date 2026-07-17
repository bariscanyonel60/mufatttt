"use client";

import { useEffect, useState } from "react";

type MediaFile = { name: string; url: string; size: number; updatedAt: string };

export default function MediaAdmin() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function load() {
    const res = await fetch("/api/admin/upload");
    const data = await res.json();
    setFiles(data.files || []);
  }

  useEffect(() => {
    void load();
  }, []);

  async function onUpload(fileList: FileList | null) {
    if (!fileList?.[0]) return;
    setUploading(true);
    setMsg("");
    setErr("");
    try {
      const fd = new FormData();
      fd.append("file", fileList[0]);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Yükleme başarısız");
      setMsg(`Yüklendi: ${data.url}`);
      await load();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Hata");
    } finally {
      setUploading(false);
    }
  }

  async function remove(name: string) {
    if (!confirm(`${name} silinsin mi?`)) return;
    await fetch(`/api/admin/upload?name=${encodeURIComponent(name)}`, { method: "DELETE" });
    await load();
  }

  async function copy(url: string) {
    await navigator.clipboard.writeText(url);
    setMsg(`Kopyalandı: ${url}`);
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Medya Kütüphanesi</h1>
          <p className="mt-1 text-sm text-white/45">
            Tüm görseller Cloudinary’de saklanır. Yükleyip URL kopyalayın; proje veya haber kapak alanına yapıştırın.
          </p>
        </div>
        <label className="cursor-pointer rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-white">
          {uploading ? "Yükleniyor…" : "Dosya yükle"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={(e) => onUpload(e.target.files)}
          />
        </label>
      </div>

      {(msg || err) && (
        <p className={`rounded-lg px-3 py-2 text-sm ${err ? "bg-red-500/15 text-red-300" : "bg-emerald-500/15 text-emerald-300"}`}>
          {err || msg}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {files.map((f) => (
          <div key={f.name} className="overflow-hidden rounded-xl border border-white/8 bg-[#151922]">
            <div className="flex h-36 items-center justify-center bg-black/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.url} alt={f.name} className="max-h-full max-w-full object-contain" />
            </div>
            <div className="space-y-2 p-3">
              <p className="truncate text-xs text-white/70">{f.name}</p>
              <p className="text-[11px] text-white/35">{(f.size / 1024).toFixed(1)} KB</p>
              <div className="flex gap-2">
                <button type="button" onClick={() => copy(f.url)} className="text-xs text-gold hover:underline">
                  URL kopyala
                </button>
                <button type="button" onClick={() => remove(f.name)} className="text-xs text-red-300 hover:underline">
                  Sil
                </button>
              </div>
            </div>
          </div>
        ))}
        {files.length === 0 && (
          <p className="col-span-full text-sm text-white/40">Henüz yüklenen medya yok.</p>
        )}
      </div>
    </div>
  );
}
