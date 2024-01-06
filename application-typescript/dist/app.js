"use strict";
class ProjectInput {
    constructor() {
        // フォームの表示を行う
        this.templateElement = document.getElementById('project-input');
        this.hostElement = document.getElementById('app');
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = 'user-input';
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.mandayInputElement = this.element.querySelector('#manday');
        this.configure();
        this.attach();
    }
    submitHundler(event) {
        event.preventDefault();
        console.log(this.titleInputElement.value);
        // console.log(this.descriptionInputElement.value);
        // console.log(this.mandayInputElement.value);
    }
    configure() {
        this.element.addEventListener('submit', this.submitHundler.bind(this));
    }
    attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}
const prjInput = new ProjectInput();
