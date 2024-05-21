import { z } from 'zod';

const schema = {
    reviewSchema : z.object({
        content: z.string().min(1).max(1000),
        media_id: z.number().int().min(1).optional(),
        user_id: z.number().int().min(1),
        tmdb_id : z.number().int().min(1),
    }),   
};

export default schema;