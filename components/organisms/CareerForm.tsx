"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link";
import { Send, CheckCircle2, Paperclip } from "lucide-react";
import { careerSchema, type CareerPayload } from "@/lib/forms";
import type { Job } from "@/lib/data";
import TurnstileWidget, { turnstileConfigured } from "@/components/molecules/TurnstileWidget";

type FormData = CareerPayload;

const inputCls =
  "w-full rounded-xl border border-line bg-white px-4 py-3.5 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/25";

const CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const CV_MAX = 5 * 1024 * 1024;

export default function CareerForm({ jobs, defaultJobId }: { jobs: Job[]; defaultJobId?: string }) {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(careerSchema),
    defaultValues: {
      website: "",
      jobId: defaultJobId || "",
      consent: undefined as unknown as true,
      cvUrl: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    if (turnstileConfigured() && !turnstileToken) {
      setServerError("Lütfen güvenlik doğrulamasını tamamlayın.");
      return;
    }
    if (cvFile) {
      if (!CV_TYPES.includes(cvFile.type)) {
        setServerError("CV yalnızca PDF veya Word (DOC/DOCX) olabilir.");
        return;
      }
      if (cvFile.size > CV_MAX) {
        setServerError("CV dosyası en fazla 5 MB olabilir.");
        return;
      }
    }

    try {
      const form = new FormData();
      form.set("name", data.name);
      form.set("phone", data.phone);
      form.set("email", data.email);
      form.set("jobId", data.jobId);
      form.set("message", data.message);
      form.set("consent", "true");
      form.set("website", data.website || "");
      if (turnstileToken) form.set("turnstileToken", turnstileToken);
      if (cvFile) form.set("cv", cvFile);

      const res = await fetch("/api/career", { method: "POST", body: form });
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
          <option value="other">Diğer</option>
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

      <div>
        <label htmlFor="career-cv" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-concrete">
          CV (isteğe bağlı)
        </label>
        <label
          htmlFor="career-cv"
          className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-line bg-white px-4 py-3.5 text-sm text-concrete transition hover:border-gold"
        >
          <Paperclip size={16} className="shrink-0 text-gold-deep" aria-hidden />
          <span className="truncate">
            {cvFile ? cvFile.name : "PDF veya Word yükleyin (max 5 MB)"}
          </span>
        </label>
        <input
          id="career-cv"
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="sr-only"
          onChange={(e) => setCvFile(e.target.files?.[0] ?? null)}
        />
      </div>

      <label className="flex cursor-pointer items-start gap-3 text-sm text-concrete">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-line text-gold focus:ring-gold/30"
          {...register("consent")}
          onChange={(e) => setValue("consent", e.target.checked as true, { shouldValidate: true })}
        />
        <span>
          <Link href="/gizlilik-politikasi" className="font-medium text-ink underline hover:text-gold-deep">
            Gizlilik Politikası
          </Link>
          &apos;nı okudum; başvuru sürecinde kişisel verilerimin işlenmesini kabul ediyorum.
        </span>
      </label>
      {errors.consent && <p className="text-xs text-red-600" role="alert">{errors.consent.message}</p>}

      <TurnstileWidget onToken={setTurnstileToken} />

      {serverError && <p className="text-sm text-red-600" role="alert">{serverError}</p>}
      <button type="submit" disabled={isSubmitting} className="btn btn-gold w-full disabled:opacity-60">
        {isSubmitting ? "Gönderiliyor…" : <>Başvuruyu Gönder <Send size={15} /></>}
      </button>
    </form>
  );
}
