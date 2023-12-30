function add (n1: number, n2: number): number{
    return n1 + n2;
}

function printResult(num: number){
    console.log(`Result: ${num}`);
}

function addAndHundle(n1: number, n2: number, cb: (n: number) => void) {
    const result = n1 + n2;
    cb(result);
}

addAndHundle(10, 20, (result) => {
    console.log(result);
});

printResult(add(5,12));

let combineValues: (a: number, b: number) => number;

combineValues = add;

console.log(combineValues(8, 8))
