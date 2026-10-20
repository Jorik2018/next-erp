import { getVaultSecret } from "@/lib/vault/client";

export interface AppConfig {
  databaseUrl: string;
  mongoUrl: string;
  jwtPublicKeyLocation?: string;
  redisUrl?: string;
}

let config: AppConfig | null = null;

export async function getConfig(): Promise<AppConfig> {
  if (config) {
    return config;
  }

  if (process.env.NODE_ENV === "development") {
    config = {
      databaseUrl: getRequiredEnv("DATABASE_URL"),
      mongoUrl: getRequiredEnv("MONGODB_URI"),
      jwtPublicKeyLocation:
        process.env.JWT_PUBLIC_KEY_LOCATION,
      redisUrl: process.env.REDIS_URL,
    };

    return config;
  }

  const secrets = await getVaultSecret("global");

  config = {
    databaseUrl: getRequiredSecret(
      secrets,
      "DATABASE_URL"
    ),
    mongoUrl: getRequiredSecret(
      secrets,
      "MONGODB_URI"
    ),
    jwtPublicKeyLocation:
      secrets.JWT_PUBLIC_KEY_LOCATION,
    redisUrl: secrets.REDIS_URL,
  };

  return config;
}

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Environment variable ${name} is required`
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
      `Vault secret ${name} is required`
    );
  }

  return value;
}