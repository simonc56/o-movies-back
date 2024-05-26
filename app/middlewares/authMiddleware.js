import jwt from "jsonwebtoken"; // import the jwt library

function verifyToken (req, res, next) {
  const token = req.headers["authorization"]?.slice(7); // get the token from the header    
  if (!token) {
    return res.status(403).send({status :"fail", error: "No token provided!" }); // if there isn't any token
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET); // verify token
    req.userId = decoded.id; // add the user id to the request
    next();
  } catch (error){
    console.error(error);
    return res.status(401).send({status :"fail", error: "Unauthorized!" });
  }
}

export default verifyToken;