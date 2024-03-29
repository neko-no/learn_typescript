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

type Combinable = string | number;
type Numeric = number | boolean;

type Univarsal = Combinable & Numeric;

function add (a: Combinable, b:Combinable) {
     if(typeof a === 'string' || typeof b === 'string') {
          return a.toString() + b.toString();
     }

     return a + b;
}

type UnknownEmoployee = Admin | Employee;

function printInfoEmployee(emp: UnknownEmoployee){
      console.log(emp.name);
      if ('privileges' in emp) {
           console.log(`Privilages: ${emp.privileges}`);
      }
      if('startDate' in emp) {
          console.log(`startDate: ${emp.startDate}`);
      }
}

printInfoEmployee(e1);


class Car {
     drive () {
          console.log('運転中...')
     }
}

class Truck {
     drive () {
          console.log('トラックを運転中...')
     }

     loadCargo (amount: number){
          console.log(`荷物を乗せています　${amount}`)
     }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
     vehicle.drive();

     if(vehicle instanceof Truck){
          vehicle.loadCargo(1000);
     }
}

interface Bird {
     type: 'bird';
    flyingSpeed: number;
}

interface Horse {
     type: 'horse';
     runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
     let speed;

     switch(animal.type) {
          case 'bird':
               speed = animal.flyingSpeed;
               break;
          case 'horse':
               speed = animal.runningSpeed;
               break;
     }

     console.log(`移動速度: ${speed}`)

}

moveAnimal({type: 'bird', flyingSpeed: 30})

// const paragrah = <HTMLInputElement>document.getElementById('message-output');
const paragrah = document.getElementById('message-output') as HTMLInputElement;

paragrah.innerHTML = 'input!!!!! '

interface ErrorContianer {
     [prop: string] : string;
}

const errorBag: ErrorContianer = {
     email: '正しいメールアドレスではありません．'
}

const fetchData = {
     id: 'u1',
     name: 'user1',
     job: {
          title: 'Developer',
          description: 'TypeScript',
     }
}

console.log(fetchData.job?.title)
