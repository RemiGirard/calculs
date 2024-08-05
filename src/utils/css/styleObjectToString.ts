import {CSSProperties} from "react";

export default (styleObject: CSSProperties) => (Object.keys(styleObject) as (keyof typeof styleObject)[]).reduce((acc, key ) => {
  return `${acc}${key}:${styleObject[key]};`;
}, '');
