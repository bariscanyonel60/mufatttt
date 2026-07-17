import type { Metadata } from "next";
import PageHero from "@/components/molecules/PageHero";
import { liveSite } from "@/lib/live";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "MUFAT İnşaat Mühendisliği kişisel verilerin korunması ve gizlilik politikası (KVKK).",
  robots: { index: false },
};

export default async function Page() {
  const site = await liveSite();
  return (
    <>
      <PageHero eyebrow="Yasal" title="Gizlilik Politikası" lead="6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında aydınlatma metnimiz." />
      <section className="container-x py-20">
        <div className="prose-mufat mx-auto max-w-3xl">
          <p>{site.name} olarak, web sitemizi ziyaret eden ve formlarımız üzerinden bizimle iletişime geçen kullanıcılarımızın kişisel verilerinin gizliliğine önem veriyoruz.</p>

          <h2 className="mb-3 mt-10 font-display text-xl font-bold text-ink">Toplanan Veriler</h2>
          <p>
            <strong>İletişim formu:</strong> ad-soyad, telefon numarası, e-posta adresi, konu ve mesaj içeriğiniz;
            teklif ve bilgilendirme süreçlerini yürütmek amacıyla toplanır.
          </p>
          <p>
            <strong>Kariyer başvuru formu:</strong> ad-soyad, telefon, e-posta, başvurulan pozisyon, mesaj/özgeçmiş
            özeti ve isteğe bağlı olarak yüklediğiniz CV dosyası (PDF veya Word) toplanır.
          </p>

          <h2 className="mb-3 mt-10 font-display text-xl font-bold text-ink">İşleme Amacı ve Hukuki Dayanak</h2>
          <p>
            İletişim verileriniz; talebinize yanıt vermek, teklif hazırlamak ve sözleşme öncesi süreçleri yürütmek
            amacıyla, KVKK m.5/2-c (sözleşmenin kurulması veya ifası) hukuki sebebine dayanılarak işlenir.
          </p>
          <p>
            Kariyer başvurularındaki verileriniz; işe alım değerlendirmesi ve insan kaynakları süreçleri için,
            KVKK m.5/2-c ve m.5/2-f (meşru menfaat) kapsamında işlenir. CV yüklemeniz halinde açık rıza /
            başvuru sürecinin yürütülmesi amacıyla dosya saklanır.
          </p>

          <h2 className="mb-3 mt-10 font-display text-xl font-bold text-ink">CV Dosyalarının Saklanması</h2>
          <p>
            Yüklediğiniz CV dosyaları, güvenli dosya barındırma hizmeti sağlayan Cloudinary altyapısında
            (bulut depolama) saklanır. Dosyaya erişim bağlantısı yalnızca yönetici panelimizde ve ilgili
            e-posta bildiriminde kullanılır. Pazarlama amacıyla üçüncü taraflarla paylaşılmaz.
          </p>

          <h2 className="mb-3 mt-10 font-display text-xl font-bold text-ink">Veri Güvenliği ve Paylaşım</h2>
          <p>
            Kişisel verileriniz üçüncü kişilerle pazarlama amacıyla paylaşılmaz; yalnızca yasal zorunluluk
            hâlinde yetkili kurumlara aktarılabilir. Form bildirimleri için e-posta iletim hizmeti (Resend)
            kullanılabilir; bu durumda iletim, hizmetin teknik gereği ölçüsündedir.
          </p>

          <h2 className="mb-3 mt-10 font-display text-xl font-bold text-ink">Saklama Süresi</h2>
          <p>
            İletişim kayıtları ve kariyer başvuruları, talebin sonuçlanması ve yasal saklama yükümlülükleri
            dikkate alınarak makul süre boyunca tutulur; ardından silinir veya anonimleştirilir.
          </p>

          <h2 className="mb-3 mt-10 font-display text-xl font-bold text-ink">Haklarınız</h2>
          <p>
            KVKK m.11 kapsamındaki taleplerinizi {site.email} adresine iletebilirsiniz. Başvurular en geç
            30 gün içinde yanıtlanır.
          </p>
        </div>
      </section>
    </>
  );
}
