import * as React from "react";
import { Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { FetchData } from "./components/FetchData";
import { Todos } from "./components/todos/Todos";
import { Counter } from "./components/Counter";

export const routes: JSX.Element = (
    <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/counter" component={Counter} />
        <Route path="/fetchdata" component={FetchData} />
        <Route path="/todo" component={Todos} />
    </Layout>
);
