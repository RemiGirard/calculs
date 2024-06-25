export default <T extends string | number>(anyObject: {[key in T]: unknown}): (T)[] => {
    return Object.keys(anyObject) as T[];
}