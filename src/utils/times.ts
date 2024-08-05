export default (n: number, callback: () => void): void => {
  for (let i = 0; i < n; i++) callback();
};
