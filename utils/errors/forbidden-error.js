class ForbiddenError extends ErrorHandler {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

//module.exports = ForbiddenError;
