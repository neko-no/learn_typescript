"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
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
    static getInstance() {
        if (ITDepartment.instance) {
            return this.instance;
        }
        this.instance = new ITDepartment('d2', [], []);
        return this.instance;
    }
    describe() {
        console.log(this.name);
        console.log(Department.fiscalYear);
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
// const itAccounting = new ITDepartment('IT', ['Yuto'], ['Happy New Year']);
const itAccounting = ITDepartment.getInstance();
itAccounting.describe();
itAccounting.printReport();
console.log(itAccounting.moseRecentReport);
