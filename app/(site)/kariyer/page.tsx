import type { Metadata } from "next";
import PageHero from "@/components/molecules/PageHero";
import Reveal from "@/components/atoms/Reveal";
import CareerForm from "@/components/organisms/CareerForm";
import { liveJobs } from "@/lib/live";
import { MapPin, Briefcase } from "lucide-react";

const CAREER_EMAIL =
  process.env.CAREER_TO_EMAIL?.trim() || "insankaynaklari@mufatinsaat.com";

export const metadata: Metadata = {
  title: "Kariyer — Ekibimize Katılın",
  description: "MUFAT İnşaat Mühendisliği'nde açık pozisyonlar: statik mühendisi, saha kontrol mühendisi ve staj imkânları.",
};

export default async function Page() {
  const jobs = await liveJobs();
  return (
    <>
      <PageHero
        eyebrow="Kariyer"
        title="İyi mühendisler, iyi işlerde yetişir."
        lead="Turhal'dan bölgeye uzanan projelerde; mentörlük, gerçek sorumluluk ve öğrenmeye ayrılmış zaman ile çalışın."
      />
      <section className="container-x grid gap-12 py-24 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          {jobs.map((j, i) => (
            <Reveal key={j.id} delay={i * 0.06}>
              <article id={j.id} className="card p-8">
                <h2 className="font-display text-xl font-bold">{j.title}</h2>
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-concrete">
                  <span className="inline-flex items-center gap-1.5"><Briefcase size={14} /> {j.type}</span>
                  <span className="inline-flex items-center gap-1.5"><MapPin size={14} /> {j.location}</span>
                </div>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-concrete">{j.desc}</p>
              </article>
            </Reveal>
          ))}
          <Reveal>
            <p className="text-sm text-concrete">
              Açık pozisyon göremediniz mi? Formdan genel başvuru bırakın veya{" "}
              <a className="font-semibold text-gold-deep hover:underline" href={`mailto:${CAREER_EMAIL}`}>
                {CAREER_EMAIL}
              </a>
              {" "}adresine yazın.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <h2 className="mb-6 font-display text-2xl font-bold">Başvuru formu</h2>
          <CareerForm jobs={jobs} />
        </Reveal>
      </section>
    </>
  );
}
