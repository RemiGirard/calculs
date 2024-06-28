import dictionaries from "@/Domain/dictionaries.ts";

const language = 'french';

const dictionary: typeof dictionaries.french = dictionaries[language];
export default dictionary;