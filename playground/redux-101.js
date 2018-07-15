import {createStore} from "redux"

const store = createStore((state = {count:0}, action) => {
    switch (action.type) {
        case 'INCREMENT':
            const incrementBy = typeof action.incrementBy === 'number'? action.incrementBy:1
            return {count:state.count+incrementBy}
        case 'DECREMENT':
            const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy:1
            return {count:state.count-decrementBy}
        case 'RESET':
            return {count:0}
        case 'SET':
            const count = typeof action.count === 'number' ? action.count:0
            return {count:count}
        default:
            return state;
    }

    return state;
})

const increment = ({incrementBy = 1} = {}) => ({
    type:'INCREMENT',
    incrementBy
})

const decrement = ({decrementBy = 10} = {}) => ({
    type: 'DECREMENT',
    decrementBy
})

const set = ({count = 0} = {}) => ({
    type: 'SET',
    count
})

const reset = () => ({
    type: 'RESET',
    count:0
});



store.subscribe(() => {
    console.log(store.getState())
})

store.dispatch(increment({incrementBy:10}));

store.dispatch(decrement({decrementBy:1}))
store.dispatch(reset())
store.dispatch(set({count:50}))

