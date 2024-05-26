import ApiError from "../errors/ApiError.js";
import { ZodError } from "zod"; // Assurez-vous d'importer ZodError pour une meilleure gestion des erreurs

// Desc: Middleware to validate request properties using schemas from zod package
export function validationMiddleware(schemas){
  return (req , res , next )=> {
    try {
      for (const [property, schema] of Object.entries(schemas)) {
        schema.parse(req[property]);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(new ApiError(400, error.errors));
      } else {
        next(error);
      }
    }
  };
}

export default validationMiddleware;
