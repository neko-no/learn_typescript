class Department {
     private employees: string[] = [];

     constructor(
          private readonly id: string,
          public name: string
     ) {}

     describe(this: Department) {
          console.log(this.name);
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
     constructor(id: string, private admins: string[], private report: string[]) {
          super(id, 'IT');
     }

     addReport(text: string) {
          this.report.push(text);
     }

     printReport() {
          console.log(this.report);
     }

}

const accounting =  new Department('d1', 'Accounting');
accounting.addEmployee('Max');
accounting.addEmployee('Manu');
accounting.describe();

const itAccounting = new ITDepartment('IT', ['Yuto'], ['Happy New Year']);
itAccounting.describe();
itAccounting.printReport();
console.log(accounting);
