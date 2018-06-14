import * as React from "react";
import { RouteComponentProps } from "react-router";
import "isomorphic-fetch";

interface ITodos {
    todos: ITodo[];
    loading: boolean;
}

interface ITodo {
    id: number;
    text: string;
}

export class Todos extends React.Component<RouteComponentProps<{}>, ITodos> {
    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = { todos: [], loading: true };

        fetch("api/Todo/TodoGet")
            .then(response => response.json() as Promise<ITodo[]>)
            .then(data => {
                this.setState({ todos: data, loading: false });
            });
    }

    public render(): JSX.Element {
        let contents: JSX.Element = this.state.loading
            ? <p><em>Loading...</em></p>
            : Todos.renderTodosTable(this.state.todos);

        return <div>
            <h1>Todo List</h1>
            <p>This component demonstrates fetching data from the server with a sqlite database.</p>
            {contents}
        </div>;
    }

    private static renderTodosTable(todos: ITodo[]): JSX.Element {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Todo</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todos =>
                        <tr key={todos.id}>
                            <td>{todos.text}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}


