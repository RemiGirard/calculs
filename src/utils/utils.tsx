export const times = (n: number, callback: () => {}) => {
  for (var i = 0; i < n; i++) callback();
}