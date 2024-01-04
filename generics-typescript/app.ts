const names: string[] = ['Max', 'Yuto'];

const promise = new Promise<string>((res ,rej)=>{
     setTimeout(() => {
          res('終わりました!!')
     },2000)
})

function merge<T extends {}, U>(obj1: T, obj2: U) {
     return Object.assign(obj1,obj2);
}

console.log(merge({name: 'Max'}, {age: 30}));
