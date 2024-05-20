import { z } from 'zod';

const schema = {
    getId: z.number().int().min(1),
    getMoviesWithQueries : z.object({           
        page : z.string().refine(value => !isNaN(parseInt(value)), { message: 'page must be a number' }).optional(),
        include_adult: z.string().refine(value => ['true', 'false'].includes(value), { message: 'include_adult must be true or false' }).optional(),
        sort_by: z.string().refine(value => ['popularity.asc', 'popularity.desc',
         'release_date.asc', 'release_date.desc',
          'revenue.asc', 'revenue.desc', 'primary_release_date.asc',
           'primary_release_date.desc', 'title.asc', 'title.desc',
            'vote_average.asc', 'vote_average.desc', 'vote_count.asc', 'vote_count.desc'].includes(value), 
            { message: 'sort_by must be one of popularity.asc, popularity.desc, release_date.asc, release_date.desc, revenue.asc, revenue.desc, primary_release_date.asc, primary_release_date.desc, title.asc, title.desc, vote_average.asc, vote_average.desc, vote_count.asc, vote_count.desc' })
            .optional(),
    }), 
};
export default schema;  

