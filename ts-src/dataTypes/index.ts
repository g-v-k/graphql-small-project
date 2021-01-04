

export interface Task {
    id: string;
    name: string;
    completed: boolean;
    userId: string;
    [name: string]: any;
}

export interface User {
    id:string;
    email:string;
    password:string;
    tasks:Array<Task>

}
