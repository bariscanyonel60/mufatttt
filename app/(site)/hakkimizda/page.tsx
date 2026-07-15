import type { Metadata } from "next";
import PageHero from "@/components/molecules/PageHero";
import Reveal from "@/components/atoms/Reveal";
import SectionHead from "@/components/molecules/SectionHead";
import CTA from "@/components/organisms/CTA";
import MilestoneTimeline from "@/components/organisms/MilestoneTimeline";
import { liveSite, liveValues, liveMilestones, liveTeam } from "@/lib/live";

export const metadata: Metadata = {
  title: "Hakkımızda — MUFAT İnşaat Mühendislik",
  description: "2002'den bu yana MUFAT İnşaat Mühendislik: inşaat, mühendislik, mimarlık, taahhüt ve kontrolörlük. Ekibimiz ve kurumsal hikâyemiz.",
};

export default async function Page() {
  const site = await liveSite();
  const values = await liveValues();
  const milestones = await liveMilestones();
  const team = await liveTeam();
  return (
    <>
      <PageHero
        eyebrow="Hakkımızda"
        title="İnşaat, mühendislik ve mimarlık tek çatı altında."
        lead={`${site.legalName}, ${site.founded} yılında kuruldu. İnşaat — mühendislik — mimarlık ile taahhüt ve kontrolörlük alanlarında özel ve resmi işverenlere hizmet veriyoruz.`}
      />

      <section className="container-x grid gap-16 py-24 lg:grid-cols-2">
        <Reveal>
          <span className="eyebrow">Hikâyemiz</span>
          <h2 className="h-display mt-5 text-4xl">MUFAT İnşaat Mühendislik</h2>
          <div className="prose-mufat mt-6">
            <p>
              {site.founded}&apos;den bu yana plan/proje mühendisliğinden özel bina inşaatına, kat karşılığından
              TKDK/IPARD yatırımlarına; kamu ihale işlerinden güçlendirme ve riskli yapı tespitine kadar geniş bir yelpazede çalışıyoruz.
            </p>
            <p>
              4734 ve 2886 sayılı kanunlar kapsamında resmi kurum işleri ile şantiye şefliği, kontrollük, denetim ve
              müşavirlik hizmetlerini aynı disiplinle yürütüyoruz.
            </p>
            <p>
              Ekibimizde inşaat mühendisliği, iç mimarlık ve makina mühendisliği bir arada; böylece proje ve yapım
              süreçlerini bütüncül yönetebiliyoruz.
            </p>
          </div>
        </Reveal>
        <div className="grid content-start gap-5 sm:grid-cols-2">
          <Reveal delay={0.1}>
            <div className="card h-full p-8">
              <h3 className="font-display text-lg font-bold">Misyon</h3>
              <p className="mt-3 text-sm leading-relaxed text-concrete">Özel ve kamu işverenlerine güvenli, mevzuata uygun ve zamanında teslim edilen mühendislik ile inşaat çözümleri sunmak.</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="card h-full bg-ink p-8">
              <h3 className="font-display text-lg font-bold text-gold">Vizyon</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">Bölgemizde proje, taahhüt ve kontrollük denince akla gelen güvenilir adres olmak.</p>
            </div>
          </Reveal>
          <Reveal delay={0.3} className="sm:col-span-2">
            <div className="card p-8">
              <h3 className="font-display text-lg font-bold">Faaliyet alanlarımız</h3>
              <p className="mt-3 text-sm leading-relaxed text-concrete">{site.tagline}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-24">
        <div className="container-x">
          <SectionHead eyebrow="Ekibimiz" title="Disiplinlerarası kadro." lead="İnşaat, iç mimarlık ve makina mühendisliği ile projeyi uçtan uca yönetiyoruz." />
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.08}>
                <div className="card h-full p-8">
                  <p className="font-display text-xl font-bold">{m.name}</p>
                  <p className="mt-2 text-sm font-medium text-gold-deep">{m.role}</p>
                  {m.phone ? (
                    <a href={`tel:${m.phone.replace(/\s/g, "")}`} className="mt-4 inline-block text-sm text-concrete transition hover:text-gold-deep">
                      {m.phone}
                    </a>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-x">
          <SectionHead eyebrow="Değerlerimiz" title="Bizi biz yapan ilkeler." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 3) * 0.08}>
                <div className="card h-full p-8">
                  <span className="font-display text-sm font-bold text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-display text-lg font-bold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-concrete">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <MilestoneTimeline
        milestones={milestones}
        founded={site.founded}
        stats={site.stats ?? []}
      />

      <CTA />
    </>
  );
}
