import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import Counter from "@/components/Counter";
import CTA from "@/components/CTA";
import { liveSite, liveValues, liveMilestones, liveTeam } from "@/lib/live";

export const metadata: Metadata = {
  title: "Hakkımızda — MUFAT İnşaat Mühendislik",
  description: "2002'den bu yana MUFAT İnşaat Mühendislik: inşaat, mühendislik, mimarlık, taahhüt ve kontrolörlük. Ekibimiz ve kurumsal hikâyemiz.",
};

export default function Page() {
  const site = liveSite();
  const values = liveValues();
  const milestones = liveMilestones();
  const team = liveTeam();
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

      <section className="grid-lines bg-ink py-24">
        <div className="container-x">
          <SectionHead dark eyebrow="Kilometre Taşları" title={`${new Date().getFullYear() - site.founded} yılın özeti.`} />
          <div className="relative mt-16 space-y-12 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-white/15 md:before:left-1/2">
            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={0.05}>
                <div className={`relative flex flex-col gap-3 pl-10 md:w-1/2 md:pl-0 ${i % 2 ? "md:ml-auto md:pl-14" : "md:pr-14 md:text-right"}`}>
                  <span className={`absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-gold bg-ink md:left-auto ${i % 2 ? "md:-left-[7.5px]" : "md:-right-[7.5px]"}`} />
                  <span className="font-display text-3xl font-extrabold text-gold">{m.year}</span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">{m.title}</h3>
                    <p className="mt-1 text-sm text-white/50">{m.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <dl className="mt-24 grid grid-cols-2 gap-8 border-t border-white/10 pt-16 md:grid-cols-4">
            {site.stats.map((s) => (
              <div key={s.label} className="text-center">
                <dd className="font-display text-5xl font-extrabold text-white"><Counter value={s.value} suffix={s.suffix} /></dd>
                <dt className="mt-2 text-xs text-white/50">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CTA />
    </>
  );
}
