var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("autobind-decorator", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.autobind = void 0;
    // autobind decorator
    function autobind(target, methodName, desriptor) {
        const originalMethod = desriptor.value;
        const adjDescriptor = {
            configurable: true,
            get() {
                const boundFn = originalMethod.bind(this);
                return boundFn;
            }
        };
        return adjDescriptor;
    }
    exports.autobind = autobind;
});
define("drag-drop-interfaces", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("project-model", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Project = exports.ProjectStatus = void 0;
    var ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
        ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
    })(ProjectStatus || (exports.ProjectStatus = ProjectStatus = {}));
    class Project {
        constructor(id, title, description, manday, status) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.manday = manday;
            this.status = status;
        }
    }
    exports.Project = Project;
});
define("project-state", ["require", "exports", "project-model"], function (require, exports, project_model_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.projectState = exports.ProjectState = void 0;
    class State {
        constructor() {
            this.listeners = [];
        }
        addListener(listenerFn) {
            this.listeners.push(listenerFn);
        }
    }
    class ProjectState extends State {
        constructor() {
            super();
            this.projects = [];
        }
        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            this.instance = new ProjectState();
            return this.instance;
        }
        addProject(title, description, manday) {
            const newProject = new project_model_1.Project(Math.random().toString(), title, description, manday, project_model_1.ProjectStatus.Active);
            this.projects.push(newProject);
            this.updateListeners();
        }
        moveProject(projectId, newStatus) {
            const project = this.projects.find(prj => prj.id === projectId);
            if (project && project.status !== newStatus) {
                project.status = newStatus;
                this.updateListeners();
            }
        }
        updateListeners() {
            for (const listenerFn of this.listeners) {
                listenerFn(this.projects.slice());
            }
        }
    }
    exports.ProjectState = ProjectState;
    exports.projectState = ProjectState.getInstance();
});
define("validation", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validate = void 0;
    function validate(validatableInput) {
        let isValid = true;
        if (validatableInput.required) {
            isValid = isValid && validatableInput.value.toString().trim().length !== 0;
        }
        if (validatableInput.minLength && typeof validatableInput.value === 'string') {
            isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
        }
        if (validatableInput.maxLength && typeof validatableInput.value === 'string') {
            isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
        }
        if (validatableInput.min && typeof validatableInput.value === 'number') {
            isValid = isValid && validatableInput.value >= validatableInput.min;
        }
        if (validatableInput.max && typeof validatableInput.value === 'number') {
            isValid = isValid && validatableInput.value <= validatableInput.max;
        }
        return isValid;
    }
    exports.validate = validate;
});
define("app", ["require", "exports", "autobind-decorator", "project-model", "project-state", "validation"], function (require, exports, autobind_decorator_1, project_model_2, project_state_1, validation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Component {
        constructor(templateId, hostElementId, insertAtStart, newElementId) {
            this.templateElement = document.getElementById(templateId);
            this.hostElement = document.getElementById(hostElementId);
            const importedNode = document.importNode(this.templateElement.content, true);
            this.element = importedNode.firstElementChild;
            newElementId && (this.element.id = newElementId);
            this.attach(insertAtStart);
        }
        attach(insertAtStart) {
            this.hostElement.insertAdjacentElement(insertAtStart ? 'afterbegin' : 'beforeend', this.element);
        }
    }
    class ProjectItem extends Component {
        constructor(hostId, project) {
            super('single-project', hostId, false, project.id);
            this.project = project;
            this.configure();
            this.renderContent();
        }
        get manday() {
            if (this.project.manday < 20) {
                return `${this.project.manday.toString()}人日`;
            }
            const manmonth = this.project.manday / 20;
            return `${manmonth.toString()}人月`;
        }
        dragStartHandler(event) {
            event.dataTransfer.setData('text/plain', this.project.id);
            event.dataTransfer.effectAllowed = 'move';
        }
        dragEndHandler(event) {
            console.log('Drag終了');
        }
        configure() {
            this.element.addEventListener('dragstart', this.dragStartHandler);
            this.element.addEventListener('dragend', this.dragEndHandler);
        }
        renderContent() {
            this.element.querySelector('h2').textContent = this.project.title;
            this.element.querySelector('h3').textContent = this.manday;
            this.element.querySelector('p').textContent = this.project.description;
        }
    }
    __decorate([
        autobind_decorator_1.autobind
    ], ProjectItem.prototype, "dragStartHandler", null);
    class ProjectList extends Component {
        constructor(type) {
            super('project-list', 'app', false, `${type}-projects`);
            this.type = type;
            this.assignedProject = [];
            this.configure();
            this.renderContent();
        }
        dragOverHandler(event) {
            if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
                event.preventDefault();
                const listEl = this.element.querySelector('ul');
                listEl.classList.add('droppable');
            }
        }
        dropHandler(event) {
            const prjId = event.dataTransfer.getData('text/plain');
            project_state_1.projectState.moveProject(prjId, this.type === 'active' ? project_model_2.ProjectStatus.Active : project_model_2.ProjectStatus.Finished);
        }
        dragLeaveHandler(event) {
            const listEl = this.element.querySelector('ul');
            listEl.classList.remove('droppable');
        }
        renderContent() {
            const listId = `${this.type}-project-list`;
            this.element.querySelector('ul').id = listId;
            this.element.querySelector('h2').textContent = this.type === 'active' ? '実行中プロジェクト' : '完了プロジェクト';
        }
        configure() {
            this.element.addEventListener('dragover', this.dragOverHandler);
            this.element.addEventListener('drop', this.dropHandler);
            this.element.addEventListener('dragleave', this.dragLeaveHandler);
            project_state_1.projectState.addListener((projects) => {
                const relevantProjects = projects.filter(prj => {
                    if (this.type === 'active') {
                        return prj.status === project_model_2.ProjectStatus.Active;
                    }
                    return prj.status === project_model_2.ProjectStatus.Finished;
                });
                this.assignedProject = relevantProjects;
                this.renderProjects();
            });
        }
        renderProjects() {
            const listEl = document.getElementById(`${this.type}-project-list`);
            listEl.innerHTML = '';
            for (const prjItem of this.assignedProject) {
                new ProjectItem(listEl.id, prjItem);
            }
        }
    }
    __decorate([
        autobind_decorator_1.autobind
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        autobind_decorator_1.autobind
    ], ProjectList.prototype, "dropHandler", null);
    __decorate([
        autobind_decorator_1.autobind
    ], ProjectList.prototype, "dragLeaveHandler", null);
    class ProjectInput extends Component {
        constructor() {
            super('project-input', 'app', true, 'user-input');
            // フォームの表示を行う
            this.titleInputElement = this.element.querySelector('#title');
            this.descriptionInputElement = this.element.querySelector('#description');
            this.mandayInputElement = this.element.querySelector('#manday');
            this.configure();
        }
        gatherUserInput() {
            const enteredTitle = this.titleInputElement.value;
            const enteredDescription = this.descriptionInputElement.value;
            const enteredManday = this.mandayInputElement.value;
            const titleValidatable = {
                value: enteredTitle, required: true,
            };
            const desriptionValidatable = {
                value: enteredDescription, required: true, minLength: 5
            };
            const mandayValidatable = {
                value: +enteredManday, required: true, min: 0, max: 1000
            };
            if (!(0, validation_1.validate)(titleValidatable) ||
                !(0, validation_1.validate)(desriptionValidatable) ||
                !(0, validation_1.validate)(mandayValidatable)) {
                alert('入力値が正しくありません。再度お試しください。');
                return;
            }
            else {
                return [enteredTitle, enteredDescription, +enteredManday];
            }
        }
        clearInputs() {
            this.titleInputElement.value = '';
            this.descriptionInputElement.value = '';
            this.mandayInputElement.value = '';
        }
        submitHandler(event) {
            event.preventDefault();
            const userInput = this.gatherUserInput();
            if (Array.isArray(userInput)) {
                const [title, desc, manday] = userInput;
                project_state_1.projectState.addProject(title, desc, manday);
                //   console.log(title, desc, manday);
                this.clearInputs();
            }
        }
        configure() {
            this.element.addEventListener('submit', this.submitHandler);
        }
        renderContent() {
        }
    }
    __decorate([
        autobind_decorator_1.autobind
    ], ProjectInput.prototype, "submitHandler", null);
    __decorate([
        autobind_decorator_1.autobind
    ], ProjectInput.prototype, "configure", null);
    new ProjectInput();
    new ProjectList('active');
    new ProjectList('finished');
});
//# sourceMappingURL=bundle.js.map