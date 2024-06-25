export const combinePossibilities = <T>(elementsPossibilities: T[][]): T[][] => {
    if(elementsPossibilities.length === 0){
        return [];
    }
    let [elementPossibilities, ...otherElements] = elementsPossibilities;
    let possibilities: T[][] = [];
    if(otherElements.length === 0){
        return elementPossibilities.map((e)=>[e]);
    } else {
        elementPossibilities.forEach((currElement: T) => {
            const combinedPossibilities = combinePossibilities(otherElements)
            for(let i=0;i<combinedPossibilities.length;i++){
                possibilities.push([currElement, ...combinedPossibilities[i]]);
            }
        })
    }
    return possibilities;
}