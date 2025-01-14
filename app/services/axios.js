import axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import redisStorage from "./storageRedis.js";

const instanceAxios = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

let instanceAxiosCached;
if (process.env.USE_REDIS_CACHE === "true") {
  instanceAxiosCached = setupCache(instanceAxios, { storage: redisStorage });
} else {
  instanceAxiosCached = setupCache(instanceAxios);
}

export async function fetchTMDB(url, params = {}) {
  const options = {
    method: "GET",
    url,
    params,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  };
  try {
    const response = await instanceAxiosCached.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
