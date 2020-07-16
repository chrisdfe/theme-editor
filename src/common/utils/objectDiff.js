import { isEqual, isEmpty, isPlainObject } from "lodash";

const objectDiff = (objectA, objectB) => {
  let result = {};

  const compare = (key, valueA, valueB) => {};

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

    if (!isEqual(valueA, valueB)) {
      result[key] = [valueA, valueB];
    }

    compare(key, valueA, valueB);
  });

  Object.keys(objectB).forEach((key) => {
    const valueA = objectA[key];
    const valueB = objectB[key];

    if (!valueA) {
      result[key] = [undefined, valueB];
    }
  });

  return result;
};

export default objectDiff;
