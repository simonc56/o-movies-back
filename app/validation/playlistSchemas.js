import { z } from "zod";

const schema = {
  playlistSchema: z.object({
    name: z.string().min(1).max(30),
  }),
  movieSchema: z.object({
    tmdb_id : z.number().int().min(1),
  }),
};

export default schema;