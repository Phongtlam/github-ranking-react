/**
 * query param builder to parse objects into queryString
 * can remove extra characters using encodeURIComponent
 * @param objParams {object}
 * @returns {string}
 */
export default (objParams) => {
  const esc = encodeURIComponent;
  return Object.keys(objParams)
    .map((key) => esc(key) + '=' + esc(objParams[key]))
    .join('&');
};
