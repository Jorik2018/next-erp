// src/lib/appwrite/server.ts

import {
  Client,
  Databases,
  Messaging,
  Storage,
  TablesDB,
  Users,
} from "node-appwrite";

import { getConfig } from "@/lib/config";

interface AppwriteServer {
  client: Client;
  databases: Databases;
  users: Users;
  messaging: Messaging;
  storage: Storage;
  tablesDB: TablesDB;

  endpoint: string;
  projectId: string;
  databaseId: string;
}

let appwritePromise:
  Promise<AppwriteServer> | null = null;

export function getAppwrite(): Promise<AppwriteServer> {
  if (!appwritePromise) {
    appwritePromise = createAppwrite().catch(
      (error) => {
        appwritePromise = null;
        throw error;
      }
    );
  }

  return appwritePromise;
}

async function createAppwrite(): Promise<AppwriteServer> {
  const config = await getConfig();
  console.log("APPWRITE CONFIG", {
    endpoint: config.appwrite.endpoint,
    projectId:
      config.appwrite.projectId
        ? "OK"
        : "MISSING",
    apiKey:
      config.appwrite.apiKey
        ? "OK"
        : "MISSING",
    databaseId:
      config.appwrite.databaseId
        ? "OK"
        : "MISSING",
  });
  const client = new Client()
    .setEndpoint(config.appwrite.endpoint)
    .setProject(config.appwrite.projectId)
    .setKey(config.appwrite.apiKey);

  return {
    client,

    databases: new Databases(client),
    users: new Users(client),
    messaging: new Messaging(client),
    storage: new Storage(client),
    tablesDB: new TablesDB(client),

    endpoint: config.appwrite.endpoint,
    projectId: config.appwrite.projectId,
    databaseId: config.appwrite.databaseId,
  };
}