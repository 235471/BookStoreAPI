function separateQueryParams(query) {
  const bookQuery = {};
  const authorQuery = {};
  const publisherQuery = {};

  for (const [key, value] of Object.entries(query)) {
    if (key.startsWith('autor.')) {
      const subKey = key.split('.').pop(); // get proper key for author collection
      authorQuery[subKey] = value;
    } else if (key.startsWith('editora.')) {
      const subKey = key.split('.').pop(); //get proper key for publisher collection
      publisherQuery[subKey] = value;
    } else {
      bookQuery[key] = value;
    }
  }
  return { bookQuery, authorQuery, publisherQuery };
}

export default separateQueryParams;
