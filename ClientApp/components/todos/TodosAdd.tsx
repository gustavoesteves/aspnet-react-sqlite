import * as React from "react";

import { ITodo, ITodos, orderBy, priorityTask } from "./TodosProps";

interface ITodoAdd {
    handleChangeText: (value: string) => void;
    handleEscText: () => void;
    handleRadioChange: (priority: priorityTask) => void;
}

export class TodosAdd extends React.Component<ITodoAdd> {
    constructor(props: ITodoAdd) {
        super(props);

        this.changeText = this.changeText.bind(this);
        this.escText = this.escText.bind(this);
    }
    changeText(event: React.FormEvent<HTMLInputElement>): void {
        this.props.handleChangeText(event.currentTarget.value);
    }
    escText(event: React.KeyboardEvent<HTMLInputElement>): void {
        // "Escape"
        if (event.keyCode === 27) {
            this.props.handleEscText();
        }
    }
    public render(): JSX.Element {
        return (
            <div className="form-row add-todo">
                <div className="col-9">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter a new task"
                        onChange={(event: React.FormEvent<HTMLInputElement>) => this.changeText(event)}
                        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => this.escText(event)} />
                </div>
                <div
                    className="col-3 btn-group btn-group-sm"
                    role="group">
                    <button type="button" className="btn btn-danger"
                        onClick={() => this.props.handleRadioChange(priorityTask.urgent)}>Urgent</button>
                    <button type="button" className="btn btn-warning"
                        onClick={() => this.props.handleRadioChange(priorityTask.attention)}>Attention</button>
                    <button type="button" className="btn btn-success"
                        onClick={() => this.props.handleRadioChange(priorityTask.relax)}>Relax</button>
                    <button type="button" className="btn btn-light"
                        onClick={() => this.props.handleRadioChange(priorityTask.none)}>None</button>
                </div>
            </div>
        );
    }
}