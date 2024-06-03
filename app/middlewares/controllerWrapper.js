// Code to wrap the controller functions to catch any errors and pass them to the error handling middleware:
export default (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (error) {
    next(error);
  }
};