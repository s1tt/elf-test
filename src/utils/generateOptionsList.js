import { capitalizeString } from './capitalizeString';
import { sortStringArray } from './sortStringArray';

export const generateOptionsList = (array) => {
  return sortStringArray(array).map((item, index) => ({
    id: index,
    value: item,
    label: capitalizeString(item)
  }));
};
