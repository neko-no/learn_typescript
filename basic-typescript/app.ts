const person:{
    name: string;
    age: number;
    hobbies: string[];
    role: [number, string];
} = {
    name: 'neko',
    age: 20,
    hobbies: ['sports', 'Cooking'],
    role: [2, 'author']
}

let favoriteActivities: string[];
favoriteActivities = ['Sports'];

console.log(person);

for (const hobby of person.hobbies){
    console.log(hobby);
}
