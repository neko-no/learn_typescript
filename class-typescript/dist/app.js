"use strict";
let user1;
user1 = {
    name: 'Max',
    age: 30,
    greet(pharase) {
        console.log(`${pharase} ${this.name}`);
    }
};
user1.greet('hello');
