import axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import redisStorage from "./storageRedis.js";

const instanceAxios = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});
const instanceAxiosCached = setupCache(instanceAxios, { storage: redisStorage });

export async function fetchMovieTMDB(url) {
  const options = {
    method: "GET",
    url: url,
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
