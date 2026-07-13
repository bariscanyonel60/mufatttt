"use client";

import { useEffect, useState } from "react";
import type { Submission, SubmissionStatus } from "@/lib/admin/types";

export default function SubmissionsAdmin() {
  const [items, setItems] = useState<Submission[]>([]);
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const params = new URLSearchParams();
    if (type !== "all") params.set("type", type);
    if (status !== "all") params.set("status", status);
    if (q.trim()) params.set("q", q.trim());
    const res = await fetch(`/api/admin/submissions?${params}`);
    const data = await res.json();
    setItems(data.items || []);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, [type, status]);

  async function setStatusOf(id: string, next: SubmissionStatus) {
    const res = await fetch("/api/admin/submissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: next }),
    });
    const data = await res.json();
    if (res.ok) {
      setItems((list) => list.map((i) => (i.id === id ? data : i)));
      if (selected?.id === id) setSelected(data);
    }
  }

  async function remove(id: string) {
    if (!confirm("Başvuru silinsin mi?")) return;
    await fetch(`/api/admin/submissions?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    setItems((list) => list.filter((i) => i.id !== id));
    if (selected?.id === id) setSelected(null);
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold">Başvurular</h1>
        <p className="mt-1 text-sm text-white/45">İletişim ve kariyer formları gelen kutusu</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <select className="admin-input !w-auto" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="all">Tüm tipler</option>
          <option value="contact">İletişim</option>
          <option value="career">Kariyer</option>
        </select>
        <select className="admin-input !w-auto" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">Tüm durumlar</option>
          <option value="new">Yeni</option>
          <option value="read">Okundu</option>
          <option value="replied">Yanıtlandı</option>
          <option value="archived">Arşiv</option>
        </select>
        <input
          className="admin-input max-w-xs"
          placeholder="Ara…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && load()}
        />
        <button type="button" onClick={load} className="rounded-lg border border-white/10 px-3 py-2 text-sm text-white/70">
          Filtrele
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_380px]">
        <div className="overflow-hidden rounded-xl border border-white/8 bg-[#151922]">
          {loading ? (
            <p className="p-6 text-sm text-white/40">Yükleniyor…</p>
          ) : items.length === 0 ? (
            <p className="p-6 text-sm text-white/40">Başvuru yok.</p>
          ) : (
            <ul>
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelected(item);
                      if (item.status === "new") void setStatusOf(item.id, "read");
                    }}
                    className={`flex w-full items-start justify-between gap-3 border-b border-white/5 px-4 py-3 text-left transition hover:bg-white/[0.03] ${
                      selected?.id === item.id ? "bg-gold/10" : ""
                    }`}
                  >
                    <div>
                      <p className="font-medium text-white/90">{item.name}</p>
                      <p className="text-xs text-white/40">
                        {item.type === "contact" ? item.subject : item.jobTitle} ·{" "}
                        {new Date(item.createdAt).toLocaleString("tr-TR")}
                      </p>
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] uppercase ${
                      item.status === "new" ? "bg-gold/20 text-gold" : "bg-white/10 text-white/45"
                    }`}>
                      {item.status}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-xl border border-white/8 bg-[#151922] p-5">
          {!selected ? (
            <p className="text-sm text-white/40">Detay için bir başvuru seçin.</p>
          ) : (
            <div className="space-y-3 text-sm">
              <h2 className="font-display text-lg font-bold">{selected.name}</h2>
              <p><span className="text-white/40">E-posta:</span> <a className="text-gold" href={`mailto:${selected.email}`}>{selected.email}</a></p>
              <p><span className="text-white/40">Telefon:</span> <a className="text-gold" href={`tel:${selected.phone}`}>{selected.phone}</a></p>
              <p>
                <span className="text-white/40">Konu:</span>{" "}
                {selected.type === "contact" ? selected.subject : selected.jobTitle}
              </p>
              <p className="whitespace-pre-wrap rounded-lg bg-black/30 p-3 text-white/80">{selected.message}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {(["new", "read", "replied", "archived"] as SubmissionStatus[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatusOf(selected.id, s)}
                    className={`rounded-full px-3 py-1 text-xs ${selected.status === s ? "bg-gold text-ink" : "border border-white/15 text-white/60"}`}
                  >
                    {s}
                  </button>
                ))}
                <button type="button" onClick={() => remove(selected.id)} className="rounded-full border border-red-400/30 px-3 py-1 text-xs text-red-300">
                  Sil
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
