import ApiError from "../errors/ApiError.js";
// Desc: Middleware to validate request body using schema from zod package and a request property(ex: body, query, params)
export function validationMiddleware(schema, requestProperty){
  return (req , res , next )=> {
    try {
      schema.parse(req[requestProperty]);
      next();
    } catch (error){      
      next(new ApiError(400, error.errors));  
    }
  };
}
export default validationMiddleware;