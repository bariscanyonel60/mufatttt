"use client";

import { useEffect, useMemo, useState } from "react";
import type { CollectionMeta, FieldDef } from "@/lib/admin/schema";

type Item = Record<string, unknown>;

export default function CollectionManager({
  meta,
  initialItems,
}: {
  meta: CollectionMeta;
  initialItems: Item[];
}) {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<Item | null>(null);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  useEffect(() => setItems(initialItems), [initialItems]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((item) =>
      Object.values(item).some((v) => String(v ?? "").toLowerCase().includes(s)),
    );
  }, [items, q]);

  function startCreate() {
    setError("");
    setOk("");
    setEditing({ ...meta.defaults });
    setCreating(true);
  }

  function startEdit(item: Item) {
    setError("");
    setOk("");
    setEditing(structuredClone(item));
    setCreating(false);
  }

  async function save() {
    if (!editing) return;
    setSaving(true);
    setError("");
    setOk("");
    try {
      const id = String(editing[meta.idKey] ?? "");
      if (!id) throw new Error(`${meta.idKey} zorunlu`);

      const url = creating
        ? `/api/admin/content/${meta.key}`
        : `/api/admin/content/${meta.key}/${encodeURIComponent(id)}`;

      const res = await fetch(url, {
        method: creating ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Kayıt başarısız");

      setItems(data[meta.key] as Item[]);
      setEditing(null);
      setCreating(false);
      setOk("Kaydedildi.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Hata");
    } finally {
      setSaving(false);
    }
  }

  async function remove(item: Item) {
    const id = String(item[meta.idKey]);
    if (!confirm(`“${item[meta.labelKey]}” silinsin mi?`)) return;
    setError("");
    const res = await fetch(`/api/admin/content/${meta.key}/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Silinemedi");
      return;
    }
    setItems(data[meta.key] as Item[]);
    setOk("Silindi.");
    if (editing && String(editing[meta.idKey]) === id) setEditing(null);
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">{meta.title}</h1>
          <p className="mt-1 text-sm text-white/45">{items.length} kayıt</p>
        </div>
        <button
          type="button"
          onClick={startCreate}
          className="rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gold-soft"
        >
          + Yeni {meta.singular}
        </button>
      </div>

      {(error || ok) && (
        <p className={`rounded-lg px-3 py-2 text-sm ${error ? "bg-red-500/15 text-red-300" : "bg-emerald-500/15 text-emerald-300"}`}>
          {error || ok}
        </p>
      )}

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Ara…"
        className="admin-input max-w-md"
      />

      <div className="overflow-hidden rounded-xl border border-white/8 bg-[#151922]">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/8 text-[11px] uppercase tracking-wider text-white/40">
            <tr>
              <th className="px-4 py-3 font-medium">{meta.labelKey}</th>
              <th className="hidden px-4 py-3 font-medium md:table-cell">{meta.idKey}</th>
              <th className="px-4 py-3 text-right font-medium">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={String(item[meta.idKey])} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="px-4 py-3 font-medium text-white/90">{String(item[meta.labelKey])}</td>
                <td className="hidden px-4 py-3 font-mono text-xs text-white/40 md:table-cell">
                  {String(item[meta.idKey])}
                </td>
                <td className="px-4 py-3 text-right">
                  <button type="button" onClick={() => startEdit(item)} className="mr-2 text-gold hover:underline">
                    Düzenle
                  </button>
                  <button type="button" onClick={() => remove(item)} className="text-red-400 hover:underline">
                    Sil
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-10 text-center text-white/40">
                  Kayıt yok
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 sm:items-center">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#151922] p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold">
                {creating ? `Yeni ${meta.singular}` : `${meta.singular} düzenle`}
              </h2>
              <button type="button" onClick={() => setEditing(null)} className="text-white/50 hover:text-white">
                Kapat
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {meta.fields.map((field) => (
                <Field
                  key={field.key}
                  field={field}
                  value={editing[field.key]}
                  disabled={!creating && field.key === meta.idKey}
                  onChange={(v) => setEditing({ ...editing, [field.key]: v })}
                />
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/70"
              >
                İptal
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={save}
                className="rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
              >
                {saving ? "Kaydediliyor…" : "Kaydet"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({
  field,
  value,
  onChange,
  disabled,
}: {
  field: FieldDef;
  value: unknown;
  onChange: (v: unknown) => void;
  disabled?: boolean;
}) {
  const cls = `admin-input ${field.full ? "sm:col-span-2" : ""}`;

  if (field.type === "textarea") {
    return (
      <label className={cls.includes("sm:col-span-2") ? "sm:col-span-2 block" : "block"}>
        <span className="mb-1.5 block text-xs font-medium text-white/50">{field.label}</span>
        <textarea
          className="admin-input min-h-[100px]"
          value={String(value ?? "")}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
        />
        {field.hint && <span className="mt-1 block text-[11px] text-white/35">{field.hint}</span>}
      </label>
    );
  }

  if (field.type === "select") {
    return (
      <label className="block">
        <span className="mb-1.5 block text-xs font-medium text-white/50">{field.label}</span>
        <select
          className="admin-input"
          value={String(value ?? "")}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
        >
          {(field.options || []).map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </label>
    );
  }

  if (field.type === "number") {
    return (
      <label className="block">
        <span className="mb-1.5 block text-xs font-medium text-white/50">{field.label}</span>
        <input
          type="number"
          className="admin-input"
          value={Number(value ?? 0)}
          disabled={disabled}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </label>
    );
  }

  if (field.type === "tags") {
    const arr = Array.isArray(value) ? (value as string[]) : [];
    return (
      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-white/50">{field.label}</span>
        <input
          className="admin-input"
          value={arr.join(", ")}
          disabled={disabled}
          onChange={(e) =>
            onChange(
              e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            )
          }
        />
        {field.hint && <span className="mt-1 block text-[11px] text-white/35">{field.hint}</span>}
      </label>
    );
  }

  if (field.type === "paragraphs") {
    const arr = Array.isArray(value) ? (value as string[]) : [""];
    return (
      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-white/50">{field.label}</span>
        <textarea
          className="admin-input min-h-[160px]"
          value={arr.join("\n\n")}
          disabled={disabled}
          onChange={(e) =>
            onChange(
              e.target.value
                .split(/\n\s*\n/)
                .map((s) => s.trim())
                .filter(Boolean),
            )
          }
        />
        <span className="mt-1 block text-[11px] text-white/35">Paragrafları boş satırla ayırın</span>
      </label>
    );
  }

  return (
    <label className={field.full ? "block sm:col-span-2" : "block"}>
      <span className="mb-1.5 block text-xs font-medium text-white/50">{field.label}</span>
      <input
        className="admin-input"
        value={String(value ?? "")}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      />
      {field.hint && <span className="mt-1 block text-[11px] text-white/35">{field.hint}</span>}
    </label>
  );
}
