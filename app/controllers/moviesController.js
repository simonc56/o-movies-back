import schema from '../validation/movieSchemas.js';
import { Media } from '../models/associations.js';
import validateData from '../validation/validator.js';
import { fetchMovieTMDB } from '../services/axios.js';
import axios, { AxiosError } from 'axios';
import { User } from '../models/associations.js';
import { Rating } from '../models/associations.js';
import { Review } from '../models/associations.js';


const moviesController = {
    async getMoviesById(req, res) {
        try  {
            const id = req.params.id;            
            const  { parsedData , errors }= validateData(parseInt(id), schema.getId);
            if (errors) {
                return res.status(400).json({status: 'fail', data: errors });
            }
            const movie = await fetchMovieTMDB(`https://api.themoviedb.org/3/movie/${parsedData}?language=fr-FR`);
            if (axios.isAxiosError(movie)) {
                return res.status(400).json({status: 'fail', data: movie.message });
            }
            // i have a table media with tmdb_id and a table review who use the id of the media
            const review = await Review.findAll({ where: { media_id: movie.id } });
     
             
         

            console.log(JSON.stringify(re, null, 2))

            const cast = await fetchMovieTMDB(`https://api.themoviedb.org/3/movie/${parsedData}/credits?language=fr-FR`);
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
                cast: cast.cast.map(actor => { return { id : actor.cast_id,name: actor.name, character: actor.character, profile_path: `https://image.tmdb.org/t/p/w300_and_h450_bestv2${actor.profile_path}` } }),
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
                review: more.users_review.map(review => { return { id: review.id, content: review.content } }),
            };            
            return res.json({status: 'success', data: data });
        }
        catch (error) {
            return res.status(400).json(error.message);
        }
    }
};

export default moviesController;
