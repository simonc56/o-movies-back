import { z } from 'zod';

const schema = {
    createReviewSchema : z.object({
        content: z.string().min(1).max(1000),
        tmdb_id : z.number().int().min(1),
    }),
    updateReviewSchema : z.object({ 
        content: z.string().min(1).max(1000),
        reviewId: z.number().int().min(1),
        userId: z.number().int().min(1),  
    }),

};

export default schema;