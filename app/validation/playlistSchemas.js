import { z } from "zod";

const schema = {
  playlistSchema: z.object({
    name: z.string().min(1).max(30),
  }),
};

export default schema;