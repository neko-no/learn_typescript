(()=>{"use strict";function e(e,t,n){const r=n.value;return{configurable:!0,get(){return r.bind(this)}}}var t;!function(e){e[e.Active=0]="Active",e[e.Finished=1]="Finished"}(t||(t={}));class n{constructor(e,t,n,r,s){this.id=e,this.title=t,this.description=n,this.manday=r,this.status=s}}class r{constructor(){this.listeners=[]}addListener(e){this.listeners.push(e)}}class s extends r{constructor(){super(),this.projects=[]}static getInstance(){return this.instance||(this.instance=new s),this.instance}addProject(e,r,s){const i=new n(Math.random().toString(),e,r,s,t.Active);this.projects.push(i),this.updateListeners()}moveProject(e,t){const n=this.projects.find((t=>t.id===e));n&&n.status!==t&&(n.status=t,this.updateListeners())}updateListeners(){for(const e of this.listeners)e(this.projects.slice())}}const i=s.getInstance();function a(e){let t=!0;return e.required&&(t=t&&0!==e.value.toString().trim().length),e.minLength&&"string"==typeof e.value&&(t=t&&e.value.length>=e.minLength),e.maxLength&&"string"==typeof e.value&&(t=t&&e.value.length<=e.maxLength),e.min&&"number"==typeof e.value&&(t=t&&e.value>=e.min),e.max&&"number"==typeof e.value&&(t=t&&e.value<=e.max),t}var l=function(e,t,n,r){var s,i=arguments.length,a=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(a=(i<3?s(a):i>3?s(t,n,a):s(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a};class o{constructor(e,t,n,r){this.templateElement=document.getElementById(e),this.hostElement=document.getElementById(t);const s=document.importNode(this.templateElement.content,!0);this.element=s.firstElementChild,r&&(this.element.id=r),this.attach(n)}attach(e){this.hostElement.insertAdjacentElement(e?"afterbegin":"beforeend",this.element)}}class d extends o{constructor(e,t){super("single-project",e,!1,t.id),this.project=t,this.configure(),this.renderContent()}get manday(){return this.project.manday<20?`${this.project.manday.toString()}人日`:`${(this.project.manday/20).toString()}人月`}dragStartHandler(e){e.dataTransfer.setData("text/plain",this.project.id),e.dataTransfer.effectAllowed="move"}dragEndHandler(e){console.log("Drag終了")}configure(){this.element.addEventListener("dragstart",this.dragStartHandler),this.element.addEventListener("dragend",this.dragEndHandler)}renderContent(){this.element.querySelector("h2").textContent=this.project.title,this.element.querySelector("h3").textContent=this.manday,this.element.querySelector("p").textContent=this.project.description}}l([e],d.prototype,"dragStartHandler",null);class c extends o{constructor(e){super("project-list","app",!1,`${e}-projects`),this.type=e,this.assignedProject=[],this.configure(),this.renderContent()}dragOverHandler(e){e.dataTransfer&&"text/plain"===e.dataTransfer.types[0]&&(e.preventDefault(),this.element.querySelector("ul").classList.add("droppable"))}dropHandler(e){const n=e.dataTransfer.getData("text/plain");i.moveProject(n,"active"===this.type?t.Active:t.Finished)}dragLeaveHandler(e){this.element.querySelector("ul").classList.remove("droppable")}renderContent(){const e=`${this.type}-project-list`;this.element.querySelector("ul").id=e,this.element.querySelector("h2").textContent="active"===this.type?"実行中プロジェクト":"完了プロジェクト"}configure(){this.element.addEventListener("dragover",this.dragOverHandler),this.element.addEventListener("drop",this.dropHandler),this.element.addEventListener("dragleave",this.dragLeaveHandler),i.addListener((e=>{const n=e.filter((e=>"active"===this.type?e.status===t.Active:e.status===t.Finished));this.assignedProject=n,this.renderProjects()}))}renderProjects(){const e=document.getElementById(`${this.type}-project-list`);e.innerHTML="";for(const t of this.assignedProject)new d(e.id,t)}}l([e],c.prototype,"dragOverHandler",null),l([e],c.prototype,"dropHandler",null),l([e],c.prototype,"dragLeaveHandler",null);class u extends o{constructor(){super("project-input","app",!0,"user-input"),this.titleInputElement=this.element.querySelector("#title"),this.descriptionInputElement=this.element.querySelector("#description"),this.mandayInputElement=this.element.querySelector("#manday"),this.configure()}gatherUserInput(){const e=this.titleInputElement.value,t=this.descriptionInputElement.value,n=this.mandayInputElement.value,r={value:t,required:!0,minLength:5},s={value:+n,required:!0,min:0,max:1e3};return a({value:e,required:!0})&&a(r)&&a(s)?[e,t,+n]:void alert("入力値が正しくありません。再度お試しください。")}clearInputs(){this.titleInputElement.value="",this.descriptionInputElement.value="",this.mandayInputElement.value=""}submitHandler(e){e.preventDefault();const t=this.gatherUserInput();if(Array.isArray(t)){const[e,n,r]=t;i.addProject(e,n,r),this.clearInputs()}}configure(){this.element.addEventListener("submit",this.submitHandler)}renderContent(){}}l([e],u.prototype,"submitHandler",null),l([e],u.prototype,"configure",null),new u,new c("active"),new c("finished")})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBRUEsYUFBQTdDLEdBRUEsRUFsQmEsR0FEUHhFLEcsa0NBYU4sR0FEQ0EsRyw4QkFVTixJQUFJeUcsRUFDSixJQUFJckIsRUFBWSxVQUNoQixJQUFJQSxFQUFZLFciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXNpYy10eXBlc2NyaXB0Ly4vYXV0b2JpbmQtZGVjb3JhdG9yLnRzIiwid2VicGFjazovL2Jhc2ljLXR5cGVzY3JpcHQvLi9wcm9qZWN0LW1vZGVsLnRzIiwid2VicGFjazovL2Jhc2ljLXR5cGVzY3JpcHQvLi9wcm9qZWN0LXN0YXRlLnRzIiwid2VicGFjazovL2Jhc2ljLXR5cGVzY3JpcHQvLi92YWxpZGF0aW9uLnRzIiwid2VicGFjazovL2Jhc2ljLXR5cGVzY3JpcHQvLi9hcHAudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gYXV0b2JpbmQgZGVjb3JhdG9yXG5leHBvcnQgZnVuY3Rpb24gYXV0b2JpbmQodGFyZ2V0OmFueSwgbWV0aG9kTmFtZTogc3RyaW5nLCBkZXNyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvcil7XG4gICAgIGNvbnN0IG9yaWdpbmFsTWV0aG9kID0gZGVzcmlwdG9yLnZhbHVlO1xuICAgICBjb25zdCBhZGpEZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IgPSB7XG4gICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICBjb25zdCBib3VuZEZuID0gb3JpZ2luYWxNZXRob2QuYmluZCh0aGlzKTtcbiAgICAgICAgICAgICAgIHJldHVybiBib3VuZEZuO1xuICAgICAgICAgIH1cbiAgICAgfVxuXG4gICAgIHJldHVybiBhZGpEZXNjcmlwdG9yO1xufVxuIiwiXG5leHBvcnQgZW51bSBQcm9qZWN0U3RhdHVzIHtcbiAgICAgQWN0aXZlLCBGaW5pc2hlZFxufVxuXG5leHBvcnQgY2xhc3MgUHJvamVjdCB7XG4gICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBpZDogc3RyaW5nLCBwdWJsaWMgdGl0bGU6IHN0cmluZywgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmcsIHB1YmxpYyBtYW5kYXk6IG51bWJlciwgcHVibGljIHN0YXR1czogUHJvamVjdFN0YXR1cykge1xuXG4gICAgIH1cbn1cbiIsImltcG9ydCB7IFByb2plY3QsIFByb2plY3RTdGF0dXMgfSBmcm9tIFwiLi9wcm9qZWN0LW1vZGVsXCI7XG5cblxudHlwZSBMaXN0ZW5lcjxUPiA9IChpdGVtczogVFtdKSA9PiB2b2lkO1xuXG5jbGFzcyBTdGF0ZTxUPiB7XG4gICAgIHByb3RlY3RlZCBsaXN0ZW5lcnM6IExpc3RlbmVyPFQ+IFtdID0gW107XG5cbiAgICAgYWRkTGlzdGVuZXIobGlzdGVuZXJGbjogTGlzdGVuZXI8VD4pe1xuICAgICAgICAgIHRoaXMubGlzdGVuZXJzLnB1c2gobGlzdGVuZXJGbilcbiAgICAgfVxuXG59XG5cbmV4cG9ydCBjbGFzcyBQcm9qZWN0U3RhdGUgZXh0ZW5kcyBTdGF0ZTxQcm9qZWN0PntcbiAgICAgcHJpdmF0ZSBwcm9qZWN0czogUHJvamVjdFtdID0gW107XG4gICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBQcm9qZWN0U3RhdGU7XG5cbiAgICAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICAgIHN1cGVyKCk7XG4gICAgIH1cblxuICAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKXtcbiAgICAgICAgICBpZih0aGlzLmluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBQcm9qZWN0U3RhdGUoKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgICAgfVxuXG5cbiAgICAgYWRkUHJvamVjdCAodGl0bGU6IHN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZywgbWFuZGF5OiBudW1iZXIpe1xuICAgICAgICAgIGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdChNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCksXG4gICAgICAgICAgdGl0bGUsXG4gICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgICAgbWFuZGF5LFxuICAgICAgICAgIFByb2plY3RTdGF0dXMuQWN0aXZlKTtcbiAgICAgICAgICB0aGlzLnByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XG4gICAgICAgICAgdGhpcy51cGRhdGVMaXN0ZW5lcnMoKTtcbiAgICAgfVxuXG4gICAgIG1vdmVQcm9qZWN0KHByb2plY3RJZDpzdHJpbmcsIG5ld1N0YXR1czpQcm9qZWN0U3RhdHVzKXtcbiAgICAgICAgICBjb25zdCBwcm9qZWN0ID0gdGhpcy5wcm9qZWN0cy5maW5kKHByaiA9PiBwcmouaWQgPT09IHByb2plY3RJZClcblxuICAgICAgICAgIGlmKHByb2plY3QgJiYgcHJvamVjdC5zdGF0dXMgIT09IG5ld1N0YXR1cyl7XG4gICAgICAgICAgICAgICBwcm9qZWN0LnN0YXR1cyA9IG5ld1N0YXR1cztcbiAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTGlzdGVuZXJzKCk7XG4gICAgICAgICAgfVxuICAgICB9XG5cbiAgICAgcHJpdmF0ZSB1cGRhdGVMaXN0ZW5lcnMoKXtcbiAgICAgICAgICBmb3IgKGNvbnN0IGxpc3RlbmVyRm4gb2YgdGhpcy5saXN0ZW5lcnMpe1xuICAgICAgICAgICAgICAgbGlzdGVuZXJGbih0aGlzLnByb2plY3RzLnNsaWNlKCkpXG4gICAgICAgICAgfVxuICAgICB9XG59XG5cbiAgICBleHBvcnQgY29uc3QgcHJvamVjdFN0YXRlID0gUHJvamVjdFN0YXRlLmdldEluc3RhbmNlKCk7XG4iLCJcbmV4cG9ydCBpbnRlcmZhY2UgVmFsaWRhdGFibGUge1xuICAgICB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyO1xuICAgICByZXF1aXJlZD86IGJvb2xlYW47XG4gICAgIG1pbkxlbmd0aD86IG51bWJlcjtcbiAgICAgbWF4TGVuZ3RoPzogbnVtYmVyO1xuICAgICBtaW4/OiBudW1iZXI7XG4gICAgIG1heD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlKHZhbGlkYXRhYmxlSW5wdXQ6IFZhbGlkYXRhYmxlKSB7XG4gICAgIGxldCBpc1ZhbGlkID0gdHJ1ZTtcbiAgICAgaWYodmFsaWRhdGFibGVJbnB1dC5yZXF1aXJlZCl7XG4gICAgICAgICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgdmFsaWRhdGFibGVJbnB1dC52YWx1ZS50b1N0cmluZygpLnRyaW0oKS5sZW5ndGggIT09IDBcblxuICAgICB9XG5cbiAgICAgaWYodmFsaWRhdGFibGVJbnB1dC5taW5MZW5ndGggJiYgdHlwZW9mIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPT09ICdzdHJpbmcnKXtcbiAgICAgICAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlLmxlbmd0aCA+PSB2YWxpZGF0YWJsZUlucHV0Lm1pbkxlbmd0aDtcbiAgICAgfVxuICAgICBpZih2YWxpZGF0YWJsZUlucHV0Lm1heExlbmd0aCAmJiB0eXBlb2YgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA9PT0gJ3N0cmluZycpe1xuICAgICAgICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUubGVuZ3RoIDw9IHZhbGlkYXRhYmxlSW5wdXQubWF4TGVuZ3RoO1xuICAgICB9XG5cbiAgICAgaWYodmFsaWRhdGFibGVJbnB1dC5taW4gJiYgdHlwZW9mIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPT09ICdudW1iZXInKXtcbiAgICAgICAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlID49IHZhbGlkYXRhYmxlSW5wdXQubWluO1xuICAgICB9XG4gICAgIGlmKHZhbGlkYXRhYmxlSW5wdXQubWF4ICYmIHR5cGVvZiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlID09PSAnbnVtYmVyJyl7XG4gICAgICAgICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA8PSB2YWxpZGF0YWJsZUlucHV0Lm1heDtcbiAgICAgfVxuXG4gICAgIHJldHVybiBpc1ZhbGlkO1xufVxuIiwiaW1wb3J0IHsgYXV0b2JpbmQgfSBmcm9tICcuL2F1dG9iaW5kLWRlY29yYXRvcic7XG5pbXBvcnQgeyBEcmFnZ2FibGUsIERyYWdUYXJnZXR9IGZyb20gJy4vZHJhZy1kcm9wLWludGVyZmFjZXMnO1xuaW1wb3J0IHsgUHJvamVjdCwgUHJvamVjdFN0YXR1cyB9IGZyb20gJy4vcHJvamVjdC1tb2RlbCc7XG5pbXBvcnQgeyBwcm9qZWN0U3RhdGUgfSBmcm9tICcuL3Byb2plY3Qtc3RhdGUnO1xuaW1wb3J0IHsgVmFsaWRhdGFibGUsIHZhbGlkYXRlIH0gZnJvbSAnLi92YWxpZGF0aW9uJztcblxuYWJzdHJhY3QgY2xhc3MgQ29tcG9uZW50PFQgZXh0ZW5kcyBIVE1MRWxlbWVudCwgVSBleHRlbmRzIEhUTUxFbGVtZW50PiB7XG4gICAgIHRlbXBsYXRlRWxlbWVudDogSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgICAgaG9zdEVsZW1lbnQ6IFQ7XG4gICAgIGVsZW1lbnQ6IFU7XG5cbiAgICAgY29uc3RydWN0b3IodGVtcGxhdGVJZDogc3RyaW5nLCBob3N0RWxlbWVudElkOiBzdHJpbmcsIGluc2VydEF0U3RhcnQ6IGJvb2xlYW4sICBuZXdFbGVtZW50SWQ/OiBzdHJpbmcpe1xuICAgICAgICAgIHRoaXMudGVtcGxhdGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGVtcGxhdGVJZCkgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgICAgICAgICB0aGlzLmhvc3RFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaG9zdEVsZW1lbnRJZCkhIGFzIFQ7XG4gICAgICAgICAgY29uc3QgaW1wb3J0ZWROb2RlID0gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0aGlzLnRlbXBsYXRlRWxlbWVudC5jb250ZW50LCB0cnVlKTtcblxuICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGltcG9ydGVkTm9kZS5maXJzdEVsZW1lbnRDaGlsZCBhcyBVO1xuICAgICAgICAgIG5ld0VsZW1lbnRJZCAmJiAodGhpcy5lbGVtZW50LmlkID0gbmV3RWxlbWVudElkKTtcblxuICAgICAgICAgIHRoaXMuYXR0YWNoKGluc2VydEF0U3RhcnQpO1xuICAgICB9XG5cbiAgICAgYWJzdHJhY3QgY29uZmlndXJlKCk6IHZvaWQ7XG4gICAgIGFic3RyYWN0IHJlbmRlckNvbnRlbnQoKTogdm9pZDtcblxuICAgICBwcml2YXRlIGF0dGFjaChpbnNlcnRBdFN0YXJ0OiBib29sZWFuKXtcbiAgICAgICAgICB0aGlzLmhvc3RFbGVtZW50Lmluc2VydEFkamFjZW50RWxlbWVudChpbnNlcnRBdFN0YXJ0ID8gICdhZnRlcmJlZ2luJyA6J2JlZm9yZWVuZCcsIHRoaXMuZWxlbWVudCk7XG4gICAgIH1cblxufVxuXG5jbGFzcyBQcm9qZWN0SXRlbSBleHRlbmRzIENvbXBvbmVudDxIVE1MVUxpc3RFbGVtZW50LCBIVE1MTElFbGVtZW50PiBpbXBsZW1lbnRzIERyYWdnYWJsZXtcbiAgICAgcHJpdmF0ZSBwcm9qZWN0OiBQcm9qZWN0O1xuXG4gICAgIGNvbnN0cnVjdG9yKGhvc3RJZDogc3RyaW5nLHByb2plY3Q6IFByb2plY3Qpe1xuICAgICAgICAgIHN1cGVyKCdzaW5nbGUtcHJvamVjdCcsIGhvc3RJZCwgZmFsc2UsIHByb2plY3QuaWQpO1xuICAgICAgICAgIHRoaXMucHJvamVjdCA9IHByb2plY3Q7XG5cbiAgICAgICAgICB0aGlzLmNvbmZpZ3VyZSgpO1xuICAgICAgICAgIHRoaXMucmVuZGVyQ29udGVudCgpO1xuICAgICB9XG5cbiAgICAgZ2V0IG1hbmRheSgpIHtcbiAgICAgICAgICBpZih0aGlzLnByb2plY3QubWFuZGF5IDwgMjApIHtcbiAgICAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLnByb2plY3QubWFuZGF5LnRvU3RyaW5nKCl95Lq65pelYFxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IG1hbm1vbnRoID0gdGhpcy5wcm9qZWN0Lm1hbmRheSAvIDIwO1xuICAgICAgICAgIHJldHVybiBgJHttYW5tb250aC50b1N0cmluZygpfeS6uuaciGA7XG4gICAgIH1cblxuICAgICBAYXV0b2JpbmRcbiAgICAgZHJhZ1N0YXJ0SGFuZGxlcihldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gICAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyIS5zZXREYXRhKCd0ZXh0L3BsYWluJyx0aGlzLnByb2plY3QuaWQpO1xuICAgICAgICAgIGV2ZW50LmRhdGFUcmFuc2ZlciEuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJztcbiAgICAgfVxuXG4gICAgIGRyYWdFbmRIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnRHJhZ+e1guS6hicpXG4gICAgIH1cblxuICAgICBjb25maWd1cmUoKTogdm9pZCB7XG4gICAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIHRoaXMuZHJhZ1N0YXJ0SGFuZGxlcilcbiAgICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIHRoaXMuZHJhZ0VuZEhhbmRsZXIpXG4gICAgIH1cblxuICAgICByZW5kZXJDb250ZW50KCk6IHZvaWQge1xuICAgICAgICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdoMicpIS50ZXh0Q29udGVudCA9IHRoaXMucHJvamVjdC50aXRsZTtcbiAgICAgICAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignaDMnKSEudGV4dENvbnRlbnQgPSB0aGlzLm1hbmRheTtcbiAgICAgICAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcigncCcpIS50ZXh0Q29udGVudCA9IHRoaXMucHJvamVjdC5kZXNjcmlwdGlvbjtcbiAgICAgfVxufVxuXG5jbGFzcyBQcm9qZWN0TGlzdCBleHRlbmRzIENvbXBvbmVudDxIVE1MRGl2RWxlbWVudCwgSFRNTEVsZW1lbnQ+IGltcGxlbWVudHMgRHJhZ1RhcmdldHtcbiAgICAgYXNzaWduZWRQcm9qZWN0OiBQcm9qZWN0W107XG5cbiAgICAgY29uc3RydWN0b3IocHJpdmF0ZSB0eXBlOiAnYWN0aXZlJyB8ICdmaW5pc2hlZCcpe1xuICAgICAgICAgIHN1cGVyKCdwcm9qZWN0LWxpc3QnLCdhcHAnLCBmYWxzZSAsYCR7dHlwZX0tcHJvamVjdHNgKTtcbiAgICAgICAgICB0aGlzLmFzc2lnbmVkUHJvamVjdCA9IFtdO1xuXG4gICAgICAgICAgdGhpcy5jb25maWd1cmUoKTtcbiAgICAgICAgICB0aGlzLnJlbmRlckNvbnRlbnQoKTtcbiAgICAgfVxuXG4gICAgIEBhdXRvYmluZFxuICAgICBkcmFnT3ZlckhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICAgICAgICAgIGlmKGV2ZW50LmRhdGFUcmFuc2ZlciAmJiBldmVudC5kYXRhVHJhbnNmZXIudHlwZXNbMF0gPT09ICd0ZXh0L3BsYWluJyl7XG4gICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgY29uc3QgbGlzdEVsID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJykhO1xuICAgICAgICAgICAgICAgbGlzdEVsLmNsYXNzTGlzdC5hZGQoJ2Ryb3BwYWJsZScpO1xuICAgICAgICAgIH1cbiAgICAgfVxuXG4gICAgIEBhdXRvYmluZFxuICAgICBkcm9wSGFuZGxlcihldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gICAgICAgICAgY29uc3QgcHJqSWQgPSBldmVudC5kYXRhVHJhbnNmZXIhLmdldERhdGEoJ3RleHQvcGxhaW4nKTtcbiAgICAgICAgICBwcm9qZWN0U3RhdGUubW92ZVByb2plY3QocHJqSWQsIHRoaXMudHlwZSA9PT0gJ2FjdGl2ZScgPyBQcm9qZWN0U3RhdHVzLkFjdGl2ZSA6IFByb2plY3RTdGF0dXMuRmluaXNoZWQpO1xuICAgICB9XG5cbiAgICAgQGF1dG9iaW5kXG4gICAgIGRyYWdMZWF2ZUhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICAgICAgICAgIGNvbnN0IGxpc3RFbCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpITtcbiAgICAgICAgICBsaXN0RWwuY2xhc3NMaXN0LnJlbW92ZSgnZHJvcHBhYmxlJyk7XG4gICAgIH1cblxuXG4gICAgIHJlbmRlckNvbnRlbnQoKXtcbiAgICAgICAgICBjb25zdCBsaXN0SWQgPSBgJHt0aGlzLnR5cGV9LXByb2plY3QtbGlzdGA7XG4gICAgICAgICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJykhLmlkID0gbGlzdElkO1xuICAgICAgICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdoMicpIS50ZXh0Q29udGVudCA9IHRoaXMudHlwZSA9PT0gJ2FjdGl2ZScgPyAn5a6f6KGM5Lit44OX44Ot44K444Kn44Kv44OIJyA6ICflrozkuobjg5fjg63jgrjjgqfjgq/jg4gnO1xuICAgICB9XG5cbiAgICAgY29uZmlndXJlKCk6IHZvaWQge1xuICAgICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIHRoaXMuZHJhZ092ZXJIYW5kbGVyKTtcbiAgICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIHRoaXMuZHJvcEhhbmRsZXIpO1xuICAgICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCB0aGlzLmRyYWdMZWF2ZUhhbmRsZXIpO1xuXG5cbiAgICAgICAgICBwcm9qZWN0U3RhdGUuYWRkTGlzdGVuZXIoKHByb2plY3RzOiBQcm9qZWN0W10pID0+IHtcbiAgICAgICAgICAgICAgIGNvbnN0IHJlbGV2YW50UHJvamVjdHMgPSBwcm9qZWN0cy5maWx0ZXIoIHByaiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMudHlwZSA9PT0gJ2FjdGl2ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJqLnN0YXR1cyA9PT0gUHJvamVjdFN0YXR1cy5BY3RpdmU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByai5zdGF0dXMgPT09IFByb2plY3RTdGF0dXMuRmluaXNoZWQ7XG4gICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgdGhpcy5hc3NpZ25lZFByb2plY3QgPSByZWxldmFudFByb2plY3RzO1xuICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJQcm9qZWN0cygpO1xuICAgICAgICAgIH0pXG4gICAgIH1cblxuICAgICBwcml2YXRlIHJlbmRlclByb2plY3RzKCl7XG4gICAgICAgICAgY29uc3QgbGlzdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7dGhpcy50eXBlfS1wcm9qZWN0LWxpc3RgKSBhcyBIVE1MVUxpc3RFbGVtZW50O1xuICAgICAgICAgIGxpc3RFbC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICBmb3IgKGNvbnN0IHByakl0ZW0gb2YgdGhpcy5hc3NpZ25lZFByb2plY3Qpe1xuICAgICAgICAgICAgICAgICAgICBuZXcgUHJvamVjdEl0ZW0obGlzdEVsLmlkLCBwcmpJdGVtKVxuICAgICAgICAgIH1cbiAgICAgfVxufVxuXG5cbmNsYXNzIFByb2plY3RJbnB1dCBleHRlbmRzIENvbXBvbmVudDxIVE1MRGl2RWxlbWVudCwgSFRNTEZvcm1FbGVtZW50PiB7XG4gICAgIHRpdGxlSW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xuICAgICBkZXNjcmlwdGlvbklucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcbiAgICAgbWFuZGF5SW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xuXG4gICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgICAgc3VwZXIoJ3Byb2plY3QtaW5wdXQnLCAnYXBwJywgdHJ1ZSwgJ3VzZXItaW5wdXQnKVxuICAgICAgICAgIC8vIOODleOCqeODvOODoOOBruihqOekuuOCkuihjOOBhlxuICAgICAgICAgIHRoaXMudGl0bGVJbnB1dEVsZW1lbnQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignI3RpdGxlJykgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAgICAgICB0aGlzLmRlc2NyaXB0aW9uSW5wdXRFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXNjcmlwdGlvbicpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgICAgICAgdGhpcy5tYW5kYXlJbnB1dEVsZW1lbnQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignI21hbmRheScpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgICAgICAgICB0aGlzLmNvbmZpZ3VyZSgpO1xuICAgICB9XG5cbiAgICAgcHJpdmF0ZSBnYXRoZXJVc2VySW5wdXQoKTogW3N0cmluZywgc3RyaW5nLCBudW1iZXJdIHwgdm9pZCB7XG4gICAgICAgICAgY29uc3QgZW50ZXJlZFRpdGxlID0gdGhpcy50aXRsZUlucHV0RWxlbWVudC52YWx1ZTtcbiAgICAgICAgICBjb25zdCBlbnRlcmVkRGVzY3JpcHRpb24gPSB0aGlzLmRlc2NyaXB0aW9uSW5wdXRFbGVtZW50LnZhbHVlO1xuICAgICAgICAgIGNvbnN0IGVudGVyZWRNYW5kYXkgPSB0aGlzLm1hbmRheUlucHV0RWxlbWVudC52YWx1ZTtcblxuICAgICAgICAgIGNvbnN0IHRpdGxlVmFsaWRhdGFibGU6VmFsaWRhdGFibGUgPSB7XG4gICAgICAgICAgICAgICB2YWx1ZTogZW50ZXJlZFRpdGxlLCByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgZGVzcmlwdGlvblZhbGlkYXRhYmxlOlZhbGlkYXRhYmxlID0ge1xuICAgICAgICAgICAgICAgdmFsdWU6IGVudGVyZWREZXNjcmlwdGlvbiwgcmVxdWlyZWQ6IHRydWUsIG1pbkxlbmd0aDo1XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IG1hbmRheVZhbGlkYXRhYmxlOlZhbGlkYXRhYmxlID0ge1xuICAgICAgICAgICAgICAgdmFsdWU6ICtlbnRlcmVkTWFuZGF5LCByZXF1aXJlZDogdHJ1ZSwgbWluOiAwLCBtYXg6IDEwMDBcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAhdmFsaWRhdGUodGl0bGVWYWxpZGF0YWJsZSkgfHxcbiAgICAgICAgICAgICAgICF2YWxpZGF0ZShkZXNyaXB0aW9uVmFsaWRhdGFibGUpIHx8XG4gICAgICAgICAgICAgICAhdmFsaWRhdGUobWFuZGF5VmFsaWRhdGFibGUpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICBhbGVydCgn5YWl5Yqb5YCk44GM5q2j44GX44GP44GC44KK44G+44Gb44KT44CC5YaN5bqm44GK6Kmm44GX44GP44Gg44GV44GE44CCJyk7XG4gICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgIHJldHVybiBbZW50ZXJlZFRpdGxlLCBlbnRlcmVkRGVzY3JpcHRpb24sICtlbnRlcmVkTWFuZGF5XTtcbiAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcHJpdmF0ZSBjbGVhcklucHV0cygpIHtcbiAgICAgICAgICB0aGlzLnRpdGxlSW5wdXRFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgICAgdGhpcy5kZXNjcmlwdGlvbklucHV0RWxlbWVudC52YWx1ZSA9ICcnO1xuICAgICAgICAgIHRoaXMubWFuZGF5SW5wdXRFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgQGF1dG9iaW5kXG4gICAgICAgICAgcHJpdmF0ZSBzdWJtaXRIYW5kbGVyKGV2ZW50OiBFdmVudCkge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgY29uc3QgdXNlcklucHV0ID0gdGhpcy5nYXRoZXJVc2VySW5wdXQoKTtcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh1c2VySW5wdXQpKSB7XG4gICAgICAgICAgICAgICBjb25zdCBbdGl0bGUsIGRlc2MsIG1hbmRheV0gPSB1c2VySW5wdXQ7XG4gICAgICAgICAgICAgICBwcm9qZWN0U3RhdGUuYWRkUHJvamVjdCh0aXRsZSwgZGVzYywgbWFuZGF5KVxuICAgICAgICAgIC8vICAgY29uc29sZS5sb2codGl0bGUsIGRlc2MsIG1hbmRheSk7XG4gICAgICAgICAgICAgICB0aGlzLmNsZWFySW5wdXRzKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICBAYXV0b2JpbmRcbiAgICAgY29uZmlndXJlKCl7XG4gICAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuc3VibWl0SGFuZGxlcilcbiAgICAgfVxuXG4gICAgIHJlbmRlckNvbnRlbnQoKTogdm9pZCB7XG5cbiAgICAgfVxufVxuXG5uZXcgUHJvamVjdElucHV0KCk7XG5uZXcgUHJvamVjdExpc3QoJ2FjdGl2ZScpO1xubmV3IFByb2plY3RMaXN0KCdmaW5pc2hlZCcpO1xuIl0sIm5hbWVzIjpbImF1dG9iaW5kIiwidGFyZ2V0IiwibWV0aG9kTmFtZSIsImRlc3JpcHRvciIsIm9yaWdpbmFsTWV0aG9kIiwidmFsdWUiLCJjb25maWd1cmFibGUiLCJnZXQiLCJiaW5kIiwidGhpcyIsIlByb2plY3RTdGF0dXMiLCJQcm9qZWN0IiwiY29uc3RydWN0b3IiLCJpZCIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJtYW5kYXkiLCJzdGF0dXMiLCJTdGF0ZSIsImxpc3RlbmVycyIsImFkZExpc3RlbmVyIiwibGlzdGVuZXJGbiIsInB1c2giLCJQcm9qZWN0U3RhdGUiLCJzdXBlciIsInByb2plY3RzIiwiZ2V0SW5zdGFuY2UiLCJpbnN0YW5jZSIsImFkZFByb2plY3QiLCJuZXdQcm9qZWN0IiwiTWF0aCIsInJhbmRvbSIsInRvU3RyaW5nIiwiQWN0aXZlIiwidXBkYXRlTGlzdGVuZXJzIiwibW92ZVByb2plY3QiLCJwcm9qZWN0SWQiLCJuZXdTdGF0dXMiLCJwcm9qZWN0IiwiZmluZCIsInByaiIsInNsaWNlIiwicHJvamVjdFN0YXRlIiwidmFsaWRhdGUiLCJ2YWxpZGF0YWJsZUlucHV0IiwiaXNWYWxpZCIsInJlcXVpcmVkIiwidHJpbSIsImxlbmd0aCIsIm1pbkxlbmd0aCIsIm1heExlbmd0aCIsIm1pbiIsIm1heCIsIkNvbXBvbmVudCIsInRlbXBsYXRlSWQiLCJob3N0RWxlbWVudElkIiwiaW5zZXJ0QXRTdGFydCIsIm5ld0VsZW1lbnRJZCIsInRlbXBsYXRlRWxlbWVudCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJob3N0RWxlbWVudCIsImltcG9ydGVkTm9kZSIsImltcG9ydE5vZGUiLCJjb250ZW50IiwiZWxlbWVudCIsImZpcnN0RWxlbWVudENoaWxkIiwiYXR0YWNoIiwiaW5zZXJ0QWRqYWNlbnRFbGVtZW50IiwiUHJvamVjdEl0ZW0iLCJob3N0SWQiLCJjb25maWd1cmUiLCJyZW5kZXJDb250ZW50IiwiZHJhZ1N0YXJ0SGFuZGxlciIsImV2ZW50IiwiZGF0YVRyYW5zZmVyIiwic2V0RGF0YSIsImVmZmVjdEFsbG93ZWQiLCJkcmFnRW5kSGFuZGxlciIsImNvbnNvbGUiLCJsb2ciLCJhZGRFdmVudExpc3RlbmVyIiwicXVlcnlTZWxlY3RvciIsInRleHRDb250ZW50IiwiUHJvamVjdExpc3QiLCJ0eXBlIiwiYXNzaWduZWRQcm9qZWN0IiwiZHJhZ092ZXJIYW5kbGVyIiwidHlwZXMiLCJwcmV2ZW50RGVmYXVsdCIsImNsYXNzTGlzdCIsImFkZCIsImRyb3BIYW5kbGVyIiwicHJqSWQiLCJnZXREYXRhIiwiRmluaXNoZWQiLCJkcmFnTGVhdmVIYW5kbGVyIiwicmVtb3ZlIiwibGlzdElkIiwicmVsZXZhbnRQcm9qZWN0cyIsImZpbHRlciIsInJlbmRlclByb2plY3RzIiwibGlzdEVsIiwiaW5uZXJIVE1MIiwicHJqSXRlbSIsIlByb2plY3RJbnB1dCIsInRpdGxlSW5wdXRFbGVtZW50IiwiZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQiLCJtYW5kYXlJbnB1dEVsZW1lbnQiLCJnYXRoZXJVc2VySW5wdXQiLCJlbnRlcmVkVGl0bGUiLCJlbnRlcmVkRGVzY3JpcHRpb24iLCJlbnRlcmVkTWFuZGF5IiwiZGVzcmlwdGlvblZhbGlkYXRhYmxlIiwibWFuZGF5VmFsaWRhdGFibGUiLCJhbGVydCIsImNsZWFySW5wdXRzIiwic3VibWl0SGFuZGxlciIsInVzZXJJbnB1dCIsIkFycmF5IiwiaXNBcnJheSIsImRlc2MiXSwic291cmNlUm9vdCI6IiJ9