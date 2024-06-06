import { fetchMovieTMDB } from "../services/axios.js";

export default async function findReleaseDate(id) { 
  const releaseDate = await fetchMovieTMDB(`/movie/${id}/release_dates`);
  if (!releaseDate.results || releaseDate.results.length === 0) {
    return null;
  }
  const frReleaseDate = releaseDate.results.find((release) => release.iso_3166_1 === "FR"); 
  if (frReleaseDate){
    if(frReleaseDate.release_dates.find((release) => release.type === 3)){
      return frReleaseDate.release_dates.find((release) => release.type === 3).release_date.split("T")[0];
    } else {
      return frReleaseDate.release_dates[0].release_date.split("T")[0];
    }
  }
  return releaseDate.results[0].release_dates[0].release_date.split("T")[0]; 
}
