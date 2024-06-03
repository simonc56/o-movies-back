import { z } from "zod";

const schema = {
  createRatingSchema : z.object({
    value: z.number().min(0.5).max(5),
    tmdb_id : z.number().int().min(1),
  }),
  updateRatingSchema : z.object({ 
    value: z.number().min(0.5).max(5),
  }),
    
};

export default schema;