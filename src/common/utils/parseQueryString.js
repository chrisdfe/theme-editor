const parseQueryString = (queryString) => {
  // remove ? at beginning
  const cleanedString = queryString.slice(1);
  // convert to an object
  return cleanedString.split("&").reduce((acc, chunk) => {
    const [key, value] = chunk.split("=");
    return { ...acc, [key]: value };
  }, {});
};

export default parseQueryString;
