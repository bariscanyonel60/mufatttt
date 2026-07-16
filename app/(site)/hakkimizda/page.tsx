import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Compass, Eye, MapPin, Target } from "lucide-react";
import PageHeroMedia from "@/components/molecules/PageHeroMedia";
import Reveal from "@/components/atoms/Reveal";
import SectionHead from "@/components/molecules/SectionHead";
import CTA from "@/components/organisms/CTA";
import MilestoneTimeline from "@/components/organisms/MilestoneTimeline";
import { liveSite, liveValues, liveMilestones, liveTeam } from "@/lib/live";

export const metadata: Metadata = {
  title: "Hakkımızda — MUFAT İnşaat Mühendislik",
  description:
    "2002'de Turhal'da kurulan MUFAT İnşaat Mühendislik; Tokat ve çevre illerde müteahhitlik, plan/proje, güçlendirme, TKDK/IPARD ve kamu ihale işleri.",
};

const SERVICE_AREAS = [
  "Müteahhitlik ve özel bina inşaatı yapımı",
  "Ruhsata yönelik plan / proje / taahhüt işleri",
  "Keşif, metraj ve maliyet hesabı",
  "Çelik bina yapımı ve betonarme",
  "Çelik güçlendirme ve onarım işleri",
  "Kat karşılığı inşaat yapımı",
  "Ahır binaları",
  "TKDK / IPARD projesi ruhsat alımı",
  "Okul ve kamu binaları ihale işleri",
  "Ağır sanayi binaları",
  "Plan, proje, inşaat, tadilat, onarım ve güçlendirme",
];

const REGIONS = [
  "Turhal",
  "Zile",
  "Niksar",
  "Erbaa",
  "Pazar",
  "Amasya",
  "Samsun",
  "Yozgat",
  "Çorum",
  "Sivas",
];

const MISSION_POINTS = [
  "Güvenli ve mevzuata uygun yapı üretmek",
  "Plan/proje ile müteahhitliği aynı disiplinle yürütmek",
  "Zamanında, şeffaf ve hesaplı teslim sağlamak",
  "Özel ve kamu işverenine eşit özen göstermek",
];

const VISION_POINTS = [
  "Bölgede proje ve taahhütte ilk akla gelen adres olmak",
  "Kalite ve mühendislik güveniyle büyümeyi sürdürmek",
  "Yerel ihtiyaçlara çağdaş çözümler üretmek",
  "Uzun ömürlü yapılara imza atmaya devam etmek",
];

