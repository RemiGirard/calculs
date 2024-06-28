export default (n: number, callback: () => {}) => {
  for (let i = 0; i < n; i++) callback();
};
