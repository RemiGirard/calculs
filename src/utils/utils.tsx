export const times = (n: number, callback: () => {}) => {
  for (let i = 0; i < n; i++) callback();
}

export const filterObject = (
  object: object,
  filter: (key: string, val: any) => boolean
) => {
  return Object
    .fromEntries(
      Object
      .entries(object)
      .filter(([key, val]) => filter(key, val))
    )
  ;
}

export const getRandomItemOfArray = (array: any[]) => {
  return array[Math.floor(Math.random()*array.length)];
}

export const getBodyRatio = () => {
  return document.body.clientWidth/document.body.clientHeight;
};

export const shuffleArray = (array: any[]) => {
  const newArray = structuredClone(array);
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export const areArraysEqual = (arr1: any[], arr2: any[]) => {
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
    } else if (item1 !== item2) {
      // Compare non-array elements
      return false;
    }
  }

  return true;
}

export const stringToBoolean = (value: string): boolean | null | undefined=> {
  switch(value){
    case 'true':
      return true;
    case 'false':
      return false;
    case 'null':
      return null;
    default:
      return undefined;
  }
}