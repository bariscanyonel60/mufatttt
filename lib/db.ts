import mysql, { type Pool, type RowDataPacket, type ResultSetHeader } from "mysql2/promise";

let pool: Pool | null = null;

export function isDbEnabled() {
  return Boolean(
    process.env.DB_HOST?.trim() &&
      process.env.DB_USER?.trim() &&
      process.env.DB_PASSWORD !== undefined &&
      process.env.DB_NAME?.trim(),
  );
}

export function getPool(): Pool {
  if (!isDbEnabled()) {
    throw new Error("MySQL yapılandırılmamış (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME).");
  }
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 8,
      namedPlaceholders: true,
      timezone: "Z",
    });
  }
  return pool;
}

export type { RowDataPacket, ResultSetHeader };

export function asJson<T>(value: unknown, fallback: T): T {
  if (value == null) return fallback;
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as T;
    } catch {
      return fallback;
    }
  }
  return value as T;
}
