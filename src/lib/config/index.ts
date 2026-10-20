import { getVaultSecret } from "@/lib/vault/client";

export interface AppConfig {
  databaseUrl: string;
  mongoUrl: string;
  redisUrl: string;

  appwrite: {
    endpoint: string;
    projectId: string;
    apiKey: string;
    databaseId: string;
  };
}

let configPromise: Promise<AppConfig> | null = null;

export function getConfig(): Promise<AppConfig> {
  if (!configPromise) {
    configPromise = loadConfig().catch((error) => {
      configPromise = null;
      throw error;
    });
  }

  return configPromise;
}

async function loadConfig(): Promise<AppConfig> {
  if (process.env.NODE_ENV === "development") {
    return {
      databaseUrl: getRequiredEnv(process.env.DATABASE+"_URL"),
      mongoUrl: getRequiredEnv("MONGODB_URL"),
      redisUrl: getRequiredEnv("REDIS_URL"),

      appwrite: {
        endpoint: getRequiredEnv("APPWRITE_ENDPOINT"),
        projectId: getRequiredEnv("APPWRITE_PROJECT_ID"),
        apiKey: getRequiredEnv("APPWRITE_API_KEY"),
        databaseId: getRequiredEnv("APPWRITE_DATABASE_ID"),
      },
    };
  }

  const secrets = await getVaultSecret("global");

  return {
    databaseUrl: getRequiredSecret(
      secrets,
      getRequiredEnv(process.env.DATABASE+"_URL")
    ),

    mongoUrl: getRequiredSecret(
      secrets,
      "MONGODB_URL"
    ),

    redisUrl: getRequiredSecret(
      secrets,
      "REDIS_URL"
    ),

    appwrite: {
      endpoint: getRequiredSecret(
        secrets,
        "APPWRITE_ENDPOINT"
      ),

      projectId: getRequiredSecret(
        secrets,
        "APPWRITE_PROJECT_ID"
      ),

      apiKey: getRequiredSecret(
        secrets,
        "APPWRITE_API_KEY"
      ),
      databaseId: getRequiredSecret(
        secrets,
        "APPWRITE_DATABASE_ID"
      ),
    },
  };
}

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Missing environment variable: ${name}`
    );
  }

  return value;
}

function getRequiredSecret(
  secrets: Record<string, string>,
  name: string
): string {
  const value = secrets[name];

  if (!value) {
    throw new Error(
      `Missing Vault secret: ${name}`
    );
  }

  return value;
}