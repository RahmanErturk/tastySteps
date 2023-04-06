export default function (err, req, res, next) {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({
    error: {
      message: err.message,
      status: res.statusCode,
    },
  });
}
