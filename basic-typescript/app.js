function add(n1, n2, showReuslt, resultPhrase) {
    if (showReuslt) {
        console.log("".concat(resultPhrase).concat(n1 + n2));
    }
    else {
        return n1 + n2;
    }
}
var number1 = 5;
var number2 = 2.8;
var printResult = true;
var resultPhrase = 'Resule: ';
var result = add(number1, number2, printResult, resultPhrase);
