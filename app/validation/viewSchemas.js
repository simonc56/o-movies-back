import { z } from "zod";

const schema = {
  viewedSchema: z
    .object({
      tmdb_id: z.number().int().min(1),
    })
    .required(),
  unviewedSchema: z.object({
    tmdb_id: z.string().refine((value) => parseInt(value) > 0, { message: "tmdb_id must be a positive integer" }),
  }),
};

export default schema;
