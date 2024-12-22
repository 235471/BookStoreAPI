function buildQuery(params, model) {
  const queryConfig = model.queryConfig;
  const query = {};
  const orQueries = []; // Store query's with multiple filters for the same field e.g book title [Hobbit, 1984]
  const andQueries = []; // Store all query's
  for (const [key, value] of Object.entries(params)) {
    // Handle range fields
    if ((key.includes('min') || key.includes('max')) && !isNaN(Number(value))) {
      handleRangeFields(query, key, value);
    } else {
      if (!value || !queryConfig[key]) continue; // ignore fields that are not mapped
      // Handle fields with multiple values separated by commas
      if (value.includes(',')) {
        const orQuery = {
          $or: value.split(',').map((valueBuild) => constructFieldQuery(queryConfig[key], key, valueBuild)),
        };
        orQueries.push(orQuery);
      } else {
        //Add simple fields to the query
        AssignQuery(queryConfig, key, value, query);
      }
    }
  }
  // If there are query with $or, apply it inside $and
  if (orQueries.length > 0) {
    andQueries.push(...orQueries);
  }

  // If there is any query's add the logical AND to it
  if (Object.keys(query).length > 0 && Object.keys(params).length > 1) {
    andQueries.push(query);
  }

  // Se houver múltiplas consultas, envolva tudo em um $and
  if (andQueries.length > 0) {
    return { $and: andQueries };
  }
  return query;
}
function constructFieldQuery(fieldType, key = '', value) {
  if (fieldType === 'regex') {
    if (!key) {
      return { $regex: value, $options: 'i' };
    } else {
      return { [key]: { $regex: value, $options: 'i' } };
    }
  } else if (fieldType === 'exact') {
    return value;
  }
  return null;
}

function AssignQuery(queryConfig, key, value, query) {
  // Add simple fields to the query
  const fieldQuery = constructFieldQuery(queryConfig[key], '', value);
  query[key] = fieldQuery;
}

function handleRangeFields(query, key, value) {
  let field = key.replace('min', '').replace('max', ''); // Remove "min" or "max" from the field name
  field = field.toLowerCase(); // Ensure the field name is lowercase to match the database schema

  // Apply the filter for the field
  if (key.startsWith('min')) {
    // If it's a "min", apply $gte (greater than or equal to)
    query[field] = { ...query[field], $gte: Number(value) };
  }
  if (key.startsWith('max')) {
    // If it's a "max", apply $lte (less than or equal to)
    query[field] = { ...query[field], $lte: Number(value) };
  }
}
export default buildQuery;
