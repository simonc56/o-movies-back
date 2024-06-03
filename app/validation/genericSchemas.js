import { z } from "zod";

const schema = {
  paramsId : z.object({
    id: z.string().refine(value => parseInt(value) > 0, { message: "id must be a positive integer" }),
    tmdb_id: z.string().refine(value => parseInt(value) > 0, { message: "tmdb_id must be a positive integer" }).optional(),
  }),
};
  
export default schema;  

