function pagination(query) {
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

export default pagination;
