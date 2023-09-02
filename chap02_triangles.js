const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question(`What's the base length of the triangle? `, (length) => {
  console.log(`Generating triangle with base length of ${length}...`);
  let blankLength = length
  for (let counter = 0; counter < length; counter++) {
    console.log(" ".repeat(blankLength) +  "#".repeat(counter * 2));
    blankLength--;
  }
  readline.close();
});
