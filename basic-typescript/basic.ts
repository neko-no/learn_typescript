function add(n1: number, n2: number, showReuslt: boolean, resultPhrase: string) {
 if (showReuslt){
    console.log(`${resultPhrase}${n1 + n2}`);
 }else {
     return n1 + n2;
 }
}

const number1 = 5;
const number2 = 2.8;
const printResult = true;
const resultPhrase = 'Resule: ';

const result = add(number1, number2, printResult, resultPhrase);
