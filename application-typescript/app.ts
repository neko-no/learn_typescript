enum ProjectStatus {
     Active, Finished
}

class Project {
     constructor(public id: string, public title: string, public description: string, public manday: number, public status: ProjectStatus) {

     }
}

type Listener = (items: Project[]) => void;
class ProjectState {
     private listeners: Listener [] = [];
     private projects: Project[] = [];
     private static instance: ProjectState;

     private constructor(){

     }

     static getInstance(){
          if(this.instance) {
               return this.instance;
          }
          this.instance = new ProjectState();
          return this.instance;
     }

     addListener(listenerFn: Listener){
          this.listeners.push(listenerFn)
     }

     addProject (title: string, description: string, manday: number){
          const newProject = new Project(Math.random().toString(),
          title,
          description,
          manday,
          ProjectStatus.Active);
          this.projects.push(newProject);
          for (const listenerFn of this.listeners){
               listenerFn(this.projects.slice())
          }
     }
}

const projectState = ProjectState.getInstance();


interface Validatable {
     value: string | number;
     required?: boolean;
     minLength?: number;
     maxLength?: number;
     min?: number;
     max?: number;
}

function validate(validatableInput: Validatable) {
     let isValid = true;
     if(validatableInput.required){
          isValid = isValid && validatableInput.value.toString().trim().length !== 0

     }

     if(validatableInput.minLength && typeof validatableInput.value === 'string'){
          isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
     }
     if(validatableInput.maxLength && typeof validatableInput.value === 'string'){
          isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
     }

     if(validatableInput.min && typeof validatableInput.value === 'number'){
          isValid = isValid && validatableInput.value >= validatableInput.min;
     }
     if(validatableInput.max && typeof validatableInput.value === 'number'){
          isValid = isValid && validatableInput.value <= validatableInput.max;
     }

     return isValid;
}


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

class ProjectList {
     templateElement: HTMLTemplateElement;
     hostElement: HTMLDivElement;
     element: HTMLElement;
     assignedProject: Project[];

     constructor(private type: 'active' | 'finished'){
          this.templateElement = document.getElementById('project-list') as HTMLTemplateElement;
          this.hostElement = document.getElementById('app')! as HTMLDivElement;
          this.assignedProject = [];

          const importedNode = document.importNode(this.templateElement.content, true);

          this.element = importedNode.firstElementChild as HTMLElement;
          this.element.id = `${this.type}-projects`;

          projectState.addListener((projects: Project[]) => {
               this.assignedProject = projects;
               this.renderProjects();
          })
          this.attach();
          this.renderContent();
     }

     private renderProjects(){
          const listEl = document.getElementById(`${this.type}-project-list`) as HTMLUListElement;
          for (const prjItem of this.assignedProject){
               const listItem  = document.createElement('li');
               listItem.textContent = prjItem.title;
               listEl.appendChild(listItem);
          }
     }

     private renderContent(){
          const listId = `${this.type}-project-list`;
          this.element.querySelector('ul')!.id = listId;
          this.element.querySelector('h2')!.textContent = this.type === 'active' ? '実行中プロジェクト' : '完了プロジェクト';
     }


     private attach(){
          this.hostElement.insertAdjacentElement('beforeend', this.element);
     }
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

          const titleValidatable:Validatable = {
               value: enteredTitle, required: true,
          }
          const desriptionValidatable:Validatable = {
               value: enteredDescription, required: true, minLength:5
          }
          const mandayValidatable:Validatable = {
               value: +enteredManday, required: true, min: 0, max: 1000
          }

          if (
            !validate(titleValidatable) ||
            !validate(desriptionValidatable) ||
            !validate(mandayValidatable)
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
            projectState.addProject(title, desc, manday)
          //   console.log(title, desc, manday);
            this.clearInputs();
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
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');
