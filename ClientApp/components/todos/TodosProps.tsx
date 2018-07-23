export enum priorityTask {
    urgent,
    attention,
    relax,
    none
}

export enum orderBy {
    description,
    priotity,
    date
}

export interface ITodos {
    todos: ITodo[];
    loading: boolean;
    textAdd: string;
    newTodo: boolean;
    angle: boolean;
    orderBy: orderBy;
}

export interface ITodo {
    id: number;
    text: string;
    date: Date;
    priority: number;
    active: boolean;
    editing: boolean;
}
