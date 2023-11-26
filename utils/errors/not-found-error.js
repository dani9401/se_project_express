class NotFoundError extends ErrorHandler {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

//module.exports = NotFoundError;
