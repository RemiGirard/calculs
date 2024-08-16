import {CSSProperties} from "react";

const uppercasePattern = /([A-Z])/g;
const msPattern$1 = /^ms-/;

export default (attribute: keyof CSSProperties): string | null => {
  return attribute.replace(uppercasePattern, '-$1').toLowerCase().replace(msPattern$1, '-ms-');
}