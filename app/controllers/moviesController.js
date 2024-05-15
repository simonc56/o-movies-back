import schema from '../validation/movieSchemas.js';
import { Media } from '../models/associations.js';
import validateData from '../validation/validator.js';
import { fetchMovieTMDB } from '../services/axios.js';


const moviesController = {
    async getMoviesById(req, res) {
        try  {
            const id = req.params.id;            
            const  { parsedData , errors }= validateData(parseInt(id), schema.getId);
            if (errors) {
                return res.status(400).json({status: 'fail', data: errors });
            }
            const data = await fetchMovieTMDB(`https://api.themoviedb.org/3/movie/${parsedData}?language=fr-FR`);
            const movie = {
                title_fr: data.title,
                title_en: data.original_title,
                adult: data.adult,
                genres: data.genres,
                release_date: data.release_date,
                budget: data.budget,
                popularity: data.popularity,
                belongs_to_collection: data.belongs_to_collection,
                production_countries: data.production_countries,
                overview: data.overview,
                production_companies: data.production_companies,  
            }
            console.log(movie);
            const movieAlreadyExist = await Media.findOne({ where: { tmdb_id: parsedData } });
            if (!movieAlreadyExist) {
                await Media.create({ tmdb_id: parsedData });               
            }
            return res.json({status: 'success', data: data });
        }
        catch (error) {
            return res.status(400).json(error.message);
        }
    }
};

export default moviesController;
