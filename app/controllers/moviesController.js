import schema from '../validation/movieSchemas.js';
import { Media } from '../models/associations.js';
import validateData from '../validation/validator.js';
import { fetchMovieTMDB } from '../services/axios.js';
import axios from 'axios';
import { User } from '../models/User.js';
import { Review } from '../models/Review.js';
const moviesController = {
    async getMoviesById(req, res) {
        try  {
            const id = req.params.id;         
            // Validate the id parameter   
            const  { parsedData , errors }= validateData(parseInt(id), schema.getId);
            // If there are errors, return a 400 response with the errors
            if (errors) {
                return res.status(400).json({status: 'fail', data: errors });
            }
            // Fetch the movie from the TMDB API
            const movie = await fetchMovieTMDB(`https://api.themoviedb.org/3/movie/${parsedData}?language=fr-FR`);
            // If the response is an error, return a 400 response with the error message
            if (axios.isAxiosError(movie)) {
                return res.status(400).json({status: 'fail', data: movie.message });
            };      
            const cast = await fetchMovieTMDB(`https://api.themoviedb.org/3/movie/${parsedData}/credits?language=fr-FR`);
            const media = await Media.findAll({
                where: { tmdb_id: parsedData },
                include: [
                  {
                    attributes: ['firstname'],
                    association: 'users_rating',
                    through: { attributes: ['id','value'] } 
                  },
                  {
                    attributes: ['id', 'firstname'],
                    association: 'users_review',
                    through: { attributes: ['id','content','created_at'] } 
                  }
                ]
              });
            console.log(JSON.stringify(media, null, 2));               
            //console.log(JSON.stringify(media.users_review, null, 2));
            //console.log(JSON.stringify(media.users_review.map(review => review.review), null, 2));
            //console.log(JSON.stringify(media.users_rating.map(rating => rating.rating), null, 2));           
            const data = {
                id: movie.id,
                title_fr: movie.title,
                original_title: movie.original_title,
                adult: movie.adult,
                release_date: movie.release_date,
                budget: movie.budget,
                popularity: movie.popularity,
                genres: movie.genres,
                tagline : movie.tagline,
                overview: movie.overview,
                poster_path: `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`,
                cast: cast.cast.map(actor => {
                     return { 
                        id : actor.cast_id,
                        name: actor.name, 
                        character: actor.character, 
                        profile_path: `https://image.tmdb.org/t/p/w300_and_h450_bestv2${actor.profile_path}` } }),
                crew: cast.crew
                .filter(crew => crew.job === 'Director')
                .map(crew => {
                    return {
                        id: crew.id,
                        name: crew.name,
                        job: crew.job,
                        profile_path: `https://image.tmdb.org/t/p/w300_and_h450_bestv2${crew.profile_path}`
                    };
                }),
                reviews: media.users_review
            };            
            return res.json({status: 'success', data: data });
        }
        catch (error) {
            return res.status(400).json(error.message);
        };
    }
};

export default moviesController;
