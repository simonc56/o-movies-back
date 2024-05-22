import { z } from "zod";

const schema = {
  createRatingSchema : z.object({
    value: z.number().int().min(1).max(5), // rating must be an integer between 1 and 5 for the rating stars
    tmdb_id : z.number().int().min(1),
  }),
  updateRatingSchema : z.object({ 
    value: z.number().int().min(1).max(5),
    ratingId: z.number().int().min(1),
    userId: z.number().int().min(1),  
  }),
    
};

export default schema;