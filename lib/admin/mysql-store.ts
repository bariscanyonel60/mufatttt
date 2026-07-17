import crypto from "crypto";
import { asJson, getPool, type RowDataPacket } from "@/lib/db";
import type {
  ActivityItem,
  ActivityStore,
  CollectionKey,
  ContentStore,
  JobItem,
  MilestoneItem,
  PostItem,
  ProcessStep,
  ProjectItem,
  ReferenceItem,
  SeoSettings,
  ServiceItem,
  SiteContent,
  Submission,
  SubmissionsStore,
  TeamMember,
  TestimonialItem,
  ValueItem,
} from "./types";

function j(v: unknown) {
  return JSON.stringify(v ?? null);
}

export async function dbLoadContent(): Promise<ContentStore> {
  const pool = getPool();

  const [[siteRow]] = await pool.query<RowDataPacket[]>("SELECT * FROM site_settings WHERE id = 1 LIMIT 1");
  const [[seoRow]] = await pool.query<RowDataPacket[]>("SELECT * FROM seo_settings WHERE id = 1 LIMIT 1");
  const [serviceRows] = await pool.query<RowDataPacket[]>("SELECT * FROM services ORDER BY sort_order, id");
  const [projectRows] = await pool.query<RowDataPacket[]>("SELECT * FROM projects ORDER BY sort_order, year DESC, id");
  const [filterRows] = await pool.query<RowDataPacket[]>("SELECT * FROM project_filters ORDER BY sort_order, id");
  const [postRows] = await pool.query<RowDataPacket[]>("SELECT * FROM posts ORDER BY published_on DESC, id");
  const [jobRows] = await pool.query<RowDataPacket[]>("SELECT * FROM jobs ORDER BY created_at DESC");
  const [testimonialRows] = await pool.query<RowDataPacket[]>("SELECT * FROM testimonials ORDER BY sort_order, id");
  const [referenceRows] = await pool.query<RowDataPacket[]>("SELECT * FROM `references` ORDER BY sort_order, id");
  const [processRows] = await pool.query<RowDataPacket[]>("SELECT * FROM process_steps ORDER BY sort_order, id");
  const [valueRows] = await pool.query<RowDataPacket[]>("SELECT * FROM values_items ORDER BY sort_order, id");
  const [milestoneRows] = await pool.query<RowDataPacket[]>("SELECT * FROM milestones ORDER BY sort_order, id");
  const [teamRows] = await pool.query<RowDataPacket[]>("SELECT * FROM team_members ORDER BY sort_order, id");

  if (!siteRow || !seoRow) {
    throw new Error("site_settings / seo_settings boş. Önce seed çalıştırın.");
  }

  const site: SiteContent = {
    name: siteRow.name,
    shortName: siteRow.short_name,
    legalName: siteRow.legal_name,
    tagline: siteRow.tagline,
    phone: siteRow.phone,
    whatsapp: siteRow.whatsapp,
    email: siteRow.email,
    address: siteRow.address,
    hours: siteRow.hours,
    url: siteRow.url,
    founded: Number(siteRow.founded),
    mapEmbedUrl: siteRow.map_embed_url,
    socials: {
      instagram: siteRow.social_instagram || "",
      linkedin: siteRow.social_linkedin || "",
      facebook: siteRow.social_facebook || "",
    },
    stats: asJson(siteRow.stats_json, []),
  };

  const seo: SeoSettings = {
    defaultTitle: seoRow.default_title,
    titleTemplate: seoRow.title_template,
    description: seoRow.description,
    keywords: asJson(seoRow.keywords_json, []),
  };

  const services: ServiceItem[] = serviceRows.map((r) => ({
    slug: r.slug,
    title: r.title,
    short: r.short_text,
    detail: r.detail,
    icon: r.icon,
  }));

  const projects: ProjectItem[] = projectRows.map((r) => ({
    slug: r.slug,
    title: r.title,
    location: r.location,
    type: r.type,
    year: Number(r.year),
    area: r.area,
    services: asJson(r.services_json, []),
    cover: r.cover,
    gallery: asJson(r.gallery_json, []),
    summary: r.summary,
    body: r.body,
  }));

  const posts: PostItem[] = postRows.map((r) => ({
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    category: r.category,
    ...(asJson(r.tags_json, []).length ? { tags: asJson(r.tags_json, [] as string[]) } : {}),
    date: typeof r.published_on === "string"
      ? r.published_on.slice(0, 10)
      : new Date(r.published_on).toISOString().slice(0, 10),
    readMin: Number(r.read_min),
    cover: r.cover,
    body: asJson(r.body_json, []),
  }));

  const jobs: JobItem[] = jobRows.map((r) => ({
    id: r.id,
    title: r.title,
    type: r.type,
    location: r.location,
    desc: r.description,
  }));

  const testimonials: TestimonialItem[] = testimonialRows.map((r) => ({
    quote: r.quote,
    name: r.name,
    role: r.role,
    rating: Number(r.rating),
  }));

  const references: ReferenceItem[] = referenceRows.map((r) => ({
    name: r.name,
    ...(r.logo ? { logo: r.logo } : {}),
    ...(r.people ? { people: r.people } : {}),
  }));

  const processSteps: ProcessStep[] = processRows.map((r) => ({
    no: r.no,
    title: r.title,
    desc: r.description,
  }));

  const values: ValueItem[] = valueRows.map((r) => ({
    title: r.title,
    desc: r.description,
  }));

  const milestones: MilestoneItem[] = milestoneRows.map((r) => ({
    year: r.year,
    title: r.title,
    desc: r.description,
  }));

  const team: TeamMember[] = teamRows.map((r) => ({
    name: r.name,
    role: r.role,
    ...(r.phone ? { phone: r.phone } : {}),
  }));

  return {
    site,
    seo,
    services,
    projects,
    projectFilters: filterRows.map((r) => r.label as string),
    posts,
    jobs,
    testimonials,
    references,
    processSteps,
    values,
    milestones,
    team,
    updatedAt: new Date(siteRow.updated_at || Date.now()).toISOString(),
  };
}

