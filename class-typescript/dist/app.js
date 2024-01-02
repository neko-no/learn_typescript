"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    }
    describe() {
        console.log(this.name);
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
class ITDepartment extends Department {
    constructor(id, admins, report) {
        super(id, 'IT');
        this.admins = admins;
        this.report = report;
    }
    addReport(text) {
        this.report.push(text);
    }
    printReport() {
        console.log(this.report);
    }
}
const accounting = new Department('d1', 'Accounting');
accounting.addEmployee('Max');
accounting.addEmployee('Manu');
accounting.describe();
const itAccounting = new ITDepartment('IT', ['Yuto'], ['Happy New Year']);
itAccounting.describe();
itAccounting.printReport();
console.log(accounting);
