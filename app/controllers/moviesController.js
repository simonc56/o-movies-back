import axios from "axios";
import ApiError from "../errors/ApiError.js";
import { Media, User, sequelize } from "../models/associations.js";
import { fetchTMDB } from "../services/axios.js";
import findReleaseDate from "../utils/findReleaseDate.js";
import functionSqL from "../utils/functionSql.js";

// base url and poster/profile sizes should be retrieved with https://api.themoviedb.org/3/configuration
// see https://developer.themoviedb.org/reference/configuration-details
export const IMAGE_BASEURL = "https://image.tmdb.org/t/p";
export const LANGUAGE = "fr-FR";
const REGION = "FR";

let moviesGenres = null;
async function TMDBMoviesGenres() {
  if (!moviesGenres || moviesGenres.length === 0) {
    const response = await fetchTMDB("/genre/movie/list", { language: LANGUAGE });
    moviesGenres = response?.genres || [];
  }
  return moviesGenres;
}

function fullPosterPath(poster_path) {
  return poster_path ? `${IMAGE_BASEURL}/w300_and_h450_bestv2${poster_path}` : null;
}

function fullProfilePath(profile_path) {
  return profile_path ? `${IMAGE_BASEURL}/w300_and_h300_bestv2${profile_path}` : null;
}

async function cleanMoviesData(movies) {
  const allGenres = await TMDBMoviesGenres();
  // map the genre_ids to return the genre name and id
  const populateGenres = (genre_ids) => {
    if (!genre_ids) {
      return null;
    }
    return genre_ids.map((genre_id) => {
      const genre = allGenres.find((category) => category.id === genre_id);
      return genre ? { id: genre.id, name: genre.name } : genre_id;
    });
  };
  return movies.map((movie) => {
    return {
      tmdb_id: movie.id,
      title_fr: movie.title,
      release_date: movie.release_date,
      poster_path: fullPosterPath(movie.poster_path),
      genres: populateGenres(movie.genre_ids),
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
    };
  });
}