export default async function Page() {
  const site = await liveSite();
  const values = await liveValues();
  const milestones = await liveMilestones();
  const team = await liveTeam();
  const years = new Date().getFullYear() - Number(site.founded);

  return (
    <>
      <PageHeroMedia
        eyebrow="Hakkımızda"
        title="Güvenle inşa ediyoruz."
        lead={`${site.founded}'den bu yana mühendislik, kaliteli işçilik ve müşteri odaklı anlayışla kalıcı yapılar üretiyoruz.`}
        image="/images/about-banner.png"
        imageAlt="MUFAT İnşaat Mühendislik — Güvenle inşa ediyoruz"
        imagePosition="center"
      />

      <section className="container-x grid gap-16 py-20 md:py-28 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <span className="eyebrow">Hikâyemiz</span>
          <h2 className="h-display mt-5 text-4xl md:text-5xl">Turhal&apos;dan bölgeye uzanan bir mühendislik yolculuğu.</h2>
          <div className="prose-mufat mt-8 space-y-5">
            <p>
              Firmamız {site.founded} yılında Turhal&apos;da kurulmuştur. {site.founded}&apos;den bu yana başta
              Turhal / Tokat olmak üzere Zile, Niksar, Erbaa ve Pazar ilçelerine; Amasya, Samsun, Yozgat, Çorum ve
              Sivas gibi çevre bölge illerimize de hizmet vermekteyiz. Daha öncesinde de bu bölgelerde iş yapmış
              bulunmaktayız.
            </p>
            <p>
              Mühendislik tecrübemiz ve müşteri odaklı anlayışımızla müteahhitlikten özel bina inşaatına, ruhsata
              yönelik plan/proje taahhütünden keşif-metraj ve maliyet hesabına; çelik ve betonarme yapıdan güçlendirme
              ve onarıma kadar geniş bir yelpazede çalışıyoruz.
            </p>
            <p>
              Kat karşılığı inşaat, ahır binaları, TKDK / IPARD projesi ruhsat alımı, okul ve kamu binaları ihale
              işleri ile ağır sanayi binaları da hizmet alanlarımızdadır. Mesleğimizin gerektirdiği her türlü plan,
              proje, inşaat, tadilat, onarım ve güçlendirme işleri firmamız bünyesinde yapılmaktadır.
            </p>
          </div>
          <Link href="/projeler" className="btn btn-ghost-light mt-10">
            Projelerimizi inceleyin <ArrowUpRight size={15} />
          </Link>
        </Reveal>

        <div className="grid content-start gap-4">
          <Reveal delay={0.08}>
            <div className="card overflow-hidden p-0">
              <div className="border-b border-line bg-paper px-7 py-5">
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-deep">
                  <MapPin size={14} /> Hizmet bölgemiz
                </p>
              </div>
              <div className="flex flex-wrap gap-2 p-7">
                {REGIONS.map((r) => (
                  <span
                    key={r}
                    className="rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-medium text-ink"
                  >
                    {r}
                  </span>
                ))}
              </div>
              <p className="border-t border-line px-7 py-5 text-sm leading-relaxed text-concrete">
                Tokat merkezli; çevre ilçe ve illerde plan, proje ve müteahhitlik hizmeti.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="card grid grid-cols-2 gap-px overflow-hidden bg-line p-0">
              <div className="bg-white p-7">
                <p className="font-display text-3xl font-extrabold text-ink">{site.founded}</p>
                <p className="mt-2 text-sm text-concrete">Kuruluş yılı</p>
              </div>
              <div className="bg-white p-7">
                <p className="font-display text-3xl font-extrabold text-ink">{years}+</p>
                <p className="mt-2 text-sm text-concrete">Yıllık deneyim</p>
              </div>
              <div className="bg-white p-7">
                <p className="font-display text-3xl font-extrabold text-ink">{REGIONS.length}</p>
                <p className="mt-2 text-sm text-concrete">Hizmet bölgesi</p>
              </div>
              <div className="bg-ink p-7">
                <p className="font-display text-3xl font-extrabold text-gold">Tek</p>
                <p className="mt-2 text-sm text-white/55">Çatıda proje + yapım</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink py-24 md:py-28" aria-label="Misyon ve vizyon">
        <div className="container-x">
          <Reveal>
            <span className="eyebrow !text-gold">Misyon &amp; Vizyon</span>
            <h2 className="h-display mt-5 max-w-3xl text-4xl text-white md:text-5xl">
              Ne için çalışıyoruz, nereye gidiyoruz.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/50 md:text-lg">
              Her projemizde mühendislik disiplinini sahadaki uygulamayla birleştirir; güvenli, sürdürülebilir ve
              zamanında teslim edilen yapılar hedefleriz.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <Reveal delay={0.08}>
              <article className="flex h-full flex-col rounded-feature border border-white/10 bg-white/[0.04] p-8 md:p-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <Target size={22} />
                </div>
                <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">Misyonumuz</p>
                <h3 className="mt-3 font-display text-2xl font-bold text-white md:text-3xl">
                  Güvenli yapı, doğru mühendislik, zamanında teslim.
                </h3>
                <p className="mt-5 text-sm leading-relaxed text-white/55 md:text-base">
                  Özel ve kamu işverenlerine; plan/projeden müteahhitliğe kadar uçtan uca, mevzuata uygun, denetlenebilir
                  ve güvenli inşaat çözümleri sunmak. Sahada hesap verebilir olmak, işverenle şeffaf iletişim kurmak ve
                  her teslimde kaliteyi belgelemek temel sorumluluğumuzdur.
                </p>
                <ul className="mt-8 space-y-3 border-t border-white/10 pt-8">
                  {MISSION_POINTS.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/70">
                      <Compass size={16} className="mt-0.5 shrink-0 text-gold" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>

            <Reveal delay={0.16}>
              <article className="flex h-full flex-col rounded-feature border border-gold/25 bg-gradient-to-b from-gold/15 to-transparent p-8 md:p-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-gold/10 text-gold">
                  <Eye size={22} />
                </div>
                <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">Vizyonumuz</p>
                <h3 className="mt-3 font-display text-2xl font-bold text-white md:text-3xl">
                  Bölgede güvenin ve referansın adresi olmak.
                </h3>
                <p className="mt-5 text-sm leading-relaxed text-white/55 md:text-base">
                  Tokat ve çevre illerde proje, taahhüt ve inşaat denince akla gelen; mühendislik kalitesiyle tanınan,
                  uzun yıllardır sahada kanıtlanmış bir kurum olarak büyümeyi sürdürmek. Yerel ihtiyaçlara çağdaş
                  çözümler üretirken, nesiller boyu ayakta kalacak yapılar bırakmayı hedefliyoruz.
                </p>
                <ul className="mt-8 space-y-3 border-t border-white/10 pt-8">
                  {VISION_POINTS.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/70">
                      <Compass size={16} className="mt-0.5 shrink-0 text-gold" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-paper py-24">
        <div className="container-x">
          <SectionHead
            eyebrow="İş alanlarımız"
            title="Hizmetlerimiz ve faaliyet alanlarımız."
            lead="Müteahhitlikten plan/projeye, güçlendirmeden kamu ihale işlerine kadar tek çatı altında."
          />
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_AREAS.map((item, i) => (
              <Reveal key={item} delay={(i % 3) * 0.06}>
                <li className="flex gap-3 rounded-2xl border border-line bg-white px-5 py-4 text-sm leading-relaxed text-ink">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                  {item}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-x">
          <SectionHead
            eyebrow="Ekibimiz"
            title="Disiplinlerarası kadro."
            lead="İnşaat, iç mimarlık ve makina mühendisliği ile projeyi uçtan uca yönetiyoruz."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.08}>
                <div className="card h-full p-8">
                  <p className="font-display text-xl font-bold">{m.name}</p>
                  <p className="mt-2 text-sm font-medium text-gold-deep">{m.role}</p>
                  {m.phone ? (
                    <a
                      href={`tel:${m.phone.replace(/\s/g, "")}`}
                      className="mt-4 inline-block text-sm text-concrete transition hover:text-gold-deep"
                    >
                      {m.phone}
                    </a>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-24">
        <div className="container-x">
          <SectionHead eyebrow="Değerlerimiz" title="Bizi biz yapan ilkeler." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 3) * 0.08}>
                <div className="card h-full p-8">
                  <span className="font-display text-sm font-bold text-gold-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-concrete">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <MilestoneTimeline milestones={milestones} founded={site.founded} stats={site.stats ?? []} />

      <CTA />
    </>
  );
}
