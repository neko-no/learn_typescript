"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    }
    describe() {
        console.log(this.name);
        console.log(Department.fiscalYear);
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
Department.fiscalYear = 2020;
class ITDepartment extends Department {
    constructor(id, admins, report) {
        super(id, 'IT');
        this.admins = admins;
        this.report = report;
        this.lastReport = report[0];
    }
    addReport(text) {
        this.report.push(text);
        this.lastReport = text;
    }
    printReport() {
        console.log(this.report);
    }
    get moseRecentReport() {
        return this.lastReport;
    }
}
const accounting = new Department('d1', 'Accounting');
accounting.addEmployee('Max');
accounting.addEmployee('Manu');
accounting.describe();
const itAccounting = new ITDepartment('IT', ['Yuto'], ['Happy New Year']);
itAccounting.describe();
itAccounting.printReport();
console.log(itAccounting.moseRecentReport);
console.log(accounting);
