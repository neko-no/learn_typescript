const person = {
    name: 'neko',
    age: 20,
    hobbies: ['sports', 'Cooking'],
}

let favoriteActivities: string[];
favoriteActivities = ['Sports'];

console.log(person);

for (const hobby of person.hobbies){
    console.log(hobby);
}
