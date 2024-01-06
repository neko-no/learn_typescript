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

interface ValidatorConfig {
     [prop: string]: {
          [validatableProp: string]: string[]
     }
}

const registorValidators: ValidatorConfig = {};

function Required(target: any, propName: string){
     registorValidators[target.constructor.name] = {
          ...registorValidators[target.constructor.name],
          [propName]: [
            ...(registorValidators[target.constructor.name]?.[propName] ?? []),
            "required",
          ],
     };
}

function PositiveNumber(target: any, propName: string){
     registorValidators[target.constructor.name] = {
          ...registorValidators[target.constructor.name],
          [propName]: [
            ...(registorValidators[target.constructor.name]?.[propName] ?? []),
            "positive",
          ],
     };
}

function validate(obj: any) {
     const objValidatorConfig = registorValidators[obj.constructor.name];
     if (!objValidatorConfig) {
       return true;
     }
     let isValid = true;
     for (const prop in objValidatorConfig) {
       for (const validator of objValidatorConfig[prop]) {
         switch (validator) {
           case 'required':
             isValid = isValid && !!obj[prop];
             break;
           case 'positive':
             isValid = isValid && obj[prop] > 0;
             break;
         }
       }
     }
     return isValid;
   }

class Cource {
     @Required
     title: string;
     @PositiveNumber
     price: number;

     constructor(t: string, p: number) {
          this.title = t;
          this.price = p;
     }
}

const courceForm = document.querySelector('form')!;
courceForm.addEventListener('submit', (event) => {
     event.preventDefault();
     const titleEl = document.getElementById('title') as HTMLInputElement;
     const priceEl = document.getElementById('price') as HTMLInputElement;

     const title = titleEl.value;
     const price = +priceEl.value;

     const createdCource = new Cource(title, price);

     if(!validate(createdCource)){
          alert('エラーが発生してます．')
     }
     console.log(createdCource);

})
