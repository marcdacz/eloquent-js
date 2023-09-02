const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question(`Enter grid size:  `, (size) => {
  console.log(`Generating chess board with the grid size of ${size}...`);

  for (let row = 0; row < size; row++) {
    let rowItem = "";
    for (let column = 0; column < size; column++) {
    //   if (column % 2 === 0) {
    //     if (row % 2 === 0) {
    //         rowItem = rowItem + "#";
    //     } else {
    //         rowItem = rowItem + " ";
    //     }
    //   } else {
    //     if (row % 2 === 0) {
    //         rowItem = rowItem + " ";
    //     } else {
    //         rowItem = rowItem + "#";
    //     }
    //   }
        rowItem += (row + column) % 2 === 0 ? "#" : " ";
    }
    console.log(rowItem);
  }
  readline.close();
});
