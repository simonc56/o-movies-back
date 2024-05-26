import { z } from "zod";

const schema = {
  paramsId : z.object({
    id: z.string().refine(value => parseInt(value) > 0, { message: "id must be a positive integer" }),
  }),
};
  

export default schema;  

