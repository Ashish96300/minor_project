const errorMiddleware = (err, req, res, next) => {
  // Log detailed error stack trace in development mode
  if (process.env.NODE_ENV === 'development') {
      console.error(err.stack);  // Log detailed error stack
  }

  // Check if it's a custom ApiError or another known error type
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const errors = err.errors || [];

  // Return response with status and error details
  res.status(statusCode).json({
      success: false,
      message,
      errors
  });
};

export default errorMiddleware;
