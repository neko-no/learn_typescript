"use strict";
const names = ['Max', 'Yuto'];
const promise = new Promise((res, rej) => {
    setTimeout(() => {
        res('終わりました!!');
    }, 2000);
});
function merge(obj1, obj2) {
    return Object.assign(obj1, obj2);
}
console.log(merge({ name: 'Max' }, { age: 30 }));
function countAndDescribe(element) {
    let description = '値が格納されていません';
    if (element.length > 0) {
        description = `値は${element.length}個です．`;
    }
    return [element, description];
}
console.log(countAndDescribe('お疲れ様です．これからも頑張ってください'));
function extractAndConvert(obj, key) {
    return `Value: ${obj[key]}`;
}
extractAndConvert({ name: 'Max' }, "name");
