function Logger(constructor: Function) {
     console.log('デコレータ呼び出し中...');
     console.log(constructor);
}

@Logger
class Person {
     name = 'Max';

     constructor(){
          console.log('Personオブジェクトを作成中...');
     }
}

const pers = new Person();

console.log(pers);
