class BaseError extends Error {
  constructor(message = 'Server Internal Error', status = 500) {
    super(message);
    this.message = message;
    this.status = status;
  }
  sendResponse(res) {
    res.status(this.status).send({ message: this.message, status: this.status });
  }
}

export default BaseError;
