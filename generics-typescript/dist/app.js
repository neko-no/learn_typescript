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
