import { checkEmpty } from '../utils/checkEmpty.js';
import pagination from '../utils/pagination.js';
/**
 * @middleware pagination
 * @description Middleware that handle pagination in the API.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
async function paginationMiddleware(req, res, next) {
  try {
    // Extract pagination details from the request query
    const { limit, page, sortField, typeSort } = pagination(req.query);
    // Prepare query options
    const queryOptions = req.queryOptions || {};
    // Access the result promise from the controller and prepare a new promise object with pagination options
    let query = req.result
      .sort({ [sortField]: typeSort })
      .skip((page - 1) * limit)
      .limit(limit);
    // Check if there are populate fields to be included
    if (queryOptions.populate) {
      query = query.populate(queryOptions.populate);
    }
    // Execute promise with all options
    const paginationResult = await query.exec();
    // Check if the result is empty and throw 404 not found
    checkEmpty(paginationResult);
    // Send the response with the pagination result
    return res.status(200).json(paginationResult);
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
}

export default paginationMiddleware;
