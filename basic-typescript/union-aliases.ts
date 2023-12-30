type Combinable_1 = number | string;
type ConversionDescriptor_1 = 'as-text' | 'as-number';

function combine(
    input1: Combinable_1,
    input2: Combinable_1,
    resultConversion: ConversionDescriptor_1
    ) {
    let result;
    if ((typeof input1 === 'number' && typeof input2 === 'number') ||
        resultConversion === 'as-number'){
        result = +input1 + +input2;
    } else {
        result = input1.toString() + input2.toString();
    }

    if (resultConversion === 'as-number'){
        return +result;
    }
    return result.toString();
}

const combineAges_1 = combine(30, 26, 'as-number');
console.log(combineAges_1);

const combineStringAges_1 = combine('30', '26', 'as-number');
console.log(combineStringAges_1);

const combineNames_1 = combine('Mike', 'Anna', 'as-text');
console.log(combineNames_1);
