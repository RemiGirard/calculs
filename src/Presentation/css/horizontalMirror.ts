import styleObjectToString from "@/utils/css/styleObjectToString.ts";

const horizontalMirror = {
  mozTransform: 'scale(-1, -1)',
  oTransform: 'scale(-1, -1)',
  webkitTransform: 'scale(-1, -1)',
  transform: 'scale(-1, -1)',
};

export default styleObjectToString(horizontalMirror);

export {horizontalMirror};
