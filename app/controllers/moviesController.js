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
            console.log(data);
            const movieAlreadyExist = await Media.findOne({ where: { tmdb_id: parsedData } });
            if(movieAlreadyExist ) {
                console.log('Movie already exist')
            }
            if (!movieAlreadyExist) {
                await Media.create({ tmdb_id: parsedData });               
            }
                //return res.status(404).json({ status: 'error', data:'Movie not find' });
                return res.json({status: 'success', data: data });
        }
        catch (error) {
            return res.status(400).json(error.message);
        }
    }
};

export default moviesController;
