import React from 'react';
import AddExpenseForm from './AddExpenseForm'
import { addExpense } from '../actions/expenses'
import { connect } from 'react-redux';

const AddExpensePage = (props) => (
    <div>
        <AddExpenseForm
        onSubmit={(expense) => {
            console.log(expense);
            props.dispatch(addExpense(expense));
            props.history.push('/');
        }}
        />
    </div>
);

export default connect()(AddExpensePage);