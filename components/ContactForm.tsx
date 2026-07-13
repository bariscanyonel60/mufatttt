"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { contactSchema, type ContactPayload } from "@/lib/forms";

type FormData = Omit<ContactPayload, "website"> & { website?: string };

const inputCls =
  "w-full rounded-xl border border-line bg-white px-4 py-3.5 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/25";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { website: "" },
  });

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setServerError(json.error || "Gönderim başarısız. Lütfen tekrar deneyin.");
        return;
      }
      setSent(true);
    } catch {
      setServerError("Bağlantı hatası. Lütfen tekrar deneyin.");
    }
  };

  if (sent) {
    return (
      <div className="card flex flex-col items-center gap-4 p-12 text-center">
        <CheckCircle2 size={44} className="text-gold-deep" />
        <h3 className="font-display text-xl font-bold">Talebiniz alındı</h3>
        <p className="max-w-sm text-sm text-concrete">
          Ekibimiz bir iş günü içinde sizinle iletişime geçecek. Acil durumlar için WhatsApp hattımızı kullanabilirsiniz.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card relative space-y-5 p-8" noValidate>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-concrete">Ad Soyad</label>
          <input id="name" className={inputCls} placeholder="Adınız Soyadınız" {...register("name")} />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-concrete">Telefon</label>
          <input id="phone" className={inputCls} placeholder="05xx xxx xx xx" {...register("phone")} />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-concrete">E-posta</label>
        <input id="email" type="email" className={inputCls} placeholder="ornek@eposta.com" {...register("email")} />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="subject" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-concrete">Konu</label>
        <select id="subject" className={inputCls} defaultValue="" {...register("subject")}>
          <option value="" disabled>Hizmet seçin</option>
          <option>Statik Proje</option>
          <option>Çelik Konstrüksiyon</option>
          <option>Yapı Denetim / Kontrollük</option>
          <option>Deprem Performans Analizi</option>
          <option>İnşaat Danışmanlığı</option>
          <option>Diğer</option>
        </select>
        {errors.subject && <p className="mt-1 text-xs text-red-600">{errors.subject.message}</p>}
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-concrete">Mesajınız</label>
        <textarea id="message" rows={4} className={inputCls} placeholder="Projenizden kısaca bahsedin: konum, yapı tipi, tahmini metrekare…" {...register("message")} />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
      </div>
      {serverError && <p className="text-sm text-red-600" role="alert">{serverError}</p>}
      <button type="submit" disabled={isSubmitting} className="btn btn-gold w-full disabled:opacity-60">
        {isSubmitting ? "Gönderiliyor…" : <>Hızlı Teklif İste <Send size={15} /></>}
      </button>
      <p className="text-center text-[11px] text-concrete">
        Formu göndererek <a href="/gizlilik-politikasi" className="underline hover:text-gold-deep">Gizlilik Politikası</a>&apos;nı kabul etmiş olursunuz.
      </p>
    </form>
  );
}
