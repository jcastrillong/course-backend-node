function logErrors(error, req, res, next) {
  if (error.name === "ValidationError") {
    return res.status(400).json({
      error: error.message,
    });
  }
  next(error);
}

function errorHandler(error, req, res, next) {
  res.status(500).json({
    error: error.message,
    stack: error.stack,
  });
}

function boomErrorHandler(error, req, res, next) {
  if (error.isBoom) {
    const { output } = error;
    return res.status(output.statusCode).json(output.payload);
  }
  next(error);
}

module.exports = { logErrors, errorHandler, boomErrorHandler };
