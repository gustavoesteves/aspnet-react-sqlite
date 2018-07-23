import * as React from "react";
import { RouteComponentProps } from "react-router";
import "isomorphic-fetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ITodo, ITodos, orderBy, priorityTask } from "./TodosProps";
import { TodosOrderBy } from "./TodosOrderBy";
import { TodosAdd } from "./TodosAdd";
import { text } from "@fortawesome/fontawesome-svg-core";

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

        this.Get = this.Get.bind(this);
        this.Post = this.Post.bind(this);
        this.PostActive = this.PostActive.bind(this);
        this.PostChangeLine = this.PostChangeLine.bind(this);

        this.new = this.new.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleEscText = this.handleEscText.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleEditTable = this.handleEditTable.bind(this);
        this.handleActive = this.handleActive.bind(this);
        this.handleAngle = this.handleAngle.bind(this);
        this.handleChangeLine = this.handleChangeLine.bind(this);

        this.Get(orderBy.description, false);
    }

    /*****************
   * CRUD Operations
   ****************/

    Get(_orderby: number, _ascend: boolean): void {
        fetch("api/Todo/TodoGet/" + _orderby + "/'" + _ascend)
            .then(response => response.json() as Promise<ITodo[]>)
            .then(data => {
                this.setState({ todos: data, loading: false });
            });
    }
    Post(_priority: priorityTask): void {
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
                this.Get(0, true);
            });
    }
    PostActive(_id: number): void {
        fetch("api/Todo/TodoActive/" + _id, {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            })
        }).then()
            .catch(error => console.error("Error:", error))
            .then(response => {
                console.log("Success:", response);
                this.Get(0, true);
            });
    }
    PostChangeLine(_id: number, _text: string): void {
        fetch("api/Todo/TodoEditText/" + _id + "/" + _text, {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            })
        }).then()
            .catch(error => console.error("Error:", error))
            .then(response => {
                console.log("Success:", response);
                this.Get(this.state.orderBy, this.state.angle);
            });
    }

    /**************
     * Event change
    **************/

    new(): void {
        this.setState({ newTodo: true });
    }
    handleChangeText(value: string): void {
        this.setState({ textAdd: value });
    }
    handleEscText(): void {
        this.setState({ newTodo: false });
    }
    handleRadioChange(priority: priorityTask): void {
        this.Post(priority);
        this.setState({ newTodo: false });
    }
    handleEditTable(_id: number): ITodo[] {
        let _result: ITodo[] = this.state.todos;
        _result.forEach(x => {
            if (x.id === _id) {
                x.editing = true;
            } else { x.editing = false; }
        });
        this.setState({ todos: _result });
        return _result.filter(x => x.id === _id);
    }
    handleActive(_id: number): void {
        let _result: ITodo[] = this.state.todos;
        _result.forEach(x => {
            if (x.id === _id) {
                x.active = !x.active;
            }
        });
        this.setState({ todos: _result });
        this.PostActive(_id);
    }
    handleAngle(_order: orderBy): void {
        let _result: boolean = this.state.angle;
        if (_order !== this.state.orderBy) {
            this.setState({ orderBy: _order, angle: true });
        } else {
            this.setState({ angle: !_result });
        }
        this.Get(_order, this.state.angle);
    }
    handleChangeLine(_id: number, _text: string, key: string): void {
        let _result: ITodo[] = this.state.todos;
        _result.forEach(x => {
            if (x.id === _id) {
                x.editing = false;
            }
        });
        this.setState({ todos: _result });
        if (key === "Enter") { this.PostChangeLine(_id, _text); }
    }

    public render(): JSX.Element {
        let contents: JSX.Element = this.state.loading
            ? <p><em>Loading...</em></p>
            : <TodosOrderBy
                todos={this.state.todos}
                orderBy={this.state.orderBy}
                angle={this.state.angle}
                handleEditTable={this.handleEditTable}
                handleActive={this.handleActive}
                handleAngle={this.handleAngle}
                handleChangeLine={this.handleChangeLine} />;

        let newTodoContent: JSX.Element = this.state.newTodo
            ? <TodosAdd
                handleChangeText={this.handleChangeText}
                handleEscText={this.handleEscText}
                handleRadioChange={this.handleRadioChange} />
            : <div />;

        return (
            <div>
                <h1>Todo List</h1>
                <p>This component demonstrates fetching data from the server with sqlite database.</p>
                {newTodoContent}
                {contents}
                <div className="plus-button">
                    <button
                        type="button"
                        onClick={this.new}
                        className="btn btn-primary btn-circle"><FontAwesomeIcon icon="plus" /></button>
                </div>
            </div>
        );
    }
}