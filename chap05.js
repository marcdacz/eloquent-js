let arrays = [[1, 2, 3], [4, 5], [6]];
let flattened = arrays.reduce((a, b) => a.concat(b), []);
console.log('🚀  flattened:', flattened);

const loop = (start, test, update, body) => {
  for (let index = start; test(index); index = update(index)) {
    body(index);
  }
};
loop(
  3,
  n => n > 0,
  n => n - 1,
  console.log
);

const every = (array, test) => {
  let isItInEvery = true;
  array.forEach(n => {
    if (test(n) != true) {
      isItInEvery = false;
    }
  });
  return isItInEvery;
};

console.log(every([1, 3, 5], n => n < 10));
console.log(every([2, 4, 16], n => n < 10));
console.log(every([], n => n < 10));

function dominantDirection(text) {
  let scripts = countBy(text, char => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.direction : 'none';
  }).filter(({ name }) => name != 'none');

  console.log(scripts);

  const ltr = scripts.filter(({ name }) => name === 'ltr').reduce((n, { count }) => n + count, 0);
  const rtl = scripts.filter(({ name }) => name === 'rtl').reduce((n, { count }) => n + count, 0);

  if (ltr > rtl) return 'ltr';
  else if (rtl > ltr) return 'rtl';
}

console.log(dominantDirection('Hello!'));
console.log(dominantDirection('Hey, مساء الخير'));
