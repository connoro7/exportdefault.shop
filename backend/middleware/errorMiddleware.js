/**
 * Middleware for error handling of malformed HTTP requests
 * Overwrites default Express error handler
 * @author @connoro7
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

/**
 * Middleware for server error handling
 * Overwrites default Express error handler
 * @author @connoro7
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

export { notFound, errorHandler }
