import {
  createClient,
  type RedisClientType,
} from "redis";

import { getConfig } from "@/lib/config";

type RedisCache = {
  client: RedisClientType | null;
  promise: Promise<RedisClientType> | null;
};

const globalForRedis =
  globalThis as typeof globalThis & {
    __redis?: RedisCache;
  };

const cache: RedisCache =
  globalForRedis.__redis ?? {
    client: null,
    promise: null,
  };

globalForRedis.__redis = cache;

export async function getRedisClient() {
  if (cache.client?.isReady) {
    return cache.client;
  }

  if (!cache.promise) {
    cache.promise = (async () => {
      const config = await getConfig();

      const client = createClient({
        url: config.redisUrl,
      });

      client.on("error", (error) => {
        console.error("Redis error:", error);
      });

      await client.connect();

      return client;
    })();
  }

  try {
    cache.client = await cache.promise;

    return cache.client;
  } catch (error) {
    cache.client = null;
    cache.promise = null;

    throw error;
  }
}