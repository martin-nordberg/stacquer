/* @refresh reload */
import {render} from 'solid-js/web'
import {Route, Router} from "@solidjs/router";
import App from './App.tsx'
import {lazy} from "solid-js";

import "./index.css"

const RootPackagePage = lazy(() => import("./pages/structure/RootPackagePage"));
const PackagePage = lazy(() => import("./pages/structure/PackagePage"));

const root = document.getElementById('root')

render(() => (
    <Router root={App}>
        <Route path="/" component={RootPackagePage}/>
        <Route path="/packages/:id" component={PackagePage}/>
    </Router>
), root!)

