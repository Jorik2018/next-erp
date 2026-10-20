import {
  Client,
  Databases,
  Messaging,
  Storage,
  TablesDB,
  Users,
} from "node-appwrite";

/**
 * Appwrite connection configuration.
 *
 * Estos valores dependen del entorno y posteriormente
 * pueden obtenerse desde getConfig() / Vault.
 */
export const {
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
} = process.env;

/**
 * IDs estructurales de la aplicación.
 *
 * Estos IDs deben coincidir con los IDs utilizados
 * al crear las tablas en Appwrite.
 */
export const APPWRITE_TABLES = {
  PATIENTS: "patients",
  DOCTORS: "doctors",
  APPOINTMENTS: "appointments",
} as const;

const client = new Client();

client
  .setEndpoint(ENDPOINT!)
  .setProject(PROJECT_ID!)
  .setKey(API_KEY!);

export const databases =
  new Databases(client);

export const users =
  new Users(client);

export const messaging =
  new Messaging(client);

export const storage =
  new Storage(client);

export const tablesDB =
  new TablesDB(client);