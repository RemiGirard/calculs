export default <T> (parent:T[][], child:T[]) => parent.some((parentElement) => parentElement.every((parentSubElement, index) => parentSubElement === child[index]));
