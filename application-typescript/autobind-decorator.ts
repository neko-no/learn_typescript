namespace App {
    // autobind decorator
    export function autobind(target:any, methodName: string, desriptor: PropertyDescriptor){
        const originalMethod = desriptor.value;
        const adjDescriptor: PropertyDescriptor = {
             configurable: true,
             get () {
                  const boundFn = originalMethod.bind(this);
                  return boundFn;
             }
        }

        return adjDescriptor;
   }
}
