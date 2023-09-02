const range = (start, end, step = 1) => {
  const rangeArray = [];
  const condition =
    step > 0
      ? (rangeValue) => rangeValue <= end
      : (rangeValue) => rangeValue >= end;

  for (let rangeValue = start; condition(rangeValue); rangeValue += step) {
    rangeArray.push(rangeValue);
  }

  return rangeArray;
};

const sum = (rangeArray) => {
  let sumValue = 0;
  rangeArray.forEach((arrayValue) => {
    sumValue += arrayValue;
  });
  return sumValue;
};

console.log(range(1, 10));
console.log(range(5, 2, -1));
console.log(sum(range(1, 10)));

const reverseArray = (arrayValue) => {
  console.time("reverseArray");
  let newArray = [];
  for (let index = arrayValue.length - 1; index >= 0; index--) {
    newArray.push(arrayValue[index]);
  }
  console.timeEnd("reverseArray");
  return newArray;
};

const reverseArrayInPlace = (arrayValue) => {
  console.time("reverseArrayInPlace");
  for (let index = 0; index < arrayValue.length; index++) {
    const currentValue = arrayValue[index];
    const reverseValue = arrayValue[arrayValue.length - 1 - index];
    if (index < arrayValue.length - 1 - index) {
      arrayValue[index] = reverseValue;
      arrayValue[arrayValue.length - 1 - index] = currentValue;
    }
  }
  console.timeEnd("reverseArrayInPlace");
  return arrayValue;
};

console.log(reverseArray(["A", "B", "C"]));
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);

const arrayToList = (arrayValue) => {
  let list = null;
  for (let index = arrayValue.length - 1; index >= 0; index--) {
    list = {
      value: arrayValue[index],
      rest: list,
    };
  }
  return list;
};

const listToArray = (list) => {
  let array = [];
  for (let node = list; node; node = node.rest) {
    array.push(node.value);
  }
  return array;
};

const prepend = (value, list) => {
  return {
    value: value,
    rest: list,
  };
};

const nth = (list, nth) => {
  return listToArray(list)[nth];
};

console.log(arrayToList([10, 20, 30]));
console.log(listToArray(arrayToList([10, 20, 30])));
console.log(prepend(10, prepend(20, null)));
console.log(nth(arrayToList([10, 20, 30]), 1));

const deepEqual = (objectA, objectB) => {
  let objectAKeys = Object.keys(objectA);
  let objectBKeys = Object.keys(objectB);
  if (objectAKeys.length !== objectBKeys.length) {
    return false;
  }

  for (const key in objectA) {
    const elementA = objectA[key];
    const elementB = objectB[key];

    if (
      typeof elementA === "object" &&
      elementA != null &&
      typeof elementB === "object" &&
      elementB != null
    ) {
      deepEqual(elementA, elementB);
    } else {
      if (elementA !== elementB) {
        return false;
      }
    }
  }

  return true;
};

let obj = { here: { is: "an" }, object: 2 };
console.log(deepEqual(obj, obj));
console.log(deepEqual(obj, { here: 1, object: 2 }));
console.log(deepEqual(obj, { here: { is: "an" }, object: 2 }));
