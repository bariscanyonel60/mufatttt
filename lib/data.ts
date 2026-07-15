function pub(key: string, fallback: string) {
  const v = process.env[key];
  return v && v.trim() ? v.trim() : fallback;
}

const siteDefaults = {
  name: "MUFAT İnşaat Mühendislik",
  shortName: "MUFAT",
  legalName: "MUFAT İnşaat Mühendislik San. ve Tic. Ltd. Şti.",
  tagline: "İnşaat · Mühendislik · Mimarlık · Taahhüt · Kontrolörlük",
  phone: "+90 356 276 23 93",
  whatsapp: "+90 542 265 90 00",
  email: "info@mufatmuhendislik.com",
  address: "Cumhuriyet Cad. No:1, Turhal / Tokat",
  hours: "Pzt – Cmt · 08:30 – 18:00",
  url: "https://www.mufatinsaat.com",
  founded: 2002,
  mapEmbedUrl:
    "https://www.google.com/maps?q=Cumhuriyet+Cad.+No:1,+Turhal,+Tokat&output=embed",
  socials: {
    instagram: "https://www.instagram.com/mufat_insaat_muhendislik",
    linkedin: "https://www.linkedin.com/company/mufatmuhendislik",
    facebook: "https://www.facebook.com/mufatmuhendislik",
  },
  stats: [
    { value: 24, suffix: "+", label: "Yıllık Mühendislik Deneyimi" },
    { value: 240, suffix: "+", label: "Tamamlanan Proje" },
    { value: 180, suffix: "+", label: "Mutlu İşveren" },
    { value: 12, suffix: "", label: "Hizmet Verilen Şehir" },
  ],
};

/** İletişim alanları NEXT_PUBLIC_SITE_* ile override edilebilir. */
export const site = {
  ...siteDefaults,
  phone: pub("NEXT_PUBLIC_SITE_PHONE", siteDefaults.phone),
  whatsapp: pub("NEXT_PUBLIC_SITE_WHATSAPP", siteDefaults.whatsapp),
  email: pub("NEXT_PUBLIC_SITE_EMAIL", siteDefaults.email),
  address: pub("NEXT_PUBLIC_SITE_ADDRESS", siteDefaults.address),
  url: pub("NEXT_PUBLIC_SITE_URL", siteDefaults.url),
  mapEmbedUrl: pub("NEXT_PUBLIC_SITE_MAP_EMBED", siteDefaults.mapEmbedUrl),
  socials: {
    instagram: pub("NEXT_PUBLIC_SITE_INSTAGRAM", siteDefaults.socials.instagram),
    linkedin: pub("NEXT_PUBLIC_SITE_LINKEDIN", siteDefaults.socials.linkedin),
    facebook: pub("NEXT_PUBLIC_SITE_FACEBOOK", siteDefaults.socials.facebook),
  },
};

export type Service = {
  slug: string;
  title: string;
  short: string;
  detail: string;
  icon: string; // lucide icon name key
};

export const services: Service[] = [
  {
    slug: "plan-proje-muhendislik",
    title: "Plan / Proje Mühendislik Hizmetleri",
    icon: "DraftingCompass",
    short: "Statik, mimari ve mühendislik plan-proje süreçlerinin uçtan uca yönetimi.",
    detail:
      "Yapıların planlanması ve projelendirilmesinde inşaat, mimarlık ve mühendislik disiplinlerini birlikte çalıştırıyoruz. Hesap, çizim ve uygulama detayları tek elden, sahaya uygun şekilde üretilir.",
  },
  {
    slug: "ozel-bina-insaati",
    title: "Özel Bina İnşaatları Yapımı",
    icon: "Building2",
    short: "Konut ve özel yapıların taahhüt kapsamında inşaat yapımı.",
    detail:
      "Özel işverenlere yönelik bina inşaatlarını; proje, imalat ve teslim süreçlerini yöneterek gerçekleştiriyoruz. Kalite, süre ve maliyet dengesi şantiye disiplinimizle korunur.",
  },
  {
    slug: "yap-sat-kat-karsiligi",
    title: "Yap / Sat ve Kat Karşılığı İnşaat",
    icon: "Home",
    short: "Yap-sat ve kat karşılığı modellerinde proje ve inşaat yapımı.",
    detail:
      "Arsa sahipleri ve yatırımcılar için yap-sat ile kat karşılığı inşaat modellerinde; proje koordinasyonu, imalat ve teslime kadar süreci yönetiyoruz.",
  },
  {
    slug: "tkdk-ipard",
    title: "TKDK / IPARD Proje ve İnşaat",
    icon: "Landmark",
    short: "AB ve Tarım Bakanlığı kırsal kalkınma programları kapsamında plan, proje ve yapım.",
    detail:
      "TKDK / IPARD Avrupa Birliği ve Tarım Bakanlığı kırsal kalkınma programları kapsamındaki yatırımlarda plan/proje hazırlığı ile inşaat yapım hizmetlerini sunuyoruz. Program şartlarına uygun evrak ve saha süreçlerini yönetiriz.",
  },
  {
    slug: "kamu-ihale-insaati",
    title: "Kamu İhale Kanunu Kapsamında İnşaat",
    icon: "FileCheck2",
    short: "4734 ve 2886 sayılı kanunlar kapsamında resmi kurum inşaat işleri.",
    detail:
      "Resmi kurumlara; 4734 ve 2886 sayılı Kamu İhale Kanunu kapsamında üniversite, okul, yurt ve benzeri bina işlerinin yapımını üstleniyoruz. İhale, sözleşme ve şantiye süreçleri mevzuata uygun yürütülür.",
  },
  {
    slug: "bina-guclendirme",
    title: "Bina Güçlendirme İşleri",
    icon: "ShieldCheck",
    short: "Özel ve resmi kurumlara bina güçlendirme yapımı.",
    detail:
      "Özel ve resmi kurumlara yönelik güçlendirme projelerinin sahada uygulanmasını sağlıyoruz. Analiz sonuçlarına dayalı imalat, kontrollük ve belgeleme süreçleriyle güvenli teslim hedeflenir.",
  },
  {
    slug: "riskli-yapi-tespiti",
    title: "Riskli Yapı Tespiti",
    icon: "Activity",
    short: "Bakanlıkça yetkilendirilmiş lisanslı kurumlarla riskli yapı tespiti.",
    detail:
      "Çevre, Şehircilik ve İklim Değişikliği Bakanlığı tarafından yetkilendirilmiş lisanslı kurumlarla koordineli olarak riskli yapı tespiti süreçlerini yönetiyoruz. Raporlama ve sonraki adımlar için teknik rehberlik sunarız.",
  },
  {
    slug: "santiye-sefligi-kontrolluk",
    title: "Şantiye Şefliği ve Kontrollük",
    icon: "HardHat",
    short: "Şantiye şefliği ile imalat kontrollük hizmetleri.",
    detail:
      "Şantiyede şeflik ve kontrollük hizmetleriyle imalatın projeye, yönetmeliğe ve iş programına uygunluğunu takip ediyoruz. Günlük / dönemsel raporlarla işvereni bilgilendiririz.",
  },
  {
    slug: "kontrolluk-denetim-musavirlik",
    title: "Kontrollük, Denetim ve Müşavirlik",
    icon: "Compass",
    short: "Bağımsız kontrollük, denetim ve mühendislik müşavirliği.",
    detail:
      "Proje ve yapım aşamalarında kontrollük, denetim ve müşavirlik hizmeti veriyoruz. İşveren adına teknik kararları netleştirir, kalite ve uyumluluğu bağımsız biçimde belgeleriz.",
  },
  {
    slug: "osb-fabrika-uretim",
    title: "OSB Fabrika ve Üretim Binaları",
    icon: "Factory",
    short: "Organize sanayi bölgelerinde fabrika ve atölye plan-proje ile inşaat yapımı.",
    detail:
      "Organize sanayi bölgelerinde tekstil, üretim ve imalat fabrika ile atölye binalarının plan/projelerini hazırlıyor ve inşaatlarını gerçekleştiriyoruz. OSB şartnamelerine uygun saha ve proje koordinasyonu sağlanır.",
  },
  {
    slug: "kirsal-koy-tipi-konut",
    title: "Kırsal Köy Tipi Konut Projeleri",
    icon: "TreePine",
    short: "İl Özel İdaresi kapsamında köy tipi ev/konut plan ve projeleri.",
    detail:
      "İl Özel İdaresi kapsamında kırsal yerleşimlerde köy tipi ev ve konutların plan/projelerini hazırlıyoruz. Yerel ihtiyaçlar, imar ve idare süreçlerine uygun proje paketleri teslim edilir.",
  },
  {
    slug: "enerji-kimlik-akustik",
    title: "Enerji Kimlik Belgesi ve Akustik Rapor",
    icon: "FileBadge",
    short: "Enerji kimlik belgesi (EKB) ve akustik rapor hizmetleri.",
    detail:
      "Yapılar için enerji kimlik belgesi düzenlenmesi ile akustik rapor hizmetlerini sunuyoruz. Mevzuata uygun ölçüm, hesap ve belge süreçlerini yönetiriz.",
  },
];

export type TeamMember = {
  name: string;
  role: string;
  phone?: string;
};

export const team: TeamMember[] = [
  { name: "Ahmet Murat Doğan", role: "İnşaat Mühendisi", phone: "+90 542 265 90 00" },
  { name: "Mahmut Hamza Doğan", role: "İç Mimar", phone: "+90 541 502 41 94" },
  { name: "Fatma Doğan", role: "Makina Mühendisi" },
];

export type Project = {
  slug: string;
  title: string;
  location: string;
  type: string;
  year: number;
  area: string;
  services: string[];
  cover: string;
  gallery: string[];
  summary: string;
  body: string;
};

export const projectFilters = ["Tümü", "Konut", "Ticari", "Endüstriyel", "Güçlendirme", "Eğitim"];

export const projects: Project[] = [
  {
    slug: "uslu-tekstil-fabrika",
    title: "Uslu Tekstil Fabrika Binası",
    location: "Turhal, Tokat",
    type: "Endüstriyel",
    year: 2011,
    area: "4.200 m²",
    services: ["Özel Bina İnşaatı", "Çelik / Fabrika Yapımı"],
    cover: "https://res.cloudinary.com/osgt7obm/image/upload/mufat/projects/uslu-tekstil-fabrika",
    gallery: ["https://res.cloudinary.com/osgt7obm/image/upload/mufat/projects/uslu-tekstil-fabrika"],
    summary: "4.200 m² tekstil üretim binası inşaatı.",
    body: "Turhal’da Uslu Tekstil için gerçekleştirilen fabrika binası inşaatında; yapı iskeleti, cephe ve saha imalatları birlikte yönetildi. Geniş açıklıklı üretim alanı, tesis süreçlerine uygun şekilde teslim edildi.",
  },
  {
    slug: "tibbi-atik-tesisi",
    title: "Tokat Tıbbi Atık Tesisi",
    location: "Turhal, Tokat",
    type: "Endüstriyel",
    year: 2011,
    area: "600 m²",
    services: ["Özel Bina İnşaatı", "Kontrollük"],
    cover: "https://res.cloudinary.com/osgt7obm/image/upload/mufat/projects/tibbi-atik-tesisi",
    gallery: ["https://res.cloudinary.com/osgt7obm/image/upload/mufat/projects/tibbi-atik-tesisi"],
    summary: "600 m² tıbbi atık işleme tesisi binası inşaatı.",
    body: "Tokat tıbbi atık tesisi inşaatında çelik iskelet, duvar ve çatı imalatları tamamlanarak tesis işletmeye hazır hale getirildi. Sahadaki koordinasyon, teknik şartnameye uygun teslimle sonuçlandı.",
  },
  {
    slug: "asude-apartmani",
    title: "Asude Apartmanı",
    location: "Turhal, Tokat",
    type: "Konut",
    year: 2010,
    area: "10 daire · 5 dükkan",
    services: ["Özel Bina İnşaatı", "Yap / Sat"],
    cover: "https://res.cloudinary.com/osgt7obm/image/upload/mufat/projects/asude-apartmani",
    gallery: ["https://res.cloudinary.com/osgt7obm/image/upload/mufat/projects/asude-apartmani"],
    summary: "2008–2010 döneminde tamamlanan 10 daireli, zemin katta 5 dükkanlı konut yapısı.",
    body: "Asude Apartmanı; konut ve ticaret fonksiyonunu aynı yapıda birleştiren bir proje olarak inşa edildi. Cephe, balkon ve zemin kat dükkân düzeni çevre dokusuyla uyumlu şekilde tamamlandı.",
  },
  {
    slug: "liva-evleri",
    title: "Liva Evleri",
    location: "Turhal, Tokat",
    type: "Konut",
    year: 2010,
    area: "22 daire",
    services: ["Özel Bina İnşaatı", "Yap / Sat"],
    cover: "https://res.cloudinary.com/osgt7obm/image/upload/mufat/projects/liva-evleri",
    gallery: ["https://res.cloudinary.com/osgt7obm/image/upload/mufat/projects/liva-evleri"],
    summary: "2006–2010 döneminde tamamlanan 22 daireli konut inşaatı.",
    body: "Liva Evleri, çok katlı konut bina tipolojisinde teslim edildi. İnşaat süreci boyunca kaba ve ince işler aşamalı olarak yönetildi; 22 dairenin tamamı kullanıma hazır hale getirildi.",
  },
  {
    slug: "sahika-apartmani",
    title: "Şahika Apartmanı",
    location: "Turhal, Tokat",
    type: "Konut",
    year: 2009,
    area: "10 daire · 3 dükkan",
    services: ["Özel Bina İnşaatı"],
    cover: "https://res.cloudinary.com/osgt7obm/image/upload/mufat/projects/sahika-apartmani",
    gallery: ["https://res.cloudinary.com/osgt7obm/image/upload/mufat/projects/sahika-apartmani"],
    summary: "2006–2009 döneminde tamamlanan 10 daire ve 3 dükkanlı apartman inşaatı.",
    body: "Şahika Apartmanı’nda konut birimleri ile zemin kat ticaret alanları birlikte projelendirilip inşa edildi. Cephe renk düzeni ve balkon detaylarıyla yapı şehir siluetine kazandırıldı.",
  },
  {
    slug: "mukavim-konut",
    title: "Mukavim Konut Yapı Kooperatifi",
    location: "Turhal, Tokat",
    type: "Konut",
    year: 2008,
    area: "45 daire",
    services: ["Özel Bina İnşaatı", "Kat Karşılığı"],
    cover: "https://res.cloudinary.com/osgt7obm/image/upload/mufat/projects/mukavim-konut",
    gallery: ["https://res.cloudinary.com/osgt7obm/image/upload/mufat/projects/mukavim-konut"],
    summary: "2004–2008 döneminde tamamlanan 45 daireli kooperatif konut inşaatı.",
    body: "S.S. Mukavim Konut Yapı Kooperatifi inşaatında çok daireli konut bloğu teslim edildi. İşveren kooperatif yapısına uygun şekilde planlama, imalat ve teslim süreçleri birlikte yürütüldü.",
  },
  {
    slug: "anadolu-lisesi-guclendirme",
    title: "Anadolu Lisesi Güçlendirme",
    location: "Tokat",
    type: "Güçlendirme",
    year: 2008,
    area: "Okul binası",
    services: ["Bina Güçlendirme", "Kontrollük"],
    cover: "https://res.cloudinary.com/osgt7obm/image/upload/mufat/projects/anadolu-lisesi-guclendirme",
    gallery: ["https://res.cloudinary.com/osgt7obm/image/upload/mufat/projects/anadolu-lisesi-guclendirme"],
    summary: "2008 yılında tamamlanan Anadolu Lisesi binası güçlendirme inşaatı.",
    body: "Mevcut okul yapısının deprem güvenliğini artırmaya yönelik güçlendirme imalatları uygulandı. Eğitim fonksiyonunun korunması gözetilerek saha işleri planlandı ve yapı güçlendirilerek teslim edildi.",
  },
  {
    slug: "ahmet-dincer-lisesi",
    title: "Ahmet Dinçer Lisesi",
    location: "Turhal, Tokat",
    type: "Eğitim",
    year: 2005,
    area: "12 derslik",
    services: ["Kamu İhale İnşaatı", "Özel Bina İnşaatı"],
    cover: "https://res.cloudinary.com/osgt7obm/image/upload/mufat/projects/ahmet-dincer-lisesi",
    gallery: ["https://res.cloudinary.com/osgt7obm/image/upload/mufat/projects/ahmet-dincer-lisesi"],
    summary: "12 derslikli Ahmet Dinçer Lisesi okul binası inşaatı (2005).",
    body: "Turhal’da 12 derslikli Ahmet Dinçer Lisesi binası inşa edilerek eğitim kullanımına uygun şekilde teslim edildi. Cephe, derslik düzeni ve dış saha imalatları proje kapsamında tamamlandı.",
  },
  {
    slug: "mensace-mermer-fabrika",
    title: "Mensace Mermer Sanayi Fabrikası",
    location: "Turhal, Tokat",
    type: "Endüstriyel",
    year: 2005,
    area: "1.500 m²",
    services: ["OSB / Fabrika Yapımı", "Çelik Konstrüksiyon"],
    cover: "https://res.cloudinary.com/osgt7obm/image/upload/mufat/projects/mensace-mermer-fabrika",
    gallery: ["https://res.cloudinary.com/osgt7obm/image/upload/mufat/projects/mensace-mermer-fabrika"],
    summary: "1.500 m² mermer sanayi fabrika binası inşaatı (2005).",
    body: "Mensace Mermer Sanayi için çelik iskeletli fabrika binası inşaatı gerçekleştirildi. Geniş açıklıklı üretim alanı ve saha hazırlığı aynı süreçte tamamlandı.",
  },
  {
    slug: "ozel-bina-2005",
    title: "Özel Bina İnşaatı",
    location: "Turhal, Tokat",
    type: "Konut",
    year: 2005,
    area: "Çok katlı konut",
    services: ["Özel Bina İnşaatı"],
    cover: "https://res.cloudinary.com/osgt7obm/image/upload/mufat/projects/ozel-bina-2005",
    gallery: ["https://res.cloudinary.com/osgt7obm/image/upload/mufat/projects/ozel-bina-2005"],
    summary: "2005 yılında tamamlanan çok katlı özel konut binası inşaatı.",
    body: "Turhal’da özel işveren için gerçekleştirilen çok katlı konut binası; kaba inşaattan ince işlere kadar tamamlanarak teslim edildi.",
  },
];

export const processSteps = [
  { no: "01", title: "Keşif", desc: "Arsa, zemin ve ihtiyaç analizi. Doğru soruları en başta sorarız." },
  { no: "02", title: "Planlama", desc: "Takvim, bütçe ve risk haritası. Sürprizsiz bir yol planı çıkarırız." },
  { no: "03", title: "Mühendislik", desc: "Modelleme, analiz ve optimizasyon. Yapının matematiği burada kurulur." },
  { no: "04", title: "Tasarım", desc: "Mimari koordinasyon ve detaylandırma. Kâğıt üzerinde her şey netleşir." },
  { no: "05", title: "Onay", desc: "Ruhsat ve kurum süreçleri. Bürokrasiyi biz yönetiriz." },
  { no: "06", title: "İnşaat", desc: "Saha uygulaması ve tedarik koordinasyonu. Proje sahaya taşınır." },
  { no: "07", title: "Denetim", desc: "Her imalat kaleminin kontrolü ve belgelenmesi. Kalite tesadüfe bırakılmaz." },
  { no: "08", title: "Teslim", desc: "İskân, dokümantasyon ve garanti. Anahtarla birlikte güven teslim edilir." },
];

export const testimonials = [
  { quote: "Statik projeyi üç firmadan istedik; MUFAT'ın çözümü hem en güvenlisi hem de demir tonajı en düşük olanıydı. Rakamlarla konuşuyorlar.", name: "Hasan K.", role: "Müteahhit · Turhal", rating: 5 },
  { quote: "Fabrikamızın çelik projesinde montaj ekibi tek bir birleşimde bile sorun yaşamadı. İmalat resimleri milimetrikti.", name: "Serkan D.", role: "Fabrika Sahibi · Tokat OSB", rating: 5 },
  { quote: "Okulumuzun güçlendirme sürecinde her aşamayı anlaşılır dille anlattılar. Velilerimize karşı içimiz rahat.", name: "Aynur T.", role: "Okul Müdürü · Zile", rating: 5 },
  { quote: "Arsa alımından iskâna kadar danışmanlık aldık. Yanlış müteahhitle sözleşme imzalamamızı engellediler; o tavsiye bize bir daire kazandırdı.", name: "Mehmet & Elif Y.", role: "Yatırımcı · Amasya", rating: 5 },
];

export type Reference = { name: string; logo?: string };

export const references: Reference[] = [
  { name: "Tokat Belediyesi" },
  { name: "Turhal Ticaret Odası" },
  { name: "Anadolu Lojistik" },
  { name: "Yeşilırmak Yapı" },
  { name: "Zile Kaymakamlığı" },
  { name: "OSB Sanayicileri" },
  { name: "Kervan Yapı" },
  { name: "Meydan GYO" },
];

export type Post = {
  slug: string; title: string; excerpt: string; category: string;
  tags?: string[];
  date: string; readMin: number; cover: string; body: string[];
};

export const posts: Post[] = [
  { slug: "tbdy-2018-ev-sahipleri-icin-ne-anlama-geliyor", title: "TBDY 2018: Ev Sahipleri İçin Ne Anlama Geliyor?",
    excerpt: "Türkiye Bina Deprem Yönetmeliği'nin bir binayı satın alırken veya yaptırırken sizin için değiştirdiği 5 kritik nokta.",
    category: "Deprem Güvenliği", tags: ["TBDY", "Deprem", "Konut"], date: "2026-05-14", readMin: 6,
    cover: "https://res.cloudinary.com/osgt7obm/image/upload/mufat/blog/tbdy-2018",
    body: [
      "TBDY 2018, Türkiye'de yapı güvenliğinin çerçevesini çizen temel metindir. Teknik bir doküman gibi görünse de aslında doğrudan sizin evinizin, iş yerinizin güvenliğini tanımlar.",
      "Yönetmeliğin en önemli yeniliği, deprem tehlikesinin artık il bazında değil koordinat bazında hesaplanmasıdır. Yani Turhal'ın iki farklı mahallesindeki iki bina için bile farklı deprem yükleri söz konusu olabilir.",
      "Bina yaptırıyorsanız statik projenizin hangi performans hedefine göre tasarlandığını sormaktan çekinmeyin. 'Can güvenliği' asgari hedeftir; okul ve hastane gibi yapılarda daha yüksek hedefler zorunludur.",
      "Mevcut bir bina satın alıyorsanız yapım yılı 2000 öncesiyse mutlaka bir performans analizi düşünün. Analiz maliyeti, taşıdığınız riskin yanında ihmal edilebilir düzeydedir.",
    ]},
  { slug: "celik-mi-betonarme-mi", title: "Çelik mi, Betonarme mi? Doğru Taşıyıcı Sistemi Seçmek",
    excerpt: "Depo, fabrika veya ticari yapı planlıyorsanız bu karar bütçenizi ve takviminizi belirler. Karşılaştırmalı rehber.",
    category: "Yapı Sistemleri", tags: ["Çelik", "Betonarme", "Endüstriyel"], date: "2026-03-02", readMin: 8,
    cover: "https://res.cloudinary.com/osgt7obm/image/upload/mufat/blog/celik-betonarme",
    body: [
      "Bu sorunun tek doğru cevabı yoktur; doğru cevap projenizin geometrisinde, zemininde ve takviminizde saklıdır.",
      "Çelik; geniş açıklık, hız ve hafiflik demektir. 20 metreyi aşan açıklıklarda ve hızlı devreye alınması gereken tesislerde çoğu zaman rakipsizdir. Buna karşılık yangın koruması ve periyodik bakım maliyeti hesaba katılmalıdır.",
      "Betonarme; rijitlik, yangın dayanımı ve yerel işçilik bulunabilirliği ile öne çıkar. Konut ve ofis tipolojilerinde toplam maliyette genellikle avantajlıdır.",
      "Pratik önerimiz: kararı kaba maliyet tablosuyla değil, 10 yıllık toplam sahip olma maliyetiyle verin. İyi bir mühendislik ofisi size her iki sistemin karşılaştırmalı ön boyutlandırmasını sunabilmelidir.",
    ]},
  { slug: "yapi-ruhsati-sureci-adim-adim", title: "Yapı Ruhsatı Süreci: Adım Adım Turhal / Tokat Rehberi",
    excerpt: "Arsanız hazır, projeniz kafanızda. Peki ruhsat masasında sizi hangi adımlar bekliyor? Süreç, evrak ve süre rehberi.",
    category: "Ruhsat & Mevzuat", tags: ["Ruhsat", "Tokat", "İmar"], date: "2026-01-20", readMin: 5,
    cover: "https://res.cloudinary.com/osgt7obm/image/upload/mufat/blog/ruhsat",
    body: [
      "Ruhsat süreci iyi yönetildiğinde 4-8 hafta, kötü yönetildiğinde aylar sürebilir. Fark, evrakların doğru sırayla ve eksiksiz hazırlanmasındadır.",
      "İlk adım imar durumu belgesidir: arsanıza ne yapabileceğinizi bu belge söyler. Emsal, çekme mesafeleri ve kat sınırı burada netleşir.",
      "İkinci adım zemin etüdüdür. Statik proje bu rapor olmadan başlayamaz; etüdü ruhsat için formalite değil, temelinizin sigortası olarak görün.",
      "Mimari, statik, mekanik ve elektrik projeleri eş zamanlı yürütülüp belediyeye tek pakette sunulduğunda süreç ciddi hızlanır. Ofisimiz bu koordinasyonu tek elden yönetmektedir.",
    ]},
  { slug: "deprem-performans-analizi-nedir", title: "Deprem Performans Analizi Nedir, Ne Zaman Yaptırılmalı?",
    excerpt: "Binam güvenli mi sorusunun bilimsel cevabı: performans analizi süreci, maliyeti ve sonuç raporunun okunması.",
    category: "Deprem Güvenliği", tags: ["Performans", "Deprem", "Güçlendirme"], date: "2025-11-08", readMin: 7,
    cover: "https://res.cloudinary.com/osgt7obm/image/upload/mufat/blog/performans",
    body: [
      "Performans analizi, mevcut bir binanın olası bir depremde nasıl davranacağını sayısal olarak ortaya koyan çalışmadır. Görsel inceleme değil, ölçüme dayalı bir mühendislik sürecidir.",
      "Süreç üç aşamadan oluşur: rölöve ve malzeme testleri (karot, donatı tespiti), bilgisayar ortamında modelleme ve analiz, son olarak performans raporu.",
      "Rapor sonucunda bina dört performans seviyesinden birine yerleşir. 'Göçme öncesi' veya 'göçme' seviyesindeki yapılar için güçlendirme ya da yeniden yapım kararı verilir.",
      "2000 yılı öncesi yapılar, projesiz tadilat görmüş binalar ve kolonlarında görünür hasar olan yapılar için analiz ertelenmemesi gereken bir adımdır.",
    ]},
];

export type Job = {
  id: string;
  title: string;
  type: string;
  location: string;
  desc: string;
};

export const jobs: Job[] = [
  { id: "statik-muhendis", title: "İnşaat Mühendisi (Statik)", type: "Tam Zamanlı", location: "Turhal / Tokat",
    desc: "Betonarme ve çelik yapı projelerinde modelleme ve boyutlandırma yapacak, en az 2 yıl deneyimli inşaat mühendisi arıyoruz. ideCAD/SAP2000 deneyimi beklenir." },
  { id: "saha-kontrol", title: "Saha Kontrol Mühendisi", type: "Tam Zamanlı", location: "Tokat ve çevresi",
    desc: "Devam eden şantiyelerimizde imalat kontrolü, hakediş ve raporlama süreçlerini yürütecek, seyahat engeli olmayan mühendis arıyoruz." },
  { id: "stajyer", title: "Stajyer Mühendis", type: "Staj", location: "Turhal / Tokat",
    desc: "Zorunlu veya gönüllü stajını gerçek projeler üzerinde, mentörlük eşliğinde yapmak isteyen 3. ve 4. sınıf öğrencileri başvurabilir." },
];

export const values = [
  { title: "Hesap Verebilirlik", desc: "Her kararın arkasında paylaşmaktan çekinmediğimiz bir hesap vardır." },
  { title: "Güvenlik Önceliği", desc: "Hiçbir maliyet avantajı, güvenlik katsayısından kırpılarak elde edilmez." },
  { title: "Şeffaf İletişim", desc: "İşveren, projesinin her aşamasını anlaşılır dille öğrenme hakkına sahiptir." },
  { title: "Zamanında Teslim", desc: "Takvim bir tahmin değil, taahhüttür. Sözümüz teslim tarihimizdir." },
  { title: "Modern Teknoloji", desc: "Güncel analiz yazılımları ve BIM süreçleriyle çalışırız." },
  { title: "Sürdürülebilirlik", desc: "Malzemeyi optimize etmek hem bütçeye hem çevreye saygıdır." },
];

export const milestones = [
  { year: "2002", title: "Kuruluş", desc: "MUFAT İnşaat Mühendislik San. ve Tic. Ltd. Şti. olarak inşaat, mühendislik ve mimarlık faaliyetlerine başladık." },
  { year: "2010", title: "Taahhüt & Kontrollük", desc: "Özel bina inşaatları ile kontrollük ve şantiye şefliği hizmetlerini güçlendirdik." },
  { year: "2015", title: "Kamu İhale İşleri", desc: "4734 ve 2886 sayılı kanunlar kapsamında okul, yurt ve kamu bina işlerinde aktif rol aldık." },
  { year: "2019", title: "TKDK / IPARD", desc: "Kırsal kalkınma programları kapsamında plan/proje ve yapım hizmetlerini portföyümüze ekledik." },
  { year: "2023", title: "Güçlendirme & Riskli Yapı", desc: "Bina güçlendirme ile riskli yapı tespiti süreçlerinde uzmanlığımızı derinleştirdik." },
  { year: "2026", title: "Disiplinlerarası Ekip", desc: "İnşaat, iç mimarlık ve makina mühendisliği ile bütünleşik proje ve yapım kapasitesi." },
];
