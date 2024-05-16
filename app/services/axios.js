
// function to fetch movie from TMDB API using axios with the url as an argument and the API key in the headers return the response data or an error
import axios from 'axios';
// i want my error is returned to the caller
export async function fetchMovieTMDB(url) {
  const options = {
    method: 'GET',
    url: url,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`  
    }
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    return error;
  }
}


