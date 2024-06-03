import  { createClient } from "redis";  // v4
import { buildStorage, canStale } from "axios-cache-interceptor";

const client = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_URL,
    port: 16260
  }
});

const redisStorage = buildStorage({
  find(key) {
    return client
      .get(`axios-cache-${key}`)
      .then((result) => result && JSON.parse(result));
  },
  
  set(key, value, req) {
    return client.set(`axios-cache-${key}`, JSON.stringify(value), {
      PXAT:

        value.state === "loading"
          ? Date.now() +
                (req?.cache && typeof req.cache.ttl === "number"
                  ? req.cache.ttl
                  : 
                  60000)
          : 
          (value.state === "stale" && value.ttl) ||
                (value.state === "cached" && !canStale(value))
            ?
            value.createdAt + (value.ttl || 0)
            : 
            undefined
    });
  },  
  remove(key) {
    return client.del(`axios-cache-${key}`);
  }
});

await client.connect();

  

export default redisStorage; 

