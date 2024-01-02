"use strict";
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet(pharase) {
        console.log(`${this.name} ${pharase}`);
    }
}
let user1;
user1 = new Person('Max', 30);
user1.greet('hello');
let add;
add = (n1, n2) => {
    return n1 + n2;
};
