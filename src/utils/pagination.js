function paginationBuild(query) {
  const defaultLimit = parseInt(process.env.DEFAULT_PAGE_LIMIT || 10); // Use environment variable or default
  // Destructure directly with type checks and defaults
  const {
    limit = parseInt(query.limit) || defaultLimit, // Use environment variable or default
    page = parseInt(query.page || 1),
    sort = query.sort || '_id:1', // Default sort if not informed
  } = query;
  // Split sort field and type (handle potential errors)
  const [sortField, typeSort] = sort.split(':') || ['_id', 1]; // Default sort if invalid
  // Create a new object for immutability
  const paginationConfig = {
    limit: limit > 0 ? limit : process.env.DEFAULT_PAGE_LIMIT || 10, // Enforce positive limit
    page: page > 0 ? page : 1, // Enforce positive page
    sortField,
    typeSort: parseInt(typeSort, 10) || 1, // Ensure typeSort is a number (base 10)
  };

  return paginationConfig;
}
/**
 * @function pagination
 * @description Function that handle pagination in the API.
 * @param {object} req - The request object.
 */
async function paginationObject(req, next) {
  try {
    // Extract pagination details from the request query
    const { limit, page, sortField, typeSort } = paginationBuild(req.query);
    // Access the result promise from the controller and prepare a new promise object with pagination options
    let query = req.result
      .sort({ [sortField]: typeSort })
      .skip((page - 1) * limit)
      .limit(limit);
    // Execute promise with all options
    const paginationResult = await query.exec();
    // Send the response with the pagination result
    return paginationResult;
  } catch (error) {
    next(error);
  }
}

export default paginationObject;
