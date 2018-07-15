import React from "react";
import  ExpenseList  from "./ExpenseList";
import ExpenseListFilter from './ExpenseListFilter';
const ExpenseDashboardPage = () => (
    <div>
        <ExpenseListFilter/>
        this page is from expense dash board
        <ExpenseList/>
    </div>
);
export default ExpenseDashboardPage