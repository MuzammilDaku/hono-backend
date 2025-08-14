import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
// @ts-ignore
import postgres, { Sql } from "postgres";

let client: Sql | undefined;
let db: PostgresJsDatabase | undefined;

export function dbConnection(): PostgresJsDatabase {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in the environment variables");
  }

  if (!db) {
    client = postgres(process.env.DATABASE_URL, { ssl: "require" });
    db = drizzle(client!);
    console.log("📦 Database connection initialized");
  }

  return db;
}
