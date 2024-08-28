export default (timeMs: number) => {
  return (new Promise((resolve) => {
    setTimeout(resolve, timeMs);
  }));
};
