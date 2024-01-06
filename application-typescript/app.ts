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

     private gatherUserInput(): [string, string, number] | void {
          const enteredTitle = this.titleInputElement.value;
          const enteredDescription = this.descriptionInputElement.value;
          const enteredManday = this.mandayInputElement.value;
          if (
            enteredTitle.trim().length === 0 ||
            enteredDescription.trim().length === 0 ||
            enteredManday.trim().length === 0
          ) {
            alert('入力値が正しくありません。再度お試しください。');
            return;
          } else {
            return [enteredTitle, enteredDescription, +enteredManday];
          }
        }

        private clearInputs() {
          this.titleInputElement.value = '';
          this.descriptionInputElement.value = '';
          this.mandayInputElement.value = '';
        }

        @autobind
        private submitHandler(event: Event) {
          event.preventDefault();
          const userInput = this.gatherUserInput();
          if (Array.isArray(userInput)) {
            const [title, desc, manday] = userInput;
            console.log(title, desc, manday);
          }
        }

     @autobind
     private configure(){
          this.element.addEventListener('submit', this.submitHandler)
     }

     private attach(){
          this.hostElement.insertAdjacentElement('afterbegin', this.element);
     }
}

const prjInput  = new ProjectInput();
