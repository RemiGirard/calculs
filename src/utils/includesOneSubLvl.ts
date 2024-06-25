export default<T> (parent:T[][], child:T[]) => {
    return parent.some((parentElement) => {
        return parentElement.every((parentSubElement, index) => {
            return parentSubElement === child[index];
        });
    });
}