export default <T>(
  object: {[key: string]: T},
  filter: (key: string, value: T) => boolean,
) => Object.fromEntries(
  Object
    .entries(object)
    .filter(([key, val]) => filter(key, val)),
);