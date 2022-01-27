const asyncHandler = (funcion) => (req, res, next) => Promise.resolve(funcion(req, res, next)).catch(next);

module.exports = asyncHandler;