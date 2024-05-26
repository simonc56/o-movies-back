export function validationMiddleware(schema, requestProperty){
  return (req , res , next )=> {
    try {
      console.log(req[requestProperty]);
      schema.parse(req[requestProperty]);
      next();
    } catch (error){
      if (process.env.NODE_ENV === "production"){
        console.log(error);
      }
      return res.status(400).json({status:"fail", error: error.errors});         
    }
  };
}
export default validationMiddleware;