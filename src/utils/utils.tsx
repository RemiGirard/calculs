export const times = (n: number, callback: () => {}) => {
  for (var i = 0; i < n; i++) callback();
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