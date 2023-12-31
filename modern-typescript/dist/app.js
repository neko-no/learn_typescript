"use strict";
const userName = 'Max';
let age = 29;
age = 35;
const add1 = (n1, n2) => n1 + n2;
const printOutput = n1 => { console.log(n1); };
printOutput("こんにちは");
const button = document.querySelector('button');
button === null || button === void 0 ? void 0 : button.addEventListener('click', e => { console.log(e); });
const hobbies = ['Sport', 'Cooking'];
const activeHobbies = ['Hiking', ...hobbies];
const person = {
    name: "Max",
    age: 29
};
const copiedPerson = Object.assign({}, person);
console.log(copiedPerson);
const add = (...numbers) => {
    return numbers.reduce((acc, val) => {
        return acc + val;
    }, 0);
};
console.log(add(5, 6, 10, 3.7));
const [hobby1, hobby2] = hobbies;
