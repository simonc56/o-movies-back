import { z } from "zod";

const schema = {
  getId: z.number().int().min(1).max(1000000000),
};

export default schema;  

