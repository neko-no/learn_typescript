"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function Logger(logString) {
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
}
function WithTemplate(template, hookId) {
    return function (_) {
        const hookEl = document.getElementById(hookId);
        hookEl && (hookEl.innerHTML = template);
    };
}
let Person = class Person {
    constructor() {
        this.name = 'Max';
        console.log('Personオブジェクトを作成中...');
    }
};
Person = __decorate([
    Logger('デコレータ呼び出し中...'),
    WithTemplate('こんにちは', 'app')
], Person);
const pers = new Person();
console.log(pers);
function Log(target, prototypeName) {
    console.log('Prototype デコレータ');
    console.log(target, prototypeName);
}
function Log2(target, name, descriptor) {
    console.log('Accessorデコレータ');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log3(target, name, descriptor) {
    console.log('Methodデコレータ');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log4(target, name, position) {
    console.log('Prametor デコレータ');
    console.log(target);
    console.log(name);
    console.log(position);
}
class Product {
    constructor(t, n) {
        this.title = t;
        this._price = n;
    }
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error('不正な価格です．0以上の値を設定してください');
        }
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
