// autobind decorator
function autobind(target:any, methodName: string, desriptor: PropertyDescriptor){
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


class ProjectInput {
     templateElement: HTMLTemplateElement;
     hostElement: HTMLDivElement;
     element: HTMLFormElement;
     titleInputElement: HTMLInputElement;
     descriptionInputElement: HTMLInputElement;
     mandayInputElement: HTMLInputElement;

     constructor(){
          // フォームの表示を行う
          this.templateElement = document.getElementById('project-input') as HTMLTemplateElement;
          this.hostElement = document.getElementById('app')! as HTMLDivElement;

          const importedNode = document.importNode(this.templateElement.content, true);

          this.element = importedNode.firstElementChild as HTMLFormElement;
          this.element.id = 'user-input';

          this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
          this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
          this.mandayInputElement = this.element.querySelector('#manday') as HTMLInputElement;

          this.configure();
          this.attach();
     }

     private submitHundler(event: Event) {
          event.preventDefault();
          console.log(this.titleInputElement.value);
          console.log(this.descriptionInputElement.value);
          console.log(this.mandayInputElement.value);

     }

     @autobind
     private configure(){
          this.element.addEventListener('submit', this.submitHundler)
     }

     private attach(){
          this.hostElement.insertAdjacentElement('afterbegin', this.element);
     }
}

const prjInput  = new ProjectInput();
