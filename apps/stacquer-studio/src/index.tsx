/* @refresh reload */
import { render } from 'solid-js/web'
import {Route, Router} from "@solidjs/router";
import App from './App.tsx'
import {lazy} from "solid-js";

const Home = lazy(() => import("./pages/home/Home"));
const OrganizationList = lazy(() => import("./pages/organizations/OrganizationList"));
const Organization = lazy(() => import("./pages/organizations/Organization.tsx"));

const root = document.getElementById('root')

render(() => (
    <Router root={App}>
        <Route path="/" component={Home} />
        <Route path="/organizations">
            <Route path="/" component={OrganizationList} />
            <Route path="/:orgId" component={Organization} />
        </Route>
    </Router>
), root!)


