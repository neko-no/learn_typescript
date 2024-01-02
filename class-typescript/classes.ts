abstract class Department_ {
     static fiscalYear = 2020;
     private employees: string[] = [];

     constructor(
          private readonly id: string,
          public name: string
     ) {}

     abstract describe(this: Department): void;

     addEmployee(employee: string) {
          this.employees.push(employee);
     }

     printEmployeeInformation(){
          console.log(this.employees.length);
          console.log(this.employees);
     }
}

class ITDepartment_ extends Department_ {
     private lastReport: string;
     private static instance: ITDepartment_;

     private constructor(id: string, private admins: string[], private report: string[]) {
          super(id, 'IT');
          this.lastReport = report[0]
     }

     static getInstance() {
          if(ITDepartment_.instance) {
               return this.instance;
          }

          this.instance = new ITDepartment_('d2',[],[]);
          return this.instance;
     }

     describe(this: Department): void {
          console.log(this.name);
          console.log(Department.fiscalYear);
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

// const itAccounting = new ITDepartment('IT', ['Yuto'], ['Happy New Year']);
const itAccounting_ = ITDepartment_.getInstance();
itAccounting.describe();
itAccounting.printReport();
console.log(itAccounting.moseRecentReport);
