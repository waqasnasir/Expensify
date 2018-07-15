import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';


class AddExpenseForm extends React.Component {

    constructor(props){
        super(props);
        const { expense } = this.props;
        this.state = {
            description: expense ? expense.description : '',
            note: expense ? expense.note : '',
            amount: expense ? expense.amount : 0,
            createdAt: expense ? moment(expense.createdAt) : moment(),
            focused: false,
            error:''
        };
    }


    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(()=>({ description }))
    }

    onNotesChange = (e) => {
        const note = e.target.value;
        this.setState(()=>({note:note}))
    }

    onAmountChange = (e) => {
        const amount = e.target.value;
        if(!amount || amount.match(/^\d+(\.\d{0,2})?$/))
            this.setState(()=>({amount:amount}))
    }
    onCreatedAtChange = ( date ) => {
        this.setState(()=>({ createdAt: date }));
    }
    onFocusChange = ({ focused }) => {
        this.setState(()=>({ focused }))
    };
    onSubmitHandler = (e) => {
        e.preventDefault();
        let error = "";
        if(!this.state.amount || !this.state.description) {
            error = "Please provide amount and description";
            this.setState(()=>({error}))
        } else {
            this.setState(()=>({error}))

            const {description, note, createdAt, amount}=this.state;
            this.props.onSubmit({
                description,
                note,
                createdAt:createdAt.valueOf(),
                amount: parseFloat(amount,10)*100
            })
        }

    }

    render() {
        const { description, note, amount, createdAt, focused, error } = this.state;
        return (
            <div>
                {error ? <p>{error}</p>:null}
                <form onSubmit={this.onSubmitHandler}>
                    <input
                        type="text"
                        placeholder={"description here"}
                        value={description}
                        onChange={this.onDescriptionChange} />
                    <input
                        type="text"
                        placeholder={"amount"}
                        value={amount}
                        onChange={this.onAmountChange} />
                    <SingleDatePicker
                        onDateChange={this.onCreatedAtChange} // PropTypes.func.isRequired
                        focused={focused} // PropTypes.bool
                        onFocusChange={this.onFocusChange} // PropTypes.func.isRequired
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                        date={createdAt}/>
                    <textarea
                        cols="30"
                        value={note}
                        onChange={this.onNotesChange}
                        rows="10" />
                    <button >Add Expense</button>
                </form>

            </div>
        )
    }
}


export default AddExpenseForm;