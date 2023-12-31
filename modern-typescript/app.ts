const userName = 'Max'
let age = 29;

age = 35;

const add = (n1:number, n2: number) => {
     return n1 + n2;
}

const add1 = (n1:number, n2: number) => n1 + n2;
const printOutput:(n1: number | string) => void = n1 => {console.log(n1)};

printOutput("こんにちは");

const button = document.querySelector('button');

button?.addEventListener('click', e => {console.log(e) })
