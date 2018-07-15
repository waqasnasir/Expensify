import React from "react";
import ExpenseListItem from './ExpenseListItem';
import selecters from '../selectors/expenses';
import { connect } from "react-redux";

const ExpenseList = (props) => (
    <div>
        This is Expense List
        {
            props.expenses.map(
                (expense) => (<ExpenseListItem key={expense.id} {...expense}/>)
            )
        }

    </div>
)

const mapStateToProps = (state) => {
    return {
        expenses: selecters(state.expenses, state.filters)
    }
}

export default connect(mapStateToProps)(ExpenseList);
