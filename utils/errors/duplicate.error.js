class DuplicateError extends ErrorHandler {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

//module.exports = DuplicateError;
