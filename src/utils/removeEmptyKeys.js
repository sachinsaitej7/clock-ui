import { isEmpty } from "lodash";

export default function removeEmptyKeys(obj) {
    const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (isEmpty(obj[key])) {
        return;
    }
    newObj[key] = obj[key];
  });
  return newObj;
}