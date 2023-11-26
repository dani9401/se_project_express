class BadRequestError extends ErrorHandler {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

//module.exports = BadRequestError;
