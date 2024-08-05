const areArraysEqual = (arr1: unknown[], arr2: unknown[]) => {
  // Check if the arrays have the same length
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Check if each element in the arrays is deeply equal
  for (let i = 0; i < arr1.length; i++) {
    const item1 = arr1[i];
    const item2 = arr2[i];

    if (Array.isArray(item1) && Array.isArray(item2)) {
      // Recursively compare nested arrays
      if (!areArraysEqual(item1, item2)) {
        return false;
      }
    } else if (typeof item1 === 'object') {
      // compare objects
      return JSON.stringify(item1) === JSON.stringify(item2);
    } else if (item1 !== item2) {
      // Compare non-array elements
      return false;
    }
  }

  return true;
};

export default areArraysEqual;