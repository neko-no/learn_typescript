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

interface Lengthy {
     length: number;
}

function countAndDescribe<T extends Lengthy>(element: T) {
     let description = '値が格納されていません'
     if (element.length > 0) {
          description = `値は${element.length}個です．`
     }

     return [element, description]
}

console.log(countAndDescribe('お疲れ様です．これからも頑張ってください'));

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
     return `Value: ${obj[key]}`
}

extractAndConvert({name: 'Max'}, "name");
