/* @refresh reload */
import { render } from 'solid-js/web'
import {Route, Router} from "@solidjs/router";
import App from './App.tsx'
import {lazy} from "solid-js";

import "./index.css"
import PackagePage from "./pages/structure/PackagePage.tsx";

const HomePage = lazy(() => import("./pages/home/./HomePage"));

const root = document.getElementById('root')

render(() => (
    <Router root={App}>
        <Route path="/" component={HomePage} />
        <Route path="/packages/:id" component={PackagePage} />
    </Router>
), root!)


// <Route path="/organizations">
//     <Route path="/" component={OrganizationList} />
//     <Route path="/:orgId" component={Organization} />
// </Route>


