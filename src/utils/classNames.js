/**
 * classNames builder util
 * @param args {string|Object} - concatenate strings and merge class objects
 * @returns {string}
 */
export default (...args) => {
  let res = [];
  for (let i = 0; i < args.length; i++) {
    if (typeof args[i] === 'string') res.push(args[i]);
    if (typeof args[i] === 'object') {
      Object.keys(args[i]).forEach((key) => {
        if (args[i][key]) res.push(key);
      });
    }
  }
  return res.join(' ');
};
