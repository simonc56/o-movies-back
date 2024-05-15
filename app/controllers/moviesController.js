import schema from '../validation/movieSchemas.js';
import { Media } from '../models/associations.js';
import validateData from '../validation/validator.js';

const moviesController = {
    async getMoviesById(req, res) {
        try  {
            const id = req.params.id    ;
            validateData(id, schema.getId);
            const movie = await Media.findByPk(id);
            if (!movie) {
                return res.status(404).json({ status: 'error', data:'Movie not find' });
            }
            return res.json(movie);
        }
        catch (error) {
            return res.status(400).json(error.message);
        }
    }
};

export default moviesController;
