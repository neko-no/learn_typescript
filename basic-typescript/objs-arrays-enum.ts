enum Role {
    ADMIN,
    READ_ONLY_USER,
    AUTHOR
}

const person = {
    name: 'neko',
    age: 20,
    hobbies: ['sports', 'Cooking'],
    role: Role.ADMIN
}

let favoriteActivities: any[];
favoriteActivities = ['Sports'];

console.log(person);

for (const hobby of person.hobbies){
    console.log(hobby);
}

if (person.role === Role.ADMIN){
    console.log("表示可能な値になります");
}
