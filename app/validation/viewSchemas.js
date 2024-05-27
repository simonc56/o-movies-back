import { z } from "zod";

const schema = {
  viewedSchema : z.object({
    tmdb_id: z.number().int().min(1),
  }).required(),
};

export default schema;
