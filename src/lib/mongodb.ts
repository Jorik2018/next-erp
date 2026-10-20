// src/lib/mongodb.ts

import { MongoClient } from "mongodb";

import { getConfig } from "@/lib/config";

const globalForMongo =
  globalThis as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

async function createMongoClient(): Promise<MongoClient> {
  const config = await getConfig();

  const client = new MongoClient(
    config.mongoUrl
  );

  await client.connect();

  return client;
}

export function getMongoClient(): Promise<MongoClient> {
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise =
      createMongoClient().catch((error) => {
        globalForMongo._mongoClientPromise =
          undefined;

        throw error;
      });
  }

  return globalForMongo._mongoClientPromise;
}