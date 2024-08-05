export default <T> (parent:T[][], child:T[]): boolean => {
  return parent.some((parentElement) => parentElement.every((parentSubElement, index) => parentSubElement === child[index]))
};
