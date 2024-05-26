
export default (err, req, res, next) => {
  let { status, message } = err;
  const { code } = err;

  if (code === "23505") {
    status = 400;
    message = "Resource already exists";
  }

  if (!status) {
    status = 500;
  }
  if (status === 500) {   
    console.error(err); 
    message = "Internal Server Error";
  }
  if (res.format === "html") {
    return res.status(status).render("error", {
      httpStatus: status,
      message,
    });
  }
  return res.status(status).json({status :"fail", error: message }); 
};