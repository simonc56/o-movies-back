
// function to fetch movie from TMDB API using axios with the url as an argument and the API key in the headers return the response data or an error
import axios from 'axios';

export async function fetchMovieTMDB(url) {
  const options = {
    method: 'GET',
    url: url,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMmZjZGZlYjUwZTlhYWJlOGE0NjNmZTExNjkyMGYwNyIsInN1YiI6IjY2MzlkN2U2NTQ1MDhkMDEyOGQzYjc1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9Qul4oHJwXLJwW5YcyyMqBwC_cwLsDrH9k9e2Y-lAcQ'
    }
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;  // Re-throw the error to handle it in the caller
  }
}


