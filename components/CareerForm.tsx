"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { careerSchema, type CareerPayload } from "@/lib/forms";
import type { Job } from "@/lib/data";

type FormData = CareerPayload;

const inputCls =
  "w-full rounded-xl border border-line bg-white px-4 py-3.5 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/25";

export default function CareerForm({ jobs, defaultJobId }: { jobs: Job[]; defaultJobId?: string }) {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(careerSchema),
    defaultValues: { website: "", jobId: defaultJobId || "" },
  });

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    try {
      const res = await fetch("/api/career", {
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
      <div className="card flex flex-col items-center gap-4 p-10 text-center">
        <CheckCircle2 size={44} className="text-gold-deep" />
        <h3 className="font-display text-xl font-bold">Başvurunuz alındı</h3>
        <p className="max-w-sm text-sm text-concrete">
          İnsan kaynakları ekibimiz başvurunuzu inceleyecek ve uygun görürse sizinle iletişime geçecektir.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card relative space-y-5 p-8" noValidate>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="career-website">Website</label>
        <input id="career-website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
      <div>
        <label htmlFor="jobId" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-concrete">Pozisyon</label>
        <select id="jobId" className={inputCls} {...register("jobId")}>
          <option value="" disabled>Pozisyon seçin</option>
          {jobs.map((j) => (
            <option key={j.id} value={j.id}>{j.title}</option>
          ))}
        </select>
        {errors.jobId && <p className="mt-1 text-xs text-red-600">{errors.jobId.message}</p>}
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="career-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-concrete">Ad Soyad</label>
          <input id="career-name" className={inputCls} {...register("name")} />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="career-phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-concrete">Telefon</label>
          <input id="career-phone" className={inputCls} {...register("phone")} />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="career-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-concrete">E-posta</label>
        <input id="career-email" type="email" className={inputCls} {...register("email")} />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="career-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-concrete">Mesaj / CV özeti</label>
        <textarea id="career-message" rows={4} className={inputCls} placeholder="Deneyiminiz, eğitiminiz ve motivasyonunuz…" {...register("message")} />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
      </div>
      {serverError && <p className="text-sm text-red-600" role="alert">{serverError}</p>}
      <button type="submit" disabled={isSubmitting} className="btn btn-gold w-full disabled:opacity-60">
        {isSubmitting ? "Gönderiliyor…" : <>Başvuruyu Gönder <Send size={15} /></>}
      </button>
    </form>
  );
}
