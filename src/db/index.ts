import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
// @ts-ignore
import postgres, { Sql } from "postgres";

let client: Sql | undefined;
let db: PostgresJsDatabase | undefined;

export function dbConnection() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in the environment variables");
  }

  if (!client) {
    client = postgres(process.env.DATABASE_URL, { ssl: 'require' }); // for production
    db = drizzle(client!);
  }

  return db;
}
