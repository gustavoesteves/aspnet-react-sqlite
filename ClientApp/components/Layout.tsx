import * as React from "react";
import { NavMenuBar } from "./NavMenuBar";
import { NavMenu } from "./NavMenu";

export interface ILayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<ILayoutProps, {}> {
    public render(): JSX.Element {
        return (
            <div>
                <NavMenuBar />
                <div className="container-fluid">
                    <div className="row">
                        <NavMenu />
                        <div className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