const moviesController = {
  async getMovieById(req, res, next) {
    const id = parseInt(req.params.id);
    // Fetch the movie from the TMDB API
    const movie = await fetchTMDB(`/movie/${id}`, { language: LANGUAGE });
    // If the response is an error, return a 400 response with the error message
    if (axios.isAxiosError(movie)) {
      return next(new ApiError(400, movie.response.data.status_message));
    }
    // Fetch the cast of the movie from the TMDB API
    const cast = await fetchTMDB(`/movie/${id}/credits`, { language: LANGUAGE });
    // doing a query to get the reviews of the movie with user information
    const reviews = await sequelize.query(
      `
                SELECT "review".id AS review_id, "review".content, "review".created_at, "user".firstname AS user_firstname,"media".id
                FROM media
                JOIN "review" ON "media".id = "review".media_id
                JOIN "user" ON review.user_id = "user".id
                WHERE "media".tmdb_id = :tmdb_id;
            `,
      {
        replacements: { tmdb_id: id },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    const movieInDb = await Media.findOne({ where: { tmdb_id: id } });
    // i initialize the average rating to null and if the function return a result i assign the value to the variable
    let averageRating = null;
    if (movieInDb) {
      const result = await functionSqL.averageRating(movieInDb.id);
      averageRating = result;
    }
    const releaseDate = await findReleaseDate(id);
    // restructered data to send to the client
    const data = {
      tmdb_id: movie.id,
      id: reviews.length > 0 ? reviews[0].id : null,
      title_fr: movie.title,
      status: movie.status,
      original_title: movie.original_title,
      adult: movie.adult,
      // i check if the average rating is not null and i assign the value to the variable
      average_rating: averageRating ? averageRating.media_average_rating : null,
      original_language: movie.original_language,
      release_date: releaseDate ? releaseDate : "1997-04-10",
      runtime: movie.runtime,
      budget: movie.budget,
      popularity: movie.popularity,
      rating: movie.vote_average,
      country: movie.origin_country,
      genres: movie.genres,
      tagline: movie.tagline,
      overview: movie.overview,
      poster_path: fullPosterPath(movie.poster_path),
      cast: cast.cast
        .map((actor) => {
          return {
            id: actor.cast_id,
            name: actor.name,
            character: actor.character,
            profile_path: fullProfilePath(actor.profile_path),
          };
        })
        .slice(0, 5),
      crew: cast.crew
        // i filter for getting only the director of the movie
        .filter((crew) => crew.job === "Director")
        .map((crew) => {
          return {
            id: crew.id,
            name: crew.name,
            job: crew.job,
            profile_path: fullProfilePath(crew.profile_path),
          };
        }),
      reviews: reviews,
    };
    // return the data to the client
    return res.json({ status: "success", data: data });
  },
  async getUserdataAboutMovieById(req, res) {
    const id = parseInt(req.params.id);
    const movieInDb = await Media.findOne({ where: { tmdb_id: id } });
    let userData = {
      user_id: req.userId,
      rating: null,
      review: null,
      viewed: false,
      in_playlists: [],
    };
    // if the user is authenticated and the movie is in the database, get the user's rating and review of the movie
    if (req.userId && movieInDb) {
      // get the user's rating and review of the movie
      const userInput = await User.findOne({
        attributes: ["id"],
        where: { id: req.userId },
        include: [
          {
            association: "medias_rating",
            attributes: [["id", "media_id"]],
            through: { attributes: ["value", ["id", "rating_id"]] },
            where: { id: movieInDb.id },
            required: false,
          },
          {
            association: "medias_review",
            attributes: [["id", "media_id"]],
            through: { attributes: ["content", ["id", "review_id"]] },
            where: { id: movieInDb.id },
            required: false,
          },
          {
            association: "medias_view",
            attributes: [["id", "media_id"]],
            where: { id: movieInDb.id },
            required: false,
          },
          {
            association: "playlists",
            attributes: ["name", ["id", "playlist_id"]],
            include: [
              {
                association: "medias",
                attributes: [["id", "media_id"]],
                where: { id: movieInDb.id },
              },
            ],
          },
        ],
      });
      const alreadyInPlaylist = userInput.playlists.map((playlist) => {
        return playlist.dataValues.playlist_id;
      });
      userData = {
        user_id: userInput.id,
        rating: userInput.medias_rating[0] ? userInput.medias_rating[0].rating : null,
        review: userInput.medias_review[0] ? userInput.medias_review[0].review : null,
        viewed: userInput.medias_view[0] ? true : false,
        in_playlists: alreadyInPlaylist,
      };
    }
    return res.json({ status: "success", data: userData });
  },
  async getMovies(req, res, next) {
    const moviesFetchFromTheApi = await fetchTMDB("/discover/movie", {
      include_adult: false,
      include_video: false,
      language: LANGUAGE,
      region: REGION,
      ...req.query,
    });
    // if the response is an error, return a 400 response with the error message
    if (!moviesFetchFromTheApi.results) {
      return next(new ApiError(404, "No movie found"));
    }
    const movies = await cleanMoviesData(moviesFetchFromTheApi.results);
    return res.json({ status: "success", data: movies });
  },
  async getUpcomingMovies(req, res) {
    const moviesFetchFromTheApi = await fetchTMDB("/movie/upcoming", { language: LANGUAGE, region: REGION });
    const movies = await cleanMoviesData(moviesFetchFromTheApi.results);
    return res.json({ status: "success", data: movies });
  },
  async getNowPlayingMovies(req, res) {
    const moviesFetchFromTheApi = await fetchTMDB("/movie/now_playing", { language: LANGUAGE, region: REGION });
    const movies = await cleanMoviesData(moviesFetchFromTheApi.results);
    return res.json({ status: "success", data: movies });
  },
  async getPopularMovies(req, res) {
    const moviesFetchFromTheApi = await fetchTMDB("/movie/popular", { language: LANGUAGE, region: REGION });
    const movies = await cleanMoviesData(moviesFetchFromTheApi.results);
    return res.json({ status: "success", data: movies });
  },
  async getTopRatedMovies(req, res) {
    const moviesFetchFromTheApi = await fetchTMDB("/movie/top_rated", { language: LANGUAGE, region: REGION });
    const movies = await cleanMoviesData(moviesFetchFromTheApi.results);
    return res.json({ status: "success", data: movies });
  },
  async getMovieBySearch(req, res) {
    const moviesFetchFromTheApi = await fetchTMDB("/search/movie", { query: req.query.query, language: LANGUAGE });
    const movies = moviesFetchFromTheApi.results.map((movie) => {
      return {
        tmdb_id: movie.id,
        title_fr: movie.title,
        release_date: movie.release_date,
      };
    });
    return res.json({ status: "success", data: movies });
  },
  async getMovieGenres(req, res) {
    const allGenres = await TMDBMoviesGenres();
    const categories = allGenres.map((category) => {
      return {
        id: category.id,
        name: category.name,
      };
    });
    return res.json({ status: "success", data: categories });
  },
};

export default moviesController;
