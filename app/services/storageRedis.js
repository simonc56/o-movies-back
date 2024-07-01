import { buildStorage, canStale } from "axios-cache-interceptor";
import { createClient } from "redis";

const DEFAULT_TTL = 48 * 60 * 60 * 1000; // 48 heures en millisecondes

const client = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_URL,
    port: process.env.REDIS_PORT,
  },
});

client.on("error", (err) => {
  console.error("Erreur de connexion au client Redis :", err);
});

const redisStorage = buildStorage({
  async find(key) {
    try {
      const result = await client.get(`axios-cache-${key}`);
      return result ? JSON.parse(result) : null;
    } catch (err) {
      console.error(`Error finding key: axios-cache-${key}`, err);
      throw err;
    }
  },
  async set(key, value, req) {
    try {
      let ttl;
      if (value.state === "loading") {
        ttl = req?.cache && typeof req.cache.ttl === "number" ? req.cache.ttl : DEFAULT_TTL;
      } else if (value.state === "stale" && value.ttl) {
        ttl = value.ttl / 1000;
      } else if (value.state === "cached" && !canStale(value)) {
        ttl = (value.ttl || DEFAULT_TTL) / 1000;
      } else {
        ttl = DEFAULT_TTL;
      }

      await client.set(`axios-cache-${key}`, JSON.stringify(value), { EX: ttl });
    } catch (err) {
      console.error(`Error setting key: axios-cache-${key}`, err);
      throw err;
    }
  },
  async remove(key) {
    try {
      await client.del(`axios-cache-${key}`);
    } catch (err) {
      console.error(`Error removing key: axios-cache-${key}`, err);
      throw err;
    }
  },
});

await client.connect();

export default redisStorage;
