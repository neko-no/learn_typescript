"use strict";
class Department {
    constructor(n) {
        this.name = n;
    }
    describe() {
        console.log(this.name);
    }
}
const accounting = new Department('Accounting');
accounting.describe();
console.log(accounting);
