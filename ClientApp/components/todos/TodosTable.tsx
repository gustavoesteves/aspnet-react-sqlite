import * as React from "react";

import { ITodo, ITodos, orderBy, priorityTask } from "./TodosProps";

interface ITodosTalbeProps {
    todos: ITodo[];
    handleEditTable: (_id: number) => ITodo[];
    handleActive: (_id: number) => void;
    handleChangeLine: (_id: number, _text: string, key: string) => void;
}

interface ITodosTalbeState {
    idEdit: number;
    textEdit: string;
}

export class TodosTable extends React.Component<ITodosTalbeProps, ITodosTalbeState> {
    constructor(props: ITodosTalbeProps) {
        super(props);
        this.state = { idEdit: -1, textEdit: "" };

        this.printPriority = this.printPriority.bind(this);
        this.printText = this.printText.bind(this);
        this.editText = this.editText.bind(this);
        this.postText = this.postText.bind(this);
        this.onclickEdit = this.onclickEdit.bind(this);
    }
    printText(_todos: ITodo): JSX.Element {
        if (!_todos.active) {
            if (_todos.editing) {
                return <input
                    type="text"
                    className="form-control"
                    placeholder="Enter a new task"
                    value={this.state.textEdit}
                    onChange={(event: React.FormEvent<HTMLInputElement>) => this.editText(event)}
                    onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => this.postText(event)} />;
            } else {
                return <p className="edit-cursor" onClick={() => this.onclickEdit(_todos.id)}>{_todos.text}</p>;
            }
        } else {
            return <p><del>{_todos.text}</del></p>;
        }
    }
    printPriority(_priority: number): JSX.Element {
        switch (_priority) {
            case 1:
                return <h4><span className="badge badge-warning">Attention</span></h4>;
            case 2:
                return <h4><span className="badge badge-success">Relax</span></h4>;
            default:
                return <h4><span className="badge badge-danger">Urgent</span></h4>;
        }
    }
    editText(event: React.FormEvent<HTMLInputElement>): void {
        this.setState({ textEdit: event.currentTarget.value });
    }
    postText(event: React.KeyboardEvent<HTMLInputElement>): void {
        if (event.key === "Enter") {
            this.props.handleChangeLine(this.state.idEdit, this.state.textEdit, "Enter");
        } else if (event.key === "Escape") {
            this.props.handleChangeLine(this.state.idEdit, this.state.textEdit, "Escape");
        }
    }
    onclickEdit(_id: number): void {
        let _result: ITodo[] = this.props.handleEditTable(_id);
        this.setState({ idEdit: _result[0].id, textEdit: _result[0].text });
    }
    public render(): JSX.Element {
        return (
            <tbody>
                {this.props.todos.map(todos =>
                    <tr key={todos.id}>
                        <td>{this.printPriority(todos.priority)}</td>
                        <td>{this.printText(todos)}</td>
                        <td>{todos.date}</td>
                        {todos.active ?
                            <td><button type="submit" className="btn btn-secondary btn-sm"
                                onClick={() => this.props.handleActive(todos.id)}>Active</button></td> :
                            <td><button type="submit" className="btn btn-primary btn-sm"
                                onClick={() => this.props.handleActive(todos.id)}>Done</button></td>}
                    </tr>
                )}
            </tbody>
        );
    }
}