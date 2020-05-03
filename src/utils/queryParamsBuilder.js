export default objParams => {
  const esc = encodeURIComponent;
  return Object.keys(objParams)
    .map(key => esc(key) + '=' + esc(objParams[key]))
    .join('&');
}
