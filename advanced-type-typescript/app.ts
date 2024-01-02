interface Named {
     name: string;
     age: number;
}

interface Greetable extends Named{
    greet(pharase: string): void;
}


class Person implements Greetable {
     constructor(public name: string, public age: number) {}

     greet(pharase: string): void {
          console.log(`${this.name} ${pharase}`)
     }
}

let user1:Greetable;
user1 = new Person('Max', 30);

user1.greet('hello')

interface Addfn {
     (a: number, b: number): number;
}

let add: Addfn;

add = (n1, n2) => {
     return n1 + n2;
}
