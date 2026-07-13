import fs from "fs";
import path from "path";
import crypto from "crypto";
import {
  services as seedServices,
  projects as seedProjects,
  projectFilters as seedFilters,
  posts as seedPosts,
  jobs as seedJobs,
  testimonials as seedTestimonials,
  references as seedReferences,
  processSteps as seedProcess,
  values as seedValues,
  milestones as seedMilestones,
  team as seedTeam,
  site as seedSite,
} from "@/lib/data";
import type {
  ActivityItem,
  ActivityStore,
  CollectionKey,
  ContentStore,
  Submission,
  SubmissionsStore,
} from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const CONTENT_FILE = path.join(DATA_DIR, "content.json");
const SUBMISSIONS_FILE = path.join(DATA_DIR, "submissions.json");
const ACTIVITY_FILE = path.join(DATA_DIR, "activity.json");

/** Vercel/serverless: project filesystem is read-only. */
function canPersist(): boolean {
  if (process.env.VERCEL === "1") return false;
  if (process.env.ALLOW_FS_PERSIST === "0") return false;
  return true;
}

function ensureDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    return true;
  } catch {
    return false;
  }
}

function readJson<T>(file: string, fallback: T): T {
  try {
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, "utf8")) as T;
    }
  } catch {
    // ignore corrupt / unreadable
  }
  // Localdev: try to seed the file. Production/Vercel: return memory fallback only.
  if (canPersist() && ensureDir()) {
    try {
      fs.writeFileSync(file, JSON.stringify(fallback, null, 2), "utf8");
    } catch {
      // ignore
    }
  }
  return structuredClone(fallback);
}

function writeJson(file: string, data: unknown): boolean {
  if (!canPersist()) return false;
  if (!ensureDir()) return false;
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch {
    return false;
  }
}

export function defaultContent(): ContentStore {
  return {
    site: {
      name: seedSite.name,
      shortName: seedSite.shortName,
      legalName: seedSite.legalName,
      tagline: seedSite.tagline,
      phone: seedSite.phone,
      whatsapp: seedSite.whatsapp,
      email: seedSite.email,
      address: seedSite.address,
      hours: seedSite.hours,
      url: seedSite.url,
      founded: seedSite.founded,
      mapEmbedUrl: seedSite.mapEmbedUrl,
      socials: { ...seedSite.socials },
      stats: seedSite.stats.map((s) => ({ ...s })),
    },
    services: structuredClone(seedServices),
    projects: structuredClone(seedProjects),
    projectFilters: [...seedFilters],
    posts: structuredClone(seedPosts),
    jobs: structuredClone(seedJobs),
    testimonials: structuredClone(seedTestimonials),
    references: structuredClone(seedReferences),
    processSteps: structuredClone(seedProcess),
    values: structuredClone(seedValues),
    milestones: structuredClone(seedMilestones),
    team: structuredClone(seedTeam),
    seo: {
      defaultTitle: "Murat İnşaat Mühendislik | Plan, Proje, Taahhüt ve Kontrollük",
      titleTemplate: "%s | Murat İnşaat Mühendislik",
      description:
        "Murat İnşaat Mühendislik San. ve Tic. Ltd. Şti. — 2002'den bu yana inşaat, mühendislik, mimarlık, taahhüt ve kontrolörlük. TKDK/IPARD, kamu ihale, güçlendirme ve riskli yapı tespiti.",
      keywords: [
        "Murat İnşaat Mühendislik",
        "Turhal inşaat",
        "Tokat inşaat mühendisliği",
        "plan proje mühendislik",
        "kat karşılığı inşaat",
        "TKDK IPARD",
        "kamu ihale inşaat",
        "bina güçlendirme",
        "riskli yapı tespiti",
        "şantiye şefliği",
        "kontrollük müşavirlik",
      ],
    },
    updatedAt: new Date().toISOString(),
  };
}

export function getContent(): ContentStore {
  return readJson(CONTENT_FILE, defaultContent());
}

export function saveContent(content: ContentStore, user = "admin") {
  const next = { ...content, updatedAt: new Date().toISOString() };
  writeJson(CONTENT_FILE, next);
  logActivity({
    action: "update",
    entity: "content",
    detail: "İçerik kaydedildi",
    user,
  });
  return next;
}

export function patchContent<K extends keyof ContentStore>(
  key: K,
  value: ContentStore[K],
  user = "admin",
) {
  const current = getContent();
  current[key] = value;
  current.updatedAt = new Date().toISOString();
  writeJson(CONTENT_FILE, current);
  logActivity({
    action: "update",
    entity: String(key),
    detail: `${String(key)} güncellendi`,
    user,
  });
  return current;
}

export function upsertCollectionItem(
  collection: CollectionKey,
  item: Record<string, unknown>,
  idKey: string,
  user = "admin",
) {
  const content = getContent();
  const list = [...(content[collection] as Record<string, unknown>[])];
  const id = String(item[idKey] ?? "");
  const idx = list.findIndex((x) => String(x[idKey]) === id);
  if (idx >= 0) list[idx] = item;
  else list.push(item);
  (content as Record<string, unknown>)[collection] = list;
  content.updatedAt = new Date().toISOString();
  writeJson(CONTENT_FILE, content);
  logActivity({
    action: idx >= 0 ? "update" : "create",
    entity: collection,
    detail: `${id || "yeni kayıt"}`,
    user,
  });
  return content;
}

export function deleteCollectionItem(
  collection: CollectionKey,
  idKey: string,
  id: string,
  user = "admin",
) {
  const content = getContent();
  const list = (content[collection] as Record<string, unknown>[]).filter(
    (x) => String(x[idKey]) !== id,
  );
  (content as Record<string, unknown>)[collection] = list;
  content.updatedAt = new Date().toISOString();
  writeJson(CONTENT_FILE, content);
  logActivity({
    action: "delete",
    entity: collection,
    detail: id,
    user,
  });
  return content;
}

export function getSubmissions(): SubmissionsStore {
  return readJson(SUBMISSIONS_FILE, { items: [] });
}

export function addSubmission(item: Submission) {
  const store = getSubmissions();
  store.items.unshift(item);
  writeJson(SUBMISSIONS_FILE, store);
  logActivity({
    action: "create",
    entity: "submission",
    detail: `${item.type}: ${item.name}`,
    user: "system",
  });
  return item;
}

export function updateSubmission(id: string, patch: Partial<Submission>, user = "admin") {
  const store = getSubmissions();
  const idx = store.items.findIndex((x) => x.id === id);
  if (idx < 0) return null;
  store.items[idx] = { ...store.items[idx], ...patch } as Submission;
  writeJson(SUBMISSIONS_FILE, store);
  logActivity({
    action: "update",
    entity: "submission",
    detail: id,
    user,
  });
  return store.items[idx];
}

export function deleteSubmission(id: string, user = "admin") {
  const store = getSubmissions();
  store.items = store.items.filter((x) => x.id !== id);
  writeJson(SUBMISSIONS_FILE, store);
  logActivity({ action: "delete", entity: "submission", detail: id, user });
  return true;
}

export function getActivity(): ActivityStore {
  return readJson(ACTIVITY_FILE, { items: [] });
}

export function logActivity(input: Omit<ActivityItem, "id" | "at">) {
  const store = getActivity();
  store.items.unshift({
    id: crypto.randomUUID(),
    at: new Date().toISOString(),
    ...input,
  });
  store.items = store.items.slice(0, 200);
  writeJson(ACTIVITY_FILE, store);
}

export function getDashboardStats() {
  const content = getContent();
  const submissions = getSubmissions();
  const newCount = submissions.items.filter((s) => s.status === "new").length;
  const contactCount = submissions.items.filter((s) => s.type === "contact").length;
  const careerCount = submissions.items.filter((s) => s.type === "career").length;
  return {
    services: content.services.length,
    projects: content.projects.length,
    posts: content.posts.length,
    jobs: content.jobs.length,
    testimonials: content.testimonials.length,
    references: content.references.length,
    submissions: submissions.items.length,
    newSubmissions: newCount,
    contactSubmissions: contactCount,
    careerSubmissions: careerCount,
    updatedAt: content.updatedAt,
    recentSubmissions: submissions.items.slice(0, 8),
    recentActivity: getActivity().items.slice(0, 12),
  };
}

export function newId(prefix = "id") {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}