async function saveSite(site: SiteContent) {
  const pool = getPool();
  await pool.query(
    `INSERT INTO site_settings
      (id,name,short_name,legal_name,tagline,phone,whatsapp,email,address,hours,url,founded,map_embed_url,social_instagram,social_linkedin,social_facebook,stats_json)
     VALUES (1,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
     ON DUPLICATE KEY UPDATE
      name=VALUES(name), short_name=VALUES(short_name), legal_name=VALUES(legal_name), tagline=VALUES(tagline),
      phone=VALUES(phone), whatsapp=VALUES(whatsapp), email=VALUES(email), address=VALUES(address), hours=VALUES(hours),
      url=VALUES(url), founded=VALUES(founded), map_embed_url=VALUES(map_embed_url),
      social_instagram=VALUES(social_instagram), social_linkedin=VALUES(social_linkedin), social_facebook=VALUES(social_facebook),
      stats_json=VALUES(stats_json)`,
    [
      site.name, site.shortName, site.legalName, site.tagline, site.phone, site.whatsapp, site.email,
      site.address, site.hours, site.url, site.founded, site.mapEmbedUrl,
      site.socials.instagram, site.socials.linkedin, site.socials.facebook, j(site.stats),
    ],
  );
}

async function saveSeo(seo: SeoSettings) {
  const pool = getPool();
  await pool.query(
    `INSERT INTO seo_settings (id, default_title, title_template, description, keywords_json)
     VALUES (1,?,?,?,?)
     ON DUPLICATE KEY UPDATE
      default_title=VALUES(default_title), title_template=VALUES(title_template),
      description=VALUES(description), keywords_json=VALUES(keywords_json)`,
    [seo.defaultTitle, seo.titleTemplate, seo.description, j(seo.keywords)],
  );
}

async function replaceServices(items: ServiceItem[]) {
  const pool = getPool();
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    await conn.query("DELETE FROM services");
    for (const [i, x] of items.entries()) {
      await conn.query(
        `INSERT INTO services (slug,title,short_text,detail,icon,sort_order) VALUES (?,?,?,?,?,?)`,
        [x.slug, x.title, x.short, x.detail, x.icon, i],
      );
    }
    await conn.commit();
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
}

async function replaceProjects(items: ProjectItem[]) {
  const pool = getPool();
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    await conn.query("DELETE FROM projects");
    for (const [i, x] of items.entries()) {
      await conn.query(
        `INSERT INTO projects (slug,title,location,type,year,area,services_json,cover,gallery_json,summary,body,sort_order)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
        [x.slug, x.title, x.location, x.type, x.year, x.area, j(x.services), x.cover, j(x.gallery), x.summary, x.body, i],
      );
    }
    await conn.commit();
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
}

async function replaceFilters(labels: string[]) {
  const pool = getPool();
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    await conn.query("DELETE FROM project_filters");
    for (const [i, label] of labels.entries()) {
      await conn.query(`INSERT INTO project_filters (label, sort_order) VALUES (?,?)`, [label, i]);
    }
    await conn.commit();
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
}

async function replacePosts(items: PostItem[]) {
  const pool = getPool();
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    await conn.query("DELETE FROM posts");
    for (const x of items) {
      await conn.query(
        `INSERT INTO posts (slug,title,excerpt,category,tags_json,published_on,read_min,cover,body_json) VALUES (?,?,?,?,?,?,?,?,?)`,
        [x.slug, x.title, x.excerpt, x.category, j(x.tags || []), x.date, x.readMin, x.cover, j(x.body)],
      );
    }
    await conn.commit();
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
}

async function replaceJobs(items: JobItem[]) {
  const pool = getPool();
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    await conn.query("DELETE FROM jobs");
    for (const x of items) {
      await conn.query(
        `INSERT INTO jobs (id,title,type,location,description) VALUES (?,?,?,?,?)`,
        [x.id, x.title, x.type, x.location, x.desc],
      );
    }
    await conn.commit();
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
}

async function replaceTestimonials(items: TestimonialItem[]) {
  const pool = getPool();
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    await conn.query("DELETE FROM testimonials");
    for (const [i, x] of items.entries()) {
      await conn.query(
        `INSERT INTO testimonials (quote,name,role,rating,sort_order) VALUES (?,?,?,?,?)`,
        [x.quote, x.name, x.role, x.rating, i],
      );
    }
    await conn.commit();
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
}

async function replaceReferences(items: ReferenceItem[]) {
  const pool = getPool();
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    await conn.query("DELETE FROM `references`");
    for (const [i, x] of items.entries()) {
      await conn.query(`INSERT INTO \`references\` (name,logo,people,sort_order) VALUES (?,?,?,?)`, [
        x.name,
        x.logo || null,
        x.people || null,
        i,
      ]);
    }
    await conn.commit();
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
}

async function replaceProcess(items: ProcessStep[]) {
  const pool = getPool();
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    await conn.query("DELETE FROM process_steps");
    for (const [i, x] of items.entries()) {
      await conn.query(
        `INSERT INTO process_steps (no,title,description,sort_order) VALUES (?,?,?,?)`,
        [x.no, x.title, x.desc, i],
      );
    }
    await conn.commit();
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
}

async function replaceValues(items: ValueItem[]) {
  const pool = getPool();
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    await conn.query("DELETE FROM values_items");
    for (const [i, x] of items.entries()) {
      await conn.query(`INSERT INTO values_items (title,description,sort_order) VALUES (?,?,?)`, [x.title, x.desc, i]);
    }
    await conn.commit();
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
}

async function replaceMilestones(items: MilestoneItem[]) {
  const pool = getPool();
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    await conn.query("DELETE FROM milestones");
    for (const [i, x] of items.entries()) {
      await conn.query(
        `INSERT INTO milestones (year,title,description,sort_order) VALUES (?,?,?,?)`,
        [x.year, x.title, x.desc, i],
      );
    }
    await conn.commit();
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
}

async function replaceTeam(items: TeamMember[]) {
  const pool = getPool();
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    await conn.query("DELETE FROM team_members");
    for (const [i, x] of items.entries()) {
      await conn.query(
        `INSERT INTO team_members (name,role,phone,sort_order) VALUES (?,?,?,?)`,
        [x.name, x.role, x.phone || null, i],
      );
    }
    await conn.commit();
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
}

export async function dbSaveContent(content: ContentStore) {
  await saveSite(content.site);
  await saveSeo(content.seo);
  await replaceServices(content.services);
  await replaceProjects(content.projects);
  await replaceFilters(content.projectFilters);
  await replacePosts(content.posts);
  await replaceJobs(content.jobs);
  await replaceTestimonials(content.testimonials);
  await replaceReferences(content.references);
  await replaceProcess(content.processSteps);
  await replaceValues(content.values);
  await replaceMilestones(content.milestones);
  await replaceTeam(content.team);
}

export async function dbPatchContent<K extends keyof ContentStore>(key: K, value: ContentStore[K]) {
  switch (key) {
    case "site":
      await saveSite(value as SiteContent);
      break;
    case "seo":
      await saveSeo(value as SeoSettings);
      break;
    case "services":
      await replaceServices(value as ServiceItem[]);
      break;
    case "projects":
      await replaceProjects(value as ProjectItem[]);
      break;
    case "projectFilters":
      await replaceFilters(value as string[]);
      break;
    case "posts":
      await replacePosts(value as PostItem[]);
      break;
    case "jobs":
      await replaceJobs(value as JobItem[]);
      break;
    case "testimonials":
      await replaceTestimonials(value as TestimonialItem[]);
      break;
    case "references":
      await replaceReferences(value as ReferenceItem[]);
      break;
    case "processSteps":
      await replaceProcess(value as ProcessStep[]);
      break;
    case "values":
      await replaceValues(value as ValueItem[]);
      break;
    case "milestones":
      await replaceMilestones(value as MilestoneItem[]);
      break;
    case "team":
      await replaceTeam(value as TeamMember[]);
      break;
    case "updatedAt":
      break;
    default:
      break;
  }
}

export async function dbUpsertCollectionItem(
  collection: CollectionKey,
  item: Record<string, unknown>,
  idKey: string,
) {
  const content = await dbLoadContent();
  const list = [...(content[collection] as Record<string, unknown>[])];
  const id = String(item[idKey] ?? "");
  const idx = list.findIndex((x) => String(x[idKey]) === id);
  if (idx >= 0) list[idx] = item;
  else list.push(item);
  await dbPatchContent(collection, list as never);
  return idx >= 0 ? "update" : "create";
}

export async function dbDeleteCollectionItem(collection: CollectionKey, idKey: string, id: string) {
  const content = await dbLoadContent();
  const list = (content[collection] as Record<string, unknown>[]).filter((x) => String(x[idKey]) !== id);
  await dbPatchContent(collection, list as never);
}

export async function dbGetSubmissions(): Promise<SubmissionsStore> {
  const pool = getPool();
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM submissions ORDER BY created_at DESC LIMIT 500",
  );
  const items: Submission[] = rows.map((r) => {
    const base = {
      id: r.id as string,
      name: r.name as string,
      phone: r.phone as string,
      email: r.email as string,
      message: r.message as string,
      status: r.status as Submission["status"],
      createdAt: new Date(r.created_at).toISOString(),
      ...(r.note ? { note: r.note as string } : {}),
    };
    if (r.type === "career") {
      return {
        ...base,
        type: "career" as const,
        jobId: (r.job_id as string) || "",
        jobTitle: (r.job_title as string) || "",
        ...(r.cv_url ? { cvUrl: r.cv_url as string } : {}),
      };
    }
    return {
      ...base,
      type: "contact" as const,
      subject: (r.subject as string) || "",
    };
  });
  return { items };
}

export async function dbAddSubmission(item: Submission) {
  const pool = getPool();
  await pool.query(
    `INSERT INTO submissions
      (id,type,name,phone,email,subject,message,job_id,job_title,cv_url,status,note,created_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      item.id,
      item.type,
      item.name,
      item.phone,
      item.email,
      item.type === "contact" ? item.subject : null,
      item.message,
      item.type === "career" ? item.jobId : null,
      item.type === "career" ? item.jobTitle : null,
      item.type === "career" ? item.cvUrl || null : null,
      item.status,
      item.note || null,
      new Date(item.createdAt),
    ],
  );
}

export async function dbUpdateSubmission(id: string, patch: Partial<Submission>) {
  const pool = getPool();
  const fields: string[] = [];
  const values: unknown[] = [];
  if (patch.status !== undefined) {
    fields.push("status = ?");
    values.push(patch.status);
  }
  if (patch.note !== undefined) {
    fields.push("note = ?");
    values.push(patch.note);
  }
  if (!fields.length) return;
  values.push(id);
  await pool.query(`UPDATE submissions SET ${fields.join(", ")} WHERE id = ?`, values);
}

export async function dbDeleteSubmission(id: string) {
  const pool = getPool();
  await pool.query("DELETE FROM submissions WHERE id = ?", [id]);
}

export async function dbGetActivity(): Promise<ActivityStore> {
  const pool = getPool();
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM activity_log ORDER BY created_at DESC LIMIT 200",
  );
  return {
    items: rows.map((r) => ({
      id: r.id as string,
      action: r.action as string,
      entity: r.entity as string,
      detail: r.detail as string,
      user: r.user_name as string,
      at: new Date(r.created_at).toISOString(),
    })),
  };
}

export async function dbLogActivity(input: Omit<ActivityItem, "id" | "at">) {
  const pool = getPool();
  const id = crypto.randomUUID();
  await pool.query(
    `INSERT INTO activity_log (id, action, entity, detail, user_name, created_at) VALUES (?,?,?,?,?,?)`,
    [id, input.action, input.entity, input.detail, input.user, new Date()],
  );
  // keep last 200
  await pool.query(
    `DELETE FROM activity_log WHERE id NOT IN (
      SELECT id FROM (
        SELECT id FROM activity_log ORDER BY created_at DESC LIMIT 200
      ) t
    )`,
  );
}
