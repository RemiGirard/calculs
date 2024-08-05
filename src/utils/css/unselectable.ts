import styleObjectToString from '@/utils/css/styleObjectToString';
import {CSSProperties} from "react";

// export default [
//   '-webkit-touch-callout: none;',
//   '-webkit-user-select: none;',
//   '-khtml-user-select: none;',
//   '-moz-user-select: none;',
//   '-ms-user-select: none;',
//   'user-select: none;',
// ].join('\n');

const styleObject: CSSProperties = {
  WebkitTouchCallout: 'none',
  WebkitUserSelect: 'none',
  KhtmlUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
  userSelect: 'none',
}

export default styleObjectToString(styleObject);