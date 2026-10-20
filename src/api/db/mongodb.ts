import mongoose from "mongoose";
import { getConfig } from "../../lib/config";

type MongoCache = {
  connection: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalForMongo = globalThis as typeof globalThis & {
  __mongo?: MongoCache;
};

const cache: MongoCache = globalForMongo.__mongo ?? {
  connection: null,
  promise: null,
};

globalForMongo.__mongo = cache;

export async function connectMongoDB() {
  if (cache.connection) {
    return cache.connection;
  }

  if (!cache.promise) {
    cache.promise = (async () => {
      const config = await getConfig();

      return mongoose.connect(config.mongoUrl, {
        bufferCommands: false,
      });
    })();
  }

  try {
    cache.connection = await cache.promise;

    return cache.connection;
  } catch (error) {
    // Allows a new connection attempt if the previous one failed.
    cache.promise = null;
    cache.connection = null;

    throw error;
  }
}