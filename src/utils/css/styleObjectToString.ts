import {CSSProperties} from "react";
import hyphenateStyleName from "@/utils/css/hyphenateStyleName.ts";

export default (styleObject: CSSProperties):  string => {
  return (Object.keys(styleObject) as (keyof typeof styleObject)[]).reduce((acc, key) => {
    return `${acc}${hyphenateStyleName(key)}:${styleObject[key]};`;
  }, '');
};
