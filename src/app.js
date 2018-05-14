import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import "normalize.css/normalize.css"
import './styles/style.scss';

const ExpenseDashboardPage = () => (
    <div>
        this page is from expense dash board
    </div>
);

const AddExpensePage = () => (
    <div>
        this is a add expense page
    </div>
);

const EditExpensePage = () => (
    <div>
        this is edit page
    </div>
);

const HelpPage = () => (
    <div>
        This is help page
    </div>
);

const NotFoundPage = () => (
    <div>
        404!
    </div>
);


const routes = (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={ExpenseDashboardPage} exact={true}/>
            <Route path="/create" component={AddExpensePage}/>
            <Route path="/edit" component={EditExpensePage}/>
            <Route path="/help" component={HelpPage}/>
            <Route component={NotFoundPage}/>
        </Switch>

    </BrowserRouter>
)

ReactDOM.render(routes, document.getElementById('app'));