import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ITodo, ITodos, orderBy, priorityTask } from "./TodosProps";

interface ITodosAngleOrderProps {
    orderBy: orderBy;
    orderByButton: orderBy;
    angle: boolean;
}

export class TodosAngleOrder extends React.Component<ITodosAngleOrderProps> {
    constructor(props: ITodosAngleOrderProps) {
        super(props);
    }
    public render(): JSX.Element {
        if (this.props.orderBy === this.props.orderByButton) {
            return this.props.angle ? <FontAwesomeIcon icon="angle-down" /> : <FontAwesomeIcon icon="angle-up" />;
        } else {
            return <div></div>;
        }
    }
}