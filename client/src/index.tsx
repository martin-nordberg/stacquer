/* @refresh reload */
import { render } from 'solid-js/web'
import {Route, Router} from "@solidjs/router";
import App from './App.tsx'
import {lazy} from "solid-js";

const Home = lazy(() => import("./pages/home/./HomePage"));

const root = document.getElementById('root')

render(() => (
    <Router root={App}>
        <Route path="/" component={Home} />
    </Router>
), root!)


// <Route path="/organizations">
//     <Route path="/" component={OrganizationList} />
//     <Route path="/:orgId" component={Organization} />
// </Route>


