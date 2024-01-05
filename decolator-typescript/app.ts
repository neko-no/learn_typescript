function Logger(logString: string) {
     return function(constructor: Function) {
          console.log(logString);
          console.log(constructor);
     }
}

function WithTemplate(template: string, hookId: string) {
     return function(_: Function){
          const hookEl = document.getElementById(hookId);
          hookEl && (hookEl.innerHTML = template )

     }
}


@Logger('デコレータ呼び出し中...')
@WithTemplate('こんにちは', 'app')
class Person {
     name = 'Max';

     constructor(){
          console.log('Personオブジェクトを作成中...');
     }
}

const pers = new Person();

console.log(pers);
