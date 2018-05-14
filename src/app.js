import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route} from "react-router-dom";
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


const routes = (
    <BrowserRouter>
        <div>
            <Route path="/" component={ExpenseDashboardPage} exact={true}/>
            <Route path="/create" component={AddExpensePage}/>
            <Route path="/edit" component={EditExpensePage}/>
            <Route path="/help" component={HelpPage}/>
        </div>

    </BrowserRouter>
)

ReactDOM.render(routes, document.getElementById('app'));