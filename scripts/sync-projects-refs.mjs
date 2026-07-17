import fs from "fs";
import path from "path";

const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
  }
}

const { default: mysql } = await import("mysql2/promise");
const { projects, references } = await import("../lib/data.ts");

const contentPath = path.join(process.cwd(), "data/content.json");
const content = JSON.parse(fs.readFileSync(contentPath, "utf8"));
content.projects = projects;
content.references = references;
content.updatedAt = new Date().toISOString();
fs.writeFileSync(contentPath, JSON.stringify(content, null, 2), "utf8");
console.log("content.json: projects", projects.length, "references", references.length);

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const conn = await pool.getConnection();
try {
  await conn.beginTransaction();
  await conn.query("DELETE FROM projects");
  for (const [i, p] of projects.entries()) {
    await conn.query(
      `INSERT INTO projects
        (slug,title,location,type,year,area,services_json,cover,gallery_json,summary,body,sort_order)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        p.slug, p.title, p.location, p.type, p.year, p.area,
        JSON.stringify(p.services), p.cover, JSON.stringify(p.gallery),
        p.summary, p.body, i,
      ],
    );
  }
  await conn.query("DELETE FROM `references`");
  for (const [i, r] of references.entries()) {
    await conn.query(
      "INSERT INTO `references` (name, logo, people, sort_order) VALUES (?, ?, ?, ?)",
      [r.name, r.logo || null, r.people || null, i],
    );
  }
  await conn.commit();
  console.log("MySQL synced");
} catch (e) {
  await conn.rollback();
  throw e;
} finally {
  conn.release();
  await pool.end();
}
