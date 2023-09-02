const min = (numA, numB) => {
  return numA < numB ? numA : numB;
  // return Math.min(numA, numB)
};

console.log(min(0, 10));
console.log(min(0, -10));

const isEven = (num) => {
  num = Math.abs(num);
  if (num === 0) {
    return true;
  } else if (num === 1) {
    return false;
  } else {
    return isEven(num - 2);
  }
};

console.log(isEven(50));
console.log(isEven(75));
console.log(isEven(-1));
console.log(isEven(-10));

const countChar = (text, char) => {
    let count = 0
    for (let index = 0; index < text.length; index++) {
        const character = text[index];
        if (character === char) {
            count++;
        }
    }
    return count
}

const countBs = (text) => {
    return countChar(text, "B")
}

console.log(countBs("BBC"))
console.log(countChar("kkakerlak", "k"))