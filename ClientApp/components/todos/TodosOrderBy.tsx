import * as React from "react";

import { ITodo, ITodos, orderBy, priorityTask } from "./TodosProps";
import { TodosTable } from "./TodosTable";
import { TodosAngleOrder } from "./TodosAngleOrder";

interface ITodosOrderBy {
    todos: ITodo[];
    orderBy: orderBy;
    angle: boolean;
    handleEditTable: (_id: number) => ITodo[];
    handleActive: (_id: number) => void;
    handleAngle: (_order: orderBy) => void;
    handleChangeLine: (_id: number, _text: string, key: string) => void;
}

export class TodosOrderBy extends React.Component<ITodosOrderBy> {
    constructor(props: ITodosOrderBy) {
        super(props);

        this.cssOrderBy = this.cssOrderBy.bind(this);
    }
    cssOrderBy(_orderBy: orderBy): string {
        return this.props.orderBy === _orderBy ? "btn btn-outline-primary btn-sm" : "btn btn-light btn-sm";
    }
    public render(): JSX.Element {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th className="">
                            <button type="submit" className={this.cssOrderBy(orderBy.priotity)}
                                onClick={() => this.props.handleAngle(orderBy.priotity)}>Priority
                                <TodosAngleOrder
                                    orderBy={this.props.orderBy}
                                    orderByButton={orderBy.priotity}
                                    angle={this.props.angle} />
                            </button>
                        </th>
                        <th className="col-9">
                            <button type="submit" className={this.cssOrderBy(orderBy.description)}
                                onClick={() => this.props.handleAngle(orderBy.description)}>Description
                                <TodosAngleOrder
                                    orderBy={this.props.orderBy}
                                    orderByButton={orderBy.description}
                                    angle={this.props.angle} />
                            </button>
                        </th>
                        <th className="">
                            <button type="submit" className={this.cssOrderBy(orderBy.date)}
                                onClick={() => this.props.handleAngle(orderBy.date)}>Date
                                <TodosAngleOrder
                                    orderBy={this.props.orderBy}
                                    orderByButton={orderBy.date}
                                    angle={this.props.angle} />
                            </button>
                        </th>
                        <th className=""></th>
                    </tr>
                </thead>
                <TodosTable
                    todos={this.props.todos}
                    handleEditTable={this.props.handleEditTable}
                    handleActive={this.props.handleActive}
                    handleChangeLine={this.props.handleChangeLine} />
            </table>
        );
    }
}