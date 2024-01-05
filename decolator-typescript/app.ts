function Logger(logString: string) {
     return function(constructor: Function) {
          console.log(logString);
          console.log(constructor);
     }
}


@Logger('デコレータ呼び出し中...')
class Person {
     name = 'Max';

     constructor(){
          console.log('Personオブジェクトを作成中...');
     }
}

const pers = new Person();

console.log(pers);
