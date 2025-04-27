const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);  // Log error in terminal
  
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
      errors: err.errors || []
    });
  };
  
  export default errorMiddleware;
  