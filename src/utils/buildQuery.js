function buildQuery(params, model) {
  const queryConfig = model.queryConfig;
  const query = {};

  for (const [key, value] of Object.entries(params)) {
    // to deal with range keys
    const operatorMatch = key.match(/(.*)__(gte|lte|lt|gt)/);
    if (operatorMatch) {
      const field = operatorMatch[1]; // key
      const operator = operatorMatch[2]; // e.g lte, gte etc

      // Verify if the range fields is part of the schema
      if (!queryConfig[field]) continue;
      AssignQuery(queryConfig, field, value, query, operator);
    }
    if (!value || !queryConfig[key]) continue; // ignore fields that are not mapped

    AssignQuery(queryConfig, key, value, query);
  }
  return query;
}
function constructFieldQuery(fieldType, key, value, operator) {
  if (fieldType === 'regex') {
    return { $regex: value, $options: 'i' };
  } else if (fieldType === 'exact') {
    return value;
  } else if (fieldType === 'range') {
    const mongooseOperator = `$${operator}`; // Adds the mongoose operator to the query

    // returns the value for the key as a mongoose operator
    return { [mongooseOperator]: value }; // e.g { $gte: 20 }
  }
  return null;
}

function AssignQuery(queryConfig, key, value, query, operator) {
  if (queryConfig[key]) {
    const fieldType = queryConfig[key];
    if (fieldType === 'range') {
      if (query[key]) {
        query[key] = { ...query[key], ...constructFieldQuery(fieldType, key, value, operator) };
      } else {
        query[key] = constructFieldQuery(fieldType, key, value, operator);
      }
    } else {
      const fieldQuery = constructFieldQuery(queryConfig[key], key, value, operator);
      if (fieldQuery) {
        query[key] = fieldQuery; // Simply apply the fieldQuery to the corresponding key
      }
    }
  }
}
export default buildQuery;
