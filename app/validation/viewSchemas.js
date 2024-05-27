import { z } from "zod";

const schema = {
  markAsViewedSchema : z.object({
    tmdb_id: z.number().int(),
  }).required(),
};

export default schema;
