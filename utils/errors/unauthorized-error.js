class UnauthorizedError extends ErrorHandler {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

//module.exports = UnauthorizedError;
