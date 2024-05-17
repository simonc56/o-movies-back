import { z } from 'zod';

const schema = {
    reviewSchema : z.object({
        media_id: z.number().int().min(1),
        user_id: z.number().int().min(1),
        content: z.string().min(1).max(1000) 
    }).required(),   
};

export default schema;