import React, { Component } from "react";
import { connect } from 'react-redux';
import { sortByDate, sortByAmount, setTextFilter, setStartDate, setEndDate } from "../actions/filters";
import { DateRangePicker } from 'react-dates';

class ExpenseListFilter extends Component {
    state = {
        focused:null
    }

    onDatesChange = ({ startDate, endDate }) => {
        this.props.dispatch(setEndDate(endDate));
        this.props.dispatch(setStartDate(startDate));
    }

    onFocusChange = (focused) => {
    this.setState({focused})
    }

    render() {
        const { focused } = this.state;
        const { dispatch } = this.props;
        const { text, startDate, endDate, sortBy } = this.props.filters;
        return (
            <div>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => {
                        dispatch(setTextFilter(e.target.value))
                    }}
                />

                <select
                    value={sortBy}
                    onChange={(e) => {
                        if (e.target.value === 'date') {
                            dispatch(sortByDate(e.target.value))
                        } else {
                            dispatch(sortByAmount(e.target.value))
                        }
                    }
                    }>
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>

                <DateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    focusedInput={focused}
                    onDatesChange={this.onDatesChange}
                    onFocusChange={this.onFocusChange}
                    isOutsideRange={()=>false}
                />

            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    }
}

export default connect(mapStateToProps)(ExpenseListFilter);
