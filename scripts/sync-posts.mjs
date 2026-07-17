import fs from "fs";
import path from "path";

// Load env
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
  }
}

const { default: mysql } = await import("mysql2/promise");

// Import TS via tsx dynamic
const { posts } = await import("../lib/data.ts");

const contentPath = path.join(process.cwd(), "data/content.json");
const content = JSON.parse(fs.readFileSync(contentPath, "utf8"));
content.posts = posts;
content.updatedAt = new Date().toISOString();
fs.writeFileSync(contentPath, JSON.stringify(content, null, 2), "utf8");
console.log("content.json posts:", content.posts.length);

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const conn = await pool.getConnection();
try {
  try {
    await conn.query("ALTER TABLE posts ADD COLUMN tags_json JSON NULL AFTER category");
    console.log("Added tags_json column");
  } catch (e) {
    if (e.code !== "ER_DUP_FIELDNAME") throw e;
  }
  await conn.beginTransaction();
  await conn.query("DELETE FROM posts");
  for (const p of posts) {
    await conn.query(
      `INSERT INTO posts (slug, title, excerpt, category, tags_json, published_on, read_min, cover, body_json)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        p.slug,
        p.title,
        p.excerpt,
        p.category,
        JSON.stringify(p.tags || []),
        p.date,
        p.readMin,
        p.cover,
        JSON.stringify(p.body),
      ],
    );
  }
  await conn.commit();
  const [countRows] = await conn.query("SELECT COUNT(*) AS c FROM posts");
  const [rows] = await conn.query(
    "SELECT slug, category, published_on FROM posts ORDER BY published_on DESC LIMIT 8",
  );
  console.log("MySQL posts:", countRows[0].c);
  console.table(rows);
} catch (e) {
  await conn.rollback();
  throw e;
} finally {
  conn.release();
  await pool.end();
}
