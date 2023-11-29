class ErrorHandler {
  constructor(message) {
    (this.message = message), (this.statusCode = 500);
  }
}
//app.use((err, req, res, next) => {
//  console.error(err);
//  // ***if an error has no status, set it to 500***
//  const { statusCode = 500, message } = err;
//  res
//    .status(statusCode)
//    .send({
//      // **check the status and display a message based on it**
//      message: statusCode === 500
//        ? 'An error occurred on the server'
//        : message
//    });
//});

module.exports = ErrorHandler;
