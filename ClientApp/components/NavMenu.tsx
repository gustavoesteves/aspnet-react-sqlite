import * as React from "react";
import { Link, NavLink } from "react-router-dom";

export class NavMenu extends React.Component<{}, {}> {
    public render(): JSX.Element {
        return (
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <NavLink to={"/"} className="nav-link" exact activeClassName="active">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"/counter"} className="nav-link" activeClassName="active">
                                <span className="glyphicon glyphicon-education"></span>
                                Counter
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"/fetchdata"} className="nav-link" activeClassName="active">
                                <span className="glyphicon glyphicon-th-list"></span> Fetch data
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"/todo"} className="nav-link" activeClassName="active">
                                <span className="glyphicon glyphicon-ok"></span> Todo
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
