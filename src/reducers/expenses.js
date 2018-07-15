const expensesDefault =[];

export default (state = expensesDefault, action) => {
    switch (action.type) {
        case 'ADD-EXPENSE':
            console.log('add expense called')
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