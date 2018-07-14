import * as React from "react";
import { RouteComponentProps } from "react-router";
import "isomorphic-fetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

enum priorityTask {
    urgent,
    attention,
    relax,
    none
}

enum orderBy {
    description,
    priotity,
    date
}

interface ITodos {
    todos: ITodo[];
    loading: boolean;
    textAdd: string;
    newTodo: boolean;
    angle: boolean;
    orderBy: orderBy;
}

interface ITodo {
    id: number;
    text: string;
    date: Date;
    priority: number;
    active: boolean;
}

export class Todos extends React.Component<RouteComponentProps<{}>, ITodos> {
    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = {
            todos: [],
            loading: true,
            textAdd: "",
            newTodo: false,
            angle: true,
            orderBy: orderBy.description
        };

        this.todoGet = this.todoGet.bind(this);
        this.todoPostAdd = this.todoPostAdd.bind(this);
        this.activeDone = this.activeDone.bind(this);

        this.textAddChange = this.textAddChange.bind(this);
        this.todoEnter = this.todoEnter.bind(this);
        this.new = this.new.bind(this);
        this.editText = this.editText.bind(this);
        this.radioChange = this.radioChange.bind(this);
        this.orderBy = this.orderBy.bind(this);

        this.todoGet(orderBy.description, false);
    }

    todoGet(_orderby: number, _ascend: boolean): void {
        fetch("api/Todo/TodoGet/" + _orderby + "/'" + _ascend)
            .then(response => response.json() as Promise<ITodo[]>)
            .then(data => {
                this.setState({ todos: data, loading: false });
            });
    }

    todoPostAdd(_priority: priorityTask): void {
        fetch("api/Todo/TodoAdd", {
            method: "POST",
            body: JSON.stringify({
                text: this.state.textAdd,
                priority: _priority
            }),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        }).then()
            .catch(error => console.error("Error:", error))
            .then(response => {
                console.log("Success:", response);
                this.todoGet(0, true);
            });
    }

    activeDone(_id: number, _active: boolean): void {
        fetch("api/Todo/TodoActive/" + _id + "/" + _active, {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            })
        }).then()
            .catch(error => console.error("Error:", error))
            .then(response => {
                console.log("Success:", response);
                this.todoGet(0, true);
            });
    }

    textAddChange(event: React.FormEvent<HTMLInputElement>): void {
        this.setState({ textAdd: event.currentTarget.value });
    }

    todoEnter(event: React.KeyboardEvent<HTMLInputElement>): void {
        if (event.key === "Escape") {
            this.setState({ newTodo: false });
        }
    }

    new(): void {
        this.setState({ newTodo: true });
    }

    radioChange(_priority: priorityTask): void {
        this.todoPostAdd(_priority);
        this.setState({ newTodo: false });
    }

    editText(_id: number): void {
        console.log("funfou " + _id);
    }

    orderBy(_orderby: number): void {
        this.setState({ orderBy: _orderby });
        this.todoGet(_orderby, false);
    }

    public render(): JSX.Element {
        let contents: JSX.Element = this.state.loading
            ? <p><em>Loading...</em></p>
            : Todos.renderTodosTable(this.state.todos);

        let newTodoContent: JSX.Element = this.state.newTodo
            ? (
                <div className="form-row add-todo">
                    <div className="col-9">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter a new task"
                            onChange={(event: React.FormEvent<HTMLInputElement>) => this.textAddChange(event)}
                            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => this.todoEnter(event)} />
                    </div>
                    <div
                        className="col-3 btn-group btn-group-sm"
                        role="group">
                        <button type="button" className="btn btn-danger"
                            onClick={() => this.radioChange(priorityTask.urgent)}>Urgent</button>
                        <button type="button" className="btn btn-warning"
                            onClick={() => this.radioChange(priorityTask.attention)}>Attention</button>
                        <button type="button" className="btn btn-success"
                            onClick={() => this.radioChange(priorityTask.relax)}>Relax</button>
                        <button type="button" className="btn btn-light"
                            onClick={() => this.radioChange(priorityTask.none)}>None</button>
                    </div>
                </div>
            )
            : <div></div>;

        return (
            <div>
                <h1>Todo List</h1>
                <p>This component demonstrates fetching data from the server with sqlite database.</p>
                {newTodoContent}
                <table className="table">
                    <thead>
                        <tr>
                            <th className="">
                                <button type="submit" className={Todos.orderByCSSButton(orderBy.priotity)}
                                    onClick={() => Todos.prototype.orderBy(orderBy.priotity)}>Priority</button></th>
                            <th className="col-9">
                                <button type="submit" className={Todos.orderByCSSButton(orderBy.description)}
                                    onClick={() => Todos.prototype.orderBy(orderBy.description)}>Description</button></th>
                            <th className="">
                                <button type="submit" className={Todos.orderByCSSButton(orderBy.date)}
                                    onClick={() => Todos.prototype.orderBy(orderBy.date)}>Date</button></th>
                            <th className=""></th>
                        </tr>
                    </thead>
                    {contents}
                </table>
                <div className="plus-button">
                    <button
                        type="button"
                        onClick={this.new}
                        className="btn btn-primary btn-circle"><FontAwesomeIcon icon="plus" /></button>
                </div>
            </div>
        );
    }

    private static printText(_todos: ITodo): JSX.Element {
        return (
            _todos.active ?
                <p><del>{_todos.text}</del></p> :
                <p onClick={() => Todos.prototype.editText(_todos.id)}>{_todos.text}</p>
        );
    }

    private static printPriority(_priority: number): JSX.Element {
        switch (_priority) {
            case 1:
                return <h4><span className="badge badge-warning">Attention</span></h4>;
                break;
            case 2:
                return <h4><span className="badge badge-success">Relax</span></h4>;
                break;
            default:
                return <h4><span className="badge badge-danger">Urgent</span></h4>;
                break;
        }
    }

    private static angleOrder(_angle: boolean): void {
        console.log("passou angle");
        /*return (
            _angle ?
                <FontAwesomeIcon icon="angle-down" /> :
                <FontAwesomeIcon icon="angle-up" />
        );*/
    }

    private static orderByCSSButton(_orderBy: orderBy): string {
        // return Todos.prototype.state.orderBy === _orderBy ? "btn btn-outline-primary btn-sm" : "btn btn-light btn-sm";
        return "btn btn-light btn-sm";
    }

    private static renderTodosTable(todos: ITodo[]): JSX.Element {
        return (
            <tbody>
                {todos.map(todos =>
                    <tr key={todos.id}>
                        <td>{Todos.printPriority(todos.priority)}</td>
                        <td>{Todos.printText(todos)}</td>
                        <td>{todos.date}</td>
                        {todos.active ?
                            <td><button type="submit" className="btn btn-secondary btn-sm"
                                onClick={() => Todos.prototype.activeDone(todos.id, todos.active)}>Active</button></td> :
                            <td><button type="submit" className="btn btn-primary btn-sm"
                                onClick={() => Todos.prototype.activeDone(todos.id, todos.active)}>Done</button></td>}
                    </tr>
                )}
            </tbody>
        );
    }
}