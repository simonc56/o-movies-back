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
  find(key) {
    return client.get(`axios-cache-${key}`).then((result) => result && JSON.parse(result));
  },
  set(key, value, req) {
    let expirationTime;

    if (value.state === "loading") {
      expirationTime = Date.now() + (req?.cache && typeof req.cache.ttl === "number" ? req.cache.ttl : 60000);
    } else if (value.state === "stale" && value.ttl) {
      expirationTime = value.createdAt + value.ttl;
    } else if (value.state === "cached" && !canStale(value)) {
      expirationTime = value.createdAt + (value.ttl || DEFAULT_TTL);
    } else {
      expirationTime = Date.now() + DEFAULT_TTL;
    }

    return client.set(`axios-cache-${key}`, JSON.stringify(value), {
      PXAT: expirationTime,
    });
  },
  remove(key) {
    return client.del(`axios-cache-${key}`);
  },
});

await client.connect();

export default redisStorage;
