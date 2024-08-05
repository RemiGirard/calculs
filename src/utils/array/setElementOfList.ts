import {setter} from "@/utils/type/setter.ts";

export default <T>(newElement: T, list: T[], setList: setter<T[]>, index: number) => {
  if(index < 0 || index >= list.length) {
    console.error('Index out of bound');
    return;
  }
  const newList = [...list];
  newList[index] = newElement;
  setList(newList);
};