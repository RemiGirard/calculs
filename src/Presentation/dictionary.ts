import dictionary from "@/Domain/dictionary.ts";

const language = 'french';

export default dictionary[language] as typeof dictionary['french'];