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
import { isDbEnabled } from "@/lib/db";
import {
  dbAddSubmission,
  dbDeleteCollectionItem,
  dbDeleteSubmission,
  dbGetActivity,
  dbGetSubmissions,
  dbLoadContent,
  dbLogActivity,
  dbPatchContent,
  dbSaveContent,
  dbUpdateSubmission,
  dbUpsertCollectionItem,
} from "./mysql-store";
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
    // ignore
  }
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
      defaultTitle: "MUFAT İnşaat Mühendislik | Plan, Proje, Taahhüt ve Kontrollük",
      titleTemplate: "%s | MUFAT İnşaat Mühendislik",
      description:
        "MUFAT İnşaat Mühendislik San. ve Tic. Ltd. Şti. — 2002'den bu yana inşaat, mühendislik, mimarlık, taahhüt ve kontrolörlük. TKDK/IPARD, kamu ihale, güçlendirme ve riskli yapı tespiti.",
      keywords: [
        "MUFAT İnşaat Mühendislik",
        "Tokat müteahhit",
        "Tokat inşaat",
        "Turhal inşaat",
        "Turhal müteahhit",
        "Tokat inşaat mühendisliği",
        "plan proje mühendislik",
        "kat karşılığı inşaat",
        "TKDK IPARD",
        "kamu ihale inşaat",
        "bina güçlendirme",
        "riskli yapı tespiti",
        "şantiye şefliği",
        "kontrollük müşavirlik",
        "TBDY 2018",
        "deprem yönetmeliği Tokat",
      ],
    },
    updatedAt: new Date().toISOString(),
  };
}

export async function getContent(): Promise<ContentStore> {
  if (isDbEnabled()) {
    try {
      return await dbLoadContent();
    } catch (e) {
      console.error("[store] MySQL okunamadı, JSON fallback:", e instanceof Error ? e.message : e);
      return readJson(CONTENT_FILE, defaultContent());
    }
  }
  return readJson(CONTENT_FILE, defaultContent());
}

export async function saveContent(content: ContentStore, user = "admin") {
  const next = { ...content, updatedAt: new Date().toISOString() };
  if (isDbEnabled()) {
    await dbSaveContent(next);
  } else {
    writeJson(CONTENT_FILE, next);
  }
  await logActivity({
    action: "update",
    entity: "content",
    detail: "İçerik kaydedildi",
    user,
  });
  return next;
}

export async function patchContent<K extends keyof ContentStore>(
  key: K,
  value: ContentStore[K],
  user = "admin",
) {
  if (isDbEnabled()) {
    await dbPatchContent(key, value);
    await logActivity({
      action: "update",
      entity: String(key),
      detail: `${String(key)} güncellendi`,
      user,
    });
    return getContent();
  }

  const current = readJson(CONTENT_FILE, defaultContent());
  current[key] = value;
  current.updatedAt = new Date().toISOString();
  writeJson(CONTENT_FILE, current);
  await logActivity({
    action: "update",
    entity: String(key),
    detail: `${String(key)} güncellendi`,
    user,
  });
  return current;
}

export async function upsertCollectionItem(
  collection: CollectionKey,
  item: Record<string, unknown>,
  idKey: string,
  user = "admin",
) {
  if (isDbEnabled()) {
    const action = await dbUpsertCollectionItem(collection, item, idKey);
    await logActivity({
      action,
      entity: collection,
      detail: `${String(item[idKey] ?? "yeni kayıt")}`,
      user,
    });
    return getContent();
  }

  const content = readJson(CONTENT_FILE, defaultContent());
  const list = [...(content[collection] as Record<string, unknown>[])];
  const id = String(item[idKey] ?? "");
  const idx = list.findIndex((x) => String(x[idKey]) === id);
  if (idx >= 0) list[idx] = item;
  else list.push(item);
  (content as Record<string, unknown>)[collection] = list;
  content.updatedAt = new Date().toISOString();
  writeJson(CONTENT_FILE, content);
  await logActivity({
    action: idx >= 0 ? "update" : "create",
    entity: collection,
    detail: `${id || "yeni kayıt"}`,
    user,
  });
  return content;
}

export async function deleteCollectionItem(
  collection: CollectionKey,
  idKey: string,
  id: string,
  user = "admin",
) {
  if (isDbEnabled()) {
    await dbDeleteCollectionItem(collection, idKey, id);
    await logActivity({ action: "delete", entity: collection, detail: id, user });
    return getContent();
  }

  const content = readJson(CONTENT_FILE, defaultContent());
  const list = (content[collection] as Record<string, unknown>[]).filter(
    (x) => String(x[idKey]) !== id,
  );
  (content as Record<string, unknown>)[collection] = list;
  content.updatedAt = new Date().toISOString();
  writeJson(CONTENT_FILE, content);
  await logActivity({ action: "delete", entity: collection, detail: id, user });
  return content;
}

export async function getSubmissions(): Promise<SubmissionsStore> {
  if (isDbEnabled()) return dbGetSubmissions();
  return readJson(SUBMISSIONS_FILE, { items: [] });
}

export async function addSubmission(item: Submission) {
  if (isDbEnabled()) {
    await dbAddSubmission(item);
  } else {
    const store = readJson<SubmissionsStore>(SUBMISSIONS_FILE, { items: [] });
    store.items.unshift(item);
    writeJson(SUBMISSIONS_FILE, store);
  }
  await logActivity({
    action: "create",
    entity: "submission",
    detail: `${item.type}: ${item.name}`,
    user: "system",
  });
  return item;
}

export async function updateSubmission(id: string, patch: Partial<Submission>, user = "admin") {
  if (isDbEnabled()) {
    await dbUpdateSubmission(id, patch);
    await logActivity({ action: "update", entity: "submission", detail: id, user });
    const store = await dbGetSubmissions();
    return store.items.find((x) => x.id === id) || null;
  }

  const store = readJson<SubmissionsStore>(SUBMISSIONS_FILE, { items: [] });
  const idx = store.items.findIndex((x) => x.id === id);
  if (idx < 0) return null;
  store.items[idx] = { ...store.items[idx], ...patch } as Submission;
  writeJson(SUBMISSIONS_FILE, store);
  await logActivity({ action: "update", entity: "submission", detail: id, user });
  return store.items[idx];
}

export async function deleteSubmission(id: string, user = "admin") {
  const current = (await getSubmissions()).items.find((x) => x.id === id);

  if (current?.type === "career" && current.cvUrl) {
    try {
      const { deleteCloudinaryCv, publicIdFromCloudinaryUrl } = await import("@/lib/cloudinary");
      const publicId = publicIdFromCloudinaryUrl(current.cvUrl);
      if (publicId) await deleteCloudinaryCv(publicId);
    } catch (e) {
      console.error("[store] CV Cloudinary silinemedi:", e instanceof Error ? e.message : e);
    }
  }

  if (isDbEnabled()) {
    await dbDeleteSubmission(id);
  } else {
    const store = readJson<SubmissionsStore>(SUBMISSIONS_FILE, { items: [] });
    store.items = store.items.filter((x) => x.id !== id);
    writeJson(SUBMISSIONS_FILE, store);
  }
  await logActivity({ action: "delete", entity: "submission", detail: id, user });
  return true;
}

export async function getActivity(): Promise<ActivityStore> {
  if (isDbEnabled()) return dbGetActivity();
  return readJson(ACTIVITY_FILE, { items: [] });
}

export async function logActivity(input: Omit<ActivityItem, "id" | "at">) {
  if (isDbEnabled()) {
    try {
      await dbLogActivity(input);
    } catch {
      // activity must not break primary writes
    }
    return;
  }

  const store = readJson<ActivityStore>(ACTIVITY_FILE, { items: [] });
  store.items.unshift({
    id: crypto.randomUUID(),
    at: new Date().toISOString(),
    ...input,
  });
  store.items = store.items.slice(0, 200);
  writeJson(ACTIVITY_FILE, store);
}

export async function getDashboardStats() {
  const content = await getContent();
  const submissions = await getSubmissions();
  const activity = await getActivity();
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
    recentActivity: activity.items.slice(0, 12),
  };
}

export function newId(prefix = "id") {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}
