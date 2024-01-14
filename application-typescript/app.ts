import { autobind } from './autobind-decorator';
import { Draggable, DragTarget} from './drag-drop-interfaces';
import { Project, ProjectStatus } from './project-model';
import { projectState } from './project-state';
import { Validatable, validate } from './validation';

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
     templateElement: HTMLTemplateElement;
     hostElement: T;
     element: U;

     constructor(templateId: string, hostElementId: string, insertAtStart: boolean,  newElementId?: string){
          this.templateElement = document.getElementById(templateId) as HTMLTemplateElement;
          this.hostElement = document.getElementById(hostElementId)! as T;
          const importedNode = document.importNode(this.templateElement.content, true);

          this.element = importedNode.firstElementChild as U;
          newElementId && (this.element.id = newElementId);

          this.attach(insertAtStart);
     }

     abstract configure(): void;
     abstract renderContent(): void;

     private attach(insertAtStart: boolean){
          this.hostElement.insertAdjacentElement(insertAtStart ?  'afterbegin' :'beforeend', this.element);
     }

}

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable{
     private project: Project;

     constructor(hostId: string,project: Project){
          super('single-project', hostId, false, project.id);
          this.project = project;

          this.configure();
          this.renderContent();
     }

     get manday() {
          if(this.project.manday < 20) {
               return `${this.project.manday.toString()}人日`
          }

          const manmonth = this.project.manday / 20;
          return `${manmonth.toString()}人月`;
     }

     @autobind
     dragStartHandler(event: DragEvent): void {
          event.dataTransfer!.setData('text/plain',this.project.id);
          event.dataTransfer!.effectAllowed = 'move';
     }

     dragEndHandler(event: DragEvent): void {
          console.log('Drag終了')
     }

     configure(): void {
          this.element.addEventListener('dragstart', this.dragStartHandler)
          this.element.addEventListener('dragend', this.dragEndHandler)
     }

     renderContent(): void {
          this.element.querySelector('h2')!.textContent = this.project.title;
          this.element.querySelector('h3')!.textContent = this.manday;
          this.element.querySelector('p')!.textContent = this.project.description;
     }
}

class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget{
     assignedProject: Project[];

     constructor(private type: 'active' | 'finished'){
          super('project-list','app', false ,`${type}-projects`);
          this.assignedProject = [];

          this.configure();
          this.renderContent();
     }

     @autobind
     dragOverHandler(event: DragEvent): void {
          if(event.dataTransfer && event.dataTransfer.types[0] === 'text/plain'){
               event.preventDefault();
               const listEl = this.element.querySelector('ul')!;
               listEl.classList.add('droppable');
          }
     }

     @autobind
     dropHandler(event: DragEvent): void {
          const prjId = event.dataTransfer!.getData('text/plain');
          projectState.moveProject(prjId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
     }

     @autobind
     dragLeaveHandler(event: DragEvent): void {
          const listEl = this.element.querySelector('ul')!;
          listEl.classList.remove('droppable');
     }


     renderContent(){
          const listId = `${this.type}-project-list`;
          this.element.querySelector('ul')!.id = listId;
          this.element.querySelector('h2')!.textContent = this.type === 'active' ? '実行中プロジェクト' : '完了プロジェクト';
     }

     configure(): void {
          this.element.addEventListener('dragover', this.dragOverHandler);
          this.element.addEventListener('drop', this.dropHandler);
          this.element.addEventListener('dragleave', this.dragLeaveHandler);


          projectState.addListener((projects: Project[]) => {
               const relevantProjects = projects.filter( prj => {
                    if(this.type === 'active') {
                         return prj.status === ProjectStatus.Active;
                    }
                    return prj.status === ProjectStatus.Finished;
               })
               this.assignedProject = relevantProjects;
               this.renderProjects();
          })
     }

     private renderProjects(){
          const listEl = document.getElementById(`${this.type}-project-list`) as HTMLUListElement;
          listEl.innerHTML = '';
          for (const prjItem of this.assignedProject){
                    new ProjectItem(listEl.id, prjItem)
          }
     }
}


class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
     titleInputElement: HTMLInputElement;
     descriptionInputElement: HTMLInputElement;
     mandayInputElement: HTMLInputElement;

     constructor(){
          super('project-input', 'app', true, 'user-input')
          // フォームの表示を行う
          this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
          this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
          this.mandayInputElement = this.element.querySelector('#manday') as HTMLInputElement;

          this.configure();
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
     configure(){
          this.element.addEventListener('submit', this.submitHandler)
     }

     renderContent(): void {

     }
}

new ProjectInput();
new ProjectList('active');
new ProjectList('finished');
