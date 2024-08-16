import styleObjectToString from '@/utils/css/styleObjectToString';
import {CSSProperties} from "react";

const styleObject: CSSProperties = {
  WebkitTouchCallout: 'none', // -webkit-touch-callout: none;
  WebkitUserSelect: 'none', // -webkit-user-select: none;
  KhtmlUserSelect: 'none', // -khtml-user-select: none;
  MozUserSelect: 'none', // -moz-user-select: none;
  msUserSelect: 'none', // -ms-user-select: none;
  userSelect: 'none', // user-select: none;
}

export default styleObjectToString(styleObject);