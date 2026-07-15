import type { CollectionKey } from "./types";

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "select"
  | "tags"
  | "paragraphs"
  | "image";

export type FieldDef = {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  hint?: string;
  full?: boolean;
};

export type CollectionMeta = {
  key: CollectionKey;
  title: string;
  singular: string;
  idKey: string;
  labelKey: string;
  fields: FieldDef[];
  defaults: Record<string, unknown>;
};

export const SERVICE_ICONS = [
  "DraftingCompass",
  "Building2",
  "Frame",
  "ShieldCheck",
  "Activity",
  "Compass",
  "FileCheck2",
  "Calculator",
  "Home",
  "Landmark",
  "HardHat",
  "Factory",
  "TreePine",
  "FileBadge",
];

export const PROJECT_TYPES = ["Konut", "Ticari", "Endüstriyel", "Güçlendirme", "Eğitim"];

export const collections: Record<CollectionKey, CollectionMeta> = {
  services: {
    key: "services",
    title: "Hizmetler",
    singular: "Hizmet",
    idKey: "slug",
    labelKey: "title",
    defaults: {
      slug: "",
      title: "",
      short: "",
      detail: "",
      icon: "Building2",
    },
    fields: [
      { key: "slug", label: "Slug (URL)", type: "text", required: true, hint: "ornek-hizmet" },
      { key: "title", label: "Başlık", type: "text", required: true },
      { key: "icon", label: "İkon", type: "select", options: SERVICE_ICONS, required: true },
      { key: "short", label: "Kısa açıklama", type: "textarea", required: true, full: true },
      { key: "detail", label: "Detay", type: "textarea", required: true, full: true },
    ],
  },
  projects: {
    key: "projects",
    title: "Projeler",
    singular: "Proje",
    idKey: "slug",
    labelKey: "title",
    defaults: {
      slug: "",
      title: "",
      location: "",
      type: "Konut",
      year: new Date().getFullYear(),
      area: "",
      services: [],
      cover: "",
      gallery: [],
      summary: "",
      body: "",
    },
    fields: [
      { key: "slug", label: "Slug", type: "text", required: true },
      { key: "title", label: "Başlık", type: "text", required: true },
      { key: "location", label: "Konum", type: "text", required: true },
      { key: "type", label: "Tip", type: "select", options: PROJECT_TYPES, required: true },
      { key: "year", label: "Yıl", type: "number", required: true },
      { key: "area", label: "Alan", type: "text", required: true, hint: "8.400 m²" },
      { key: "services", label: "Hizmet etiketleri", type: "tags", full: true },
      { key: "cover", label: "Kapak görseli (Cloudinary URL)", type: "image", full: true, hint: "Medya kütüphanesinden URL kopyalayın" },
      { key: "gallery", label: "Galeri", type: "tags", full: true, hint: "Cloudinary URL listesi" },
      { key: "summary", label: "Özet", type: "textarea", required: true, full: true },
      { key: "body", label: "İçerik", type: "textarea", required: true, full: true },
    ],
  },
  posts: {
    key: "posts",
    title: "Blog",
    singular: "Yazı",
    idKey: "slug",
    labelKey: "title",
    defaults: {
      slug: "",
      title: "",
      excerpt: "",
      category: "",
      tags: [],
      date: new Date().toISOString().slice(0, 10),
      readMin: 5,
      cover: "",
      body: [""],
    },
    fields: [
      { key: "slug", label: "Slug", type: "text", required: true },
      { key: "title", label: "Başlık", type: "text", required: true },
      { key: "category", label: "Kategori", type: "text", required: true },
      { key: "tags", label: "Etiketler", type: "tags", full: true, hint: "virgülle ayırın" },
      { key: "date", label: "Tarih", type: "text", required: true, hint: "YYYY-MM-DD" },
      { key: "readMin", label: "Okuma (dk)", type: "number", required: true },
      { key: "cover", label: "Kapak (Cloudinary URL)", type: "image", full: true, hint: "Medya kütüphanesinden URL kopyalayın" },
      { key: "excerpt", label: "Özet", type: "textarea", required: true, full: true },
      { key: "body", label: "Paragraflar", type: "paragraphs", required: true, full: true },
    ],
  },
  jobs: {
    key: "jobs",
    title: "Kariyer İlanları",
    singular: "İlan",
    idKey: "id",
    labelKey: "title",
    defaults: {
      id: "",
      title: "",
      type: "Tam Zamanlı",
      location: "Turhal / Tokat",
      desc: "",
    },
    fields: [
      { key: "id", label: "ID", type: "text", required: true, hint: "statik-muhendis" },
      { key: "title", label: "Pozisyon", type: "text", required: true },
      {
        key: "type",
        label: "Çalışma tipi",
        type: "select",
        options: ["Tam Zamanlı", "Yarı Zamanlı", "Staj", "Freelance"],
        required: true,
      },
      { key: "location", label: "Lokasyon", type: "text", required: true },
      { key: "desc", label: "Açıklama", type: "textarea", required: true, full: true },
    ],
  },
  testimonials: {
    key: "testimonials",
    title: "Referans Yorumları",
    singular: "Yorum",
    idKey: "name",
    labelKey: "name",
    defaults: { quote: "", name: "", role: "", rating: 5 },
    fields: [
      { key: "name", label: "İsim", type: "text", required: true },
      { key: "role", label: "Ünvan / rol", type: "text", required: true },
      { key: "rating", label: "Puan (1-5)", type: "number", required: true },
      { key: "quote", label: "Alıntı", type: "textarea", required: true, full: true },
    ],
  },
  references: {
    key: "references",
    title: "Referans Firmalar",
    singular: "Referans",
    idKey: "name",
    labelKey: "name",
    defaults: { name: "", logo: "" },
    fields: [
      { key: "name", label: "Firma adı", type: "text", required: true },
      { key: "logo", label: "Logo URL", type: "image", full: true },
    ],
  },
  processSteps: {
    key: "processSteps",
    title: "Süreç Adımları",
    singular: "Adım",
    idKey: "no",
    labelKey: "title",
    defaults: { no: "", title: "", desc: "" },
    fields: [
      { key: "no", label: "No", type: "text", required: true, hint: "01" },
      { key: "title", label: "Başlık", type: "text", required: true },
      { key: "desc", label: "Açıklama", type: "textarea", required: true, full: true },
    ],
  },
  values: {
    key: "values",
    title: "Değerlerimiz",
    singular: "Değer",
    idKey: "title",
    labelKey: "title",
    defaults: { title: "", desc: "" },
    fields: [
      { key: "title", label: "Başlık", type: "text", required: true },
      { key: "desc", label: "Açıklama", type: "textarea", required: true, full: true },
    ],
  },
  milestones: {
    key: "milestones",
    title: "Kilometre Taşları",
    singular: "Kilometre taşı",
    idKey: "year",
    labelKey: "title",
    defaults: { year: "", title: "", desc: "" },
    fields: [
      { key: "year", label: "Yıl", type: "text", required: true },
      { key: "title", label: "Başlık", type: "text", required: true },
      { key: "desc", label: "Açıklama", type: "textarea", required: true, full: true },
    ],
  },
  team: {
    key: "team",
    title: "Ekip",
    singular: "Üye",
    idKey: "name",
    labelKey: "name",
    defaults: { name: "", role: "", phone: "" },
    fields: [
      { key: "name", label: "Ad Soyad", type: "text", required: true },
      { key: "role", label: "Ünvan", type: "text", required: true },
      { key: "phone", label: "Telefon", type: "text" },
    ],
  },
};

export const navItems = [
  { href: "/admin", label: "Özet", icon: "LayoutDashboard" },
  { href: "/admin/submissions", label: "Başvurular", icon: "Inbox" },
  { href: "/admin/site", label: "Site Ayarları", icon: "Settings" },
  { href: "/admin/seo", label: "SEO", icon: "Search" },
  { href: "/admin/services", label: "Hizmetler", icon: "Briefcase" },
  { href: "/admin/projects", label: "Projeler", icon: "Building2" },
  { href: "/admin/blog", label: "Blog", icon: "Newspaper" },
  { href: "/admin/jobs", label: "Kariyer", icon: "UserPlus" },
  { href: "/admin/testimonials", label: "Yorumlar", icon: "MessageSquareQuote" },
  { href: "/admin/references", label: "Referanslar", icon: "BadgeCheck" },
  { href: "/admin/process", label: "Süreç", icon: "ListOrdered" },
  { href: "/admin/about", label: "Hakkımızda", icon: "Info" },
  { href: "/admin/media", label: "Medya", icon: "Image" },
  { href: "/admin/activity", label: "Aktivite", icon: "History" },
] as const;
