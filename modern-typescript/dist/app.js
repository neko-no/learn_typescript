"use strict";
const userName = 'Max';
let age = 29;
age = 35;
const add = (n1, n2) => {
    return n1 + n2;
};
const add1 = (n1, n2) => n1 + n2;
const printOutput = n1 => { console.log(n1); };
printOutput("こんにちは");
const button = document.querySelector('button');
button === null || button === void 0 ? void 0 : button.addEventListener('click', e => { console.log(e); });
