type Admin = {
     name: string;
     privileges: string[];
}

type Employee = {
     name: string;
     startDate: Date;
}

type ElevateEmployee = Admin & Employee;

const e1: ElevateEmployee = {
     name: 'Max',
     privileges: ['create-server'],
     startDate: new Date()
}
