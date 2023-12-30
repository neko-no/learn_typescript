function add(n1, n2) {
    return n1 + n2;
}
function printResult(num) {
    console.log("Result: ".concat(num));
}
function addAndHundle(n1, n2, cb) {
    var result = n1 + n2;
    cb(result);
}
addAndHundle(10, 20, function (result) {
    console.log(result);
});
printResult(add(5, 12));
var combineValues;
combineValues = add;
console.log(combineValues(8, 8));
