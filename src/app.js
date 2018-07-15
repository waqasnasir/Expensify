import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import {addExpense} from "./actions/expenses";
import {setTextFilter} from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses"

import "normalize.css/normalize.css"
import './styles/style.scss';
import AppRouter from "./routers/AppRouter"

const store = configureStore();

const expenseOne = store.dispatch(addExpense({amount: 100, description: 'Rent Bill', createdAt: 1000}))
const expensetwo = store.dispatch(addExpense({amount: 300, description: 'water Bill', createdAt: 2000}))

store.dispatch(setTextFilter('water'));
store.subscribe((state)=>console.log(state));
const state= store.getState();
console.log(getVisibleExpenses(state.expenses, state.filters));
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
    );


ReactDOM.render(jsx, document.getElementById('app'));