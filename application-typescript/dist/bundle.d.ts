declare module "autobind-decorator" {
    export function autobind(target: any, methodName: string, desriptor: PropertyDescriptor): PropertyDescriptor;
}
declare module "drag-drop-interfaces" {
    export interface Draggable {
        dragStartHandler(event: DragEvent): void;
        dragEndHandler(event: DragEvent): void;
    }
    export interface DragTarget {
        dragOverHandler(event: DragEvent): void;
        dropHandler(event: DragEvent): void;
        dragLeaveHandler(event: DragEvent): void;
    }
}
declare module "project-model" {
    export enum ProjectStatus {
        Active = 0,
        Finished = 1
    }
    export class Project {
        id: string;
        title: string;
        description: string;
        manday: number;
        status: ProjectStatus;
        constructor(id: string, title: string, description: string, manday: number, status: ProjectStatus);
    }
}
declare module "project-state" {
    import { Project, ProjectStatus } from "project-model";
    type Listener<T> = (items: T[]) => void;
    class State<T> {
        protected listeners: Listener<T>[];
        addListener(listenerFn: Listener<T>): void;
    }
    export class ProjectState extends State<Project> {
        private projects;
        private static instance;
        private constructor();
        static getInstance(): ProjectState;
        addProject(title: string, description: string, manday: number): void;
        moveProject(projectId: string, newStatus: ProjectStatus): void;
        private updateListeners;
    }
    export const projectState: ProjectState;
}
declare module "validation" {
    export interface Validatable {
        value: string | number;
        required?: boolean;
        minLength?: number;
        maxLength?: number;
        min?: number;
        max?: number;
    }
    export function validate(validatableInput: Validatable): boolean;
}
declare module "app" { }
