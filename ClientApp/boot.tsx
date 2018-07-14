import "./css/site.css";
import "bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { BrowserRouter } from "react-router-dom";
import * as RoutesModule from "./routes";

library.add(faAngleDown, faAngleUp, faCheck, faPlus);

let routes: JSX.Element = RoutesModule.routes;

function renderApp(): void {
    // this code starts up the React app when it runs in a browser. It sets up the routing
    // configuration and injects the app into a DOM element.
    const baseUrl: string = document.getElementsByTagName("base")[0].getAttribute("href")!;
    ReactDOM.render(
        <AppContainer>
            <BrowserRouter children={routes} basename={baseUrl} />
        </AppContainer>,
        document.getElementById("react-app")
    );
}

renderApp();

// allow Hot Module Replacement
if (module.hot) {
    module.hot.accept("./routes", () => {
        routes = require<typeof RoutesModule>("./routes").routes;
        renderApp();
    });
}
