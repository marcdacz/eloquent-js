for (let number = 1; number <= 100; number++) {
  let text = "";

  if (number % 3 === 0 && number % 5 != 0) {
    text = "Fizz"
  }

  if (number % 3 != 0 && number % 5 === 0) {
    text = "Buzz"
  }
  
  if (number % 3 === 0 && number % 5 === 0) {
    text = "FizzBuzz"
  }

  console.log(`${number} ${text}`);
}
