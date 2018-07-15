import React from "react";
import AddExpenseForm from './AddExpenseForm';
import { connect } from 'react-redux';
import { editExpense, deleteExpense } from '../actions/expenses';

const EditExpensePage = (props) => {
    const { dispatch, history } = props;
    return (
        <div>
            <AddExpenseForm
                expense={props.expense}
                onSubmit={(expense)=> {
                    console.log(expense);
                    dispatch(editExpense(props.expense.id, expense))
                }}
            />
            <button
            onClick={() => {
            dispatch(deleteExpense(props.match.params.id));
            history.push('/')
            }}
        >
            Remove
        </button>
        </div>
    )
};
const mapStateToProps = (state, props) => {
    return {
        expense:state.expenses.find((expense) => expense.id=== props.match.params.id)
    }
}

export default connect(mapStateToProps)(EditExpensePage);