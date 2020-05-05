/**
 * sort by util to sort data
 * can sort by any given data key
 * boolean for sorting descending vs ascending, default is descending
 * @param array {array} - array of data
 * @param sortBy {string} - specify sort by which key
 * @param isDesc {boolean} - sort by descending or ascending
 * @returns {array} - sorted result
 */
export default (array, sortBy, isDesc = true) => {
  return array.sort((a, b) => {
    let first = a;
    let second = b;
    if (isDesc) {
      first = b;
      second = a;
    }
    if (first[sortBy] > second[sortBy]) {
      return 1;
    } else if (first[sortBy] < second[sortBy]) {
      return -1;
    }
    return 0;
  });
};
