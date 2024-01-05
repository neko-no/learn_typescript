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

function Log(target: any, prototypeName: string | Symbol){
     console.log('Prototype デコレータ');
     console.log(target, prototypeName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor){
     console.log('Accessorデコレータ');
     console.log(target);
     console.log(name);
     console.log(descriptor);
}

function Log3(target: any, name: string, descriptor: PropertyDescriptor){
     console.log('Methodデコレータ');
     console.log(target);
     console.log(name);
     console.log(descriptor);
}

function Log4(target: any, name: string, position: number){
     console.log('Prametor デコレータ');
     console.log(target);
     console.log(name);
     console.log(position);
}
class Product {
     @Log
     title: string;
     private _price: number;

     constructor(t: string, n: number){
          this.title = t;
          this._price = n;
     }

     @Log2
     set price(val: number){
          if (val > 0){
               this._price = val;
          } else {
               throw new Error('不正な価格です．0以上の値を設定してください')
          }
     }

     @Log3
     getPriceWithTax(@Log4 tax: number) {
          return this._price * (1 + tax);
     }
}
