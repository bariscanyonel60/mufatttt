import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description: "MUFAT İnşaat Mühendisliği web sitesi çerez kullanım politikası.",
  robots: { index: false },
};

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Yasal" title="Çerez Politikası" lead="Web sitemizde kullanılan çerezler ve tercihlerinizi nasıl yönetebileceğiniz hakkında bilgilendirme." />
      <section className="container-x py-20">
        <div className="prose-mufat mx-auto max-w-3xl">
          <p>Çerezler, web sitemizi ziyaret ettiğinizde tarayıcınıza kaydedilen küçük metin dosyalarıdır. Sitemizde deneyiminizi iyileştirmek amacıyla sınırlı sayıda çerez kullanılmaktadır.</p>
          <h2 className="mb-3 mt-10 font-display text-xl font-bold text-ink">Zorunlu Çerezler</h2>
          <p>Sitenin temel işlevlerinin çalışması için gereklidir ve devre dışı bırakılamaz. Kişisel veri toplamazlar.</p>
          <h2 className="mb-3 mt-10 font-display text-xl font-bold text-ink">Analitik Çerezler</h2>
          <p>Ziyaretçi trafiğini anonim olarak ölçmek için kullanılabilir. Bu çerezler yalnızca açık rızanız ile etkinleştirilir.</p>
          <h2 className="mb-3 mt-10 font-display text-xl font-bold text-ink">Çerezleri Yönetme</h2>
          <p>Tarayıcınızın ayarlar bölümünden çerezleri silebilir veya engelleyebilirsiniz. Zorunlu çerezlerin engellenmesi hâlinde sitenin bazı bölümleri düzgün çalışmayabilir.</p>
        </div>
      </section>
    </>
  );
}
