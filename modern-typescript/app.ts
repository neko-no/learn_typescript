const userName = 'Max'
let age = 29;

age = 35;

const add1 = (n1:number, n2: number) => n1 + n2;
const printOutput:(n1: number | string) => void = n1 => {console.log(n1)};

printOutput("こんにちは");

const button = document.querySelector('button');

button?.addEventListener('click', e => {console.log(e) })

const hobbies = ['Sport', 'Cooking'];
const activeHobbies = ['Hiking', ...hobbies];

const person = {
     name: "Max",
     age: 29
}

const copiedPerson ={...person};
console.log(copiedPerson);

const add = (...numbers: number[]) => {
     return numbers.reduce((acc, val) => {
          return acc + val;
     }, 0 )
}

console.log(add(5,6,10, 3.7))
