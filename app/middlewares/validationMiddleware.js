export function validationMiddleware(schema, requestProperty){
  return (req , res , next )=> {
    try {
      schema.parse(req[requestProperty]);
      next();
    } catch (error){      
      console.error(error);      
      return res.status(400).json({status:"fail", error: error.errors});         
    }
  };
}
export default validationMiddleware;