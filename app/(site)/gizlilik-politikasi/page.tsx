import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { liveSite } from "@/lib/live";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "MUFAT İnşaat Mühendisliği kişisel verilerin korunması ve gizlilik politikası (KVKK).",
  robots: { index: false },
};

export default function Page() {
  const site = liveSite();
  return (
    <>
      <PageHero eyebrow="Yasal" title="Gizlilik Politikası" lead="6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında aydınlatma metnimiz." />
      <section className="container-x py-20">
        <div className="prose-mufat mx-auto max-w-3xl">
          <p>{site.name} olarak, web sitemizi ziyaret eden ve formlarımız üzerinden bizimle iletişime geçen kullanıcılarımızın kişisel verilerinin gizliliğine önem veriyoruz.</p>
          <h2 className="mb-3 mt-10 font-display text-xl font-bold text-ink">Toplanan Veriler</h2>
          <p>İletişim formu aracılığıyla ad-soyad, telefon numarası, e-posta adresi ve mesaj içeriğinizi; teklif süreçlerini yürütmek amacıyla topluyoruz.</p>
          <h2 className="mb-3 mt-10 font-display text-xl font-bold text-ink">İşleme Amacı ve Hukuki Dayanak</h2>
          <p>Verileriniz; talebinize yanıt vermek, teklif hazırlamak ve sözleşme öncesi süreçleri yürütmek amacıyla, KVKK m.5/2-c (sözleşmenin kurulması) hukuki sebebine dayanılarak işlenir.</p>
          <h2 className="mb-3 mt-10 font-display text-xl font-bold text-ink">Veri Güvenliği ve Paylaşım</h2>
          <p>Kişisel verileriniz üçüncü kişilerle pazarlama amacıyla paylaşılmaz; yalnızca yasal zorunluluk hâlinde yetkili kurumlara aktarılabilir.</p>
          <h2 className="mb-3 mt-10 font-display text-xl font-bold text-ink">Haklarınız</h2>
          <p>KVKK m.11 kapsamındaki taleplerinizi {site.email} adresine iletebilirsiniz. Başvurular en geç 30 gün içinde yanıtlanır.</p>
        </div>
      </section>
    </>
  );
}
