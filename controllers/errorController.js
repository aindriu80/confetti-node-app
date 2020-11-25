exports.logErrors = (error, req, res, next) => {
  console.log("An Error...");
  console.error(error.stack);
  next(error);
};
