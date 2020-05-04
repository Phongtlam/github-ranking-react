export default (array, sortBy, isDesc = true) => {
  return array.sort(
    (a, b) => {
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
    }
  );
};
