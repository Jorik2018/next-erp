import postgres, { type Sql } from "postgres";
import { getConfig } from "../config";


let sqlClient: Sql | null = null;

export async function getSql(): Promise<Sql> {
  if (sqlClient) {
    return sqlClient;
  }

  const config = await getConfig();

  sqlClient = postgres(config.databaseUrl, {
    ssl: "require",
  });

  return sqlClient;
}