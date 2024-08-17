import styleObjectToString from "@/utils/css/styleObjectToString.ts";

const horizontalMirror = {
  MozTransform: 'scale(-1, -1)',
  MsTransform: 'scale(-1, -1)',
  WebkitTransform: 'scale(-1, -1)',
  Transform: 'scale(-1, -1)',
};

export default styleObjectToString(horizontalMirror);

export {horizontalMirror};
