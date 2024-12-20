import mongoose from 'mongoose';
import BaseError from '../erros/BaseError.js';
import InvalidRequisition from '../erros/InvalidRequisition.js';
import ValidationError from '../erros/ValidationError.js';
import NotFound from '../erros/NotFound.js';
/**
 * @middleware errorHandler
 * @description Middleware that handle errors in the API.
 * @param {object} error - The error object.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    new InvalidRequisition().sendResponse(res);
  } else if (error instanceof mongoose.Error.ValidationError) {
    new ValidationError(error).sendResponse(res);
  } else if (error instanceof NotFound) {
    error.sendResponse(res);
  } else if (error instanceof BaseError) {
    error.sendResponse(res);
  } else {
    new BaseError().sendResponse(res);
  }
}

export default errorHandler;
