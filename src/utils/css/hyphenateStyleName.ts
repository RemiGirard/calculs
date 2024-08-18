import {CSSProperties} from 'react';

export default (attribute: keyof CSSProperties): string | null => {
  return attribute
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^ms-/, '-ms-')
  ;
};
