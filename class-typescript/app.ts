interface Person {
    name: string;
    age: number;

    greet(pharase: string): void;
}


let user1:Person;

user1 = {
     name: 'Max',
     age: 30,
     greet(pharase:string) {
          console.log(`${pharase} ${this.name}`)
     }
}

user1.greet('hello')
