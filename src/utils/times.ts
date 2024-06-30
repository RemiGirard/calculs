export default (n: number, callback: () => object) => {
  for (let i = 0; i < n; i++) callback();
};
