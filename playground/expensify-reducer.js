import {createStore, combineReducers} from "redux"
import uuid from "uuid";
const demoState ={
    expenses : [{
        id: 'adsf',
        amount: 23,
        note: 'any thing',
        description: 'description',
        createAt:0
    }],
    filters: {
        text:'',
        sortBy: 'amount' ,// amount or date
        startDate: undefined,
        enddate:undefined
    }
};

const expensesDefault =[];

const expensesReducer = (state = expensesDefault, action) => {
    switch (action.type) {
        case 'ADD-EXPENSE':
            return [...state, action.expense]
        case 'DELETE-EXPENSE':
            return state.filter(({id}) => id!==action.id);
        case 'EDIT-EXPENSE':
            return state.map((expense) => {
                    if (expense.id === action.id) {
                        return {
                            ...expense,
                            ...action.updates
                        };
                    } else {
                        return expense;
                    };
                }
            )
        default:
            return state;
    }
}

// ADD-EXPENSE
const addExpense = (
    {
        id = uuid(),
        description = '',
        note = '',
        amount =0,
        createdAt = 0
    } = {}
    ) => ({
        type: 'ADD-EXPENSE',
        expense: {
            id,
            description,
            note,
            amount,
            createdAt
        }
    });

// DELETE-EXPENSE
const deleteExpense = (
    {
        id = ''
    } = {}) => ({
    type: 'DELETE-EXPENSE',
    id
})

// EDIT-EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT-EXPENSE',
    id,
    updates
})

// SET_TEXT_FILTER
const setTextFilter = (textFilter = '') => ({
    type: 'SET_TEXT_FILTER',
    text: textFilter
});

// SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
})

// SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
})

// SET_START_DATE
const setStartDate = (startDate = undefined) => ({
    type: 'SET_START_DATE',
    startDate,

})

// SET_END_DATE
const setEndDate = (endDate = undefined) => ({
    type: 'SET_END_DATE',
    endDate,
})

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch   = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = text === '' || expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1: -1;
        } else if(sortBy === 'amount') {
            return a.amount < b.amount ? -1: 1;
        } else {
            return 0;
        }
    })

}


const filterDefault = {
    sortBy:'date',
    text: '',
    startDate:undefined,
    endDate: undefined
}
const filterReducer = (state = filterDefault, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            };
        default:
            return state;
    }
}

const store = createStore(combineReducers({
    expenses:expensesReducer,
    filters: filterReducer
}));

store.subscribe(()=>{
    const state = store.getState();
    const visibleExpenses =  getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
})

const expenseOne = store.dispatch(addExpense({amount: 300, description: 'Rent Charges', createdAt: -1000}))
const expenseTwo = store.dispatch(addExpense({amount: 900, description: 'Fuel charges',  createdAt: 1000}))
//
// store.dispatch(deleteExpense({id:store.getState().expenses[0].id}));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 200 }));
//
// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());
//
 store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

//store.dispatch(setStartDate(-1125))
store.dispatch(setTextFilter('charges'))

// store.dispatch(setStartDate(120))
// store.dispatch(setEndDate())




