import styleObjectToString from "@/utils/css/styleObjectToString.ts";

export const horizontalMirror = {
  MozTransform: 'scale(-1, -1)',
  MsTransform: 'scale(-1, -1)',
  WebkitTransform: 'scale(-1, -1)',
  Transform: 'scale(-1, -1)',
};

export default styleObjectToString(horizontalMirror);
