import { z } from 'zod';

const schema = {
    reviewSchema : z.object({
    //   mediaId: z.number().int().min(1).max(1000000000),
    //    userId: z.number().int().min(1).max(1000000000),
        content: z.string().min(1).max(1000) 
    }).required(),   
};

export default schema;