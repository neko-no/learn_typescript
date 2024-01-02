class Department {
     static fiscalYear = 2020;
     private employees: string[] = [];

     constructor(
          private readonly id: string,
          public name: string
     ) {}

     describe(this: Department) {
          console.log(this.name);
          console.log(Department.fiscalYear);
     }

     addEmployee(employee: string) {
          this.employees.push(employee);
     }

     printEmployeeInformation(){
          console.log(this.employees.length);
          console.log(this.employees);
     }
}

class ITDepartment extends Department {
     private lastReport: string;

     constructor(id: string, private admins: string[], private report: string[]) {
          super(id, 'IT');
          this.lastReport = report[0]
     }

     addReport(text: string) {
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

const accounting =  new Department('d1', 'Accounting');
accounting.addEmployee('Max');
accounting.addEmployee('Manu');
accounting.describe();

const itAccounting = new ITDepartment('IT', ['Yuto'], ['Happy New Year']);
itAccounting.describe();
itAccounting.printReport();
console.log(itAccounting.moseRecentReport);
console.log(accounting);
