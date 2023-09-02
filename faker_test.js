const { faker } = require('@faker-js/faker');

let count = 2
let randomSentence = ""
while (count > 0) {
    // randomSentence = randomSentence + " " + faker.hacker.phrase();
    randomSentence = randomSentence + " " + faker.word.words({ count: { min: 5, max: 10 } }) + ".";
    count--;
}
console.log(randomSentence.trim());

let randomIssue = `
Issue Summary
${faker.hacker.phrase()}

Steps to Reproduce:
1. ${faker.word.words({ count: { min: 5, max: 10 } })}
2. ${faker.word.words({ count: { min: 5, max: 10 } })}
3. ${faker.word.words({ count: { min: 5, max: 10 } })}
4. ${faker.word.words({ count: { min: 5, max: 10 } })}

Expected Results:
${faker.hacker.phrase()}

Actual Results:
${faker.hacker.phrase()}

Workaround:
${faker.hacker.phrase()}
`;  

console.log(randomIssue);