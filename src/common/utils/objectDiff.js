import { isEqual, isEmpty, diff, isPlainObject } from "lodash";

const objectDiff = (objectA, objectB) => {
  let result = {};

  Object.keys(objectA).forEach((key) => {
    const valueA = objectA[key];
    const valueB = objectB[key];

    if (isPlainObject(valueA) && isPlainObject(valueB)) {
      const nestedResult = objectDiff(valueA, valueB);

      if (!isEmpty(nestedResult)) {
        result[key] = nestedResult;
        return;
      }
    }

    // TODO - this will currently compare objects, which is not what I want
    if (!isEqual(valueA, valueB)) {
      result[key] = [valueA, valueB];
    }
  });

  Object.keys(objectB).forEach((key) => {
    const valueA = objectA[key];
    const valueB = objectB[key];

    if (!isEqual(valueA, valueB)) {
      result[key] = [valueA, valueB];
    }
  });

  return result;
};

export default objectDiff;
