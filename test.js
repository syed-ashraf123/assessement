const text = "544,34 rating & 123,2 revies".split("&");
const regex = /\d+/g;

const text1 = text[0];
const numbersArray = text1.match(regex);
// Concatenating all the numbers found into a single string
const concatenatedNumbers = numbersArray ? numbersArray.join("") : "";
console.log(concatenatedNumbers);
