import uuid from "uuid";

// ADD-EXPENSE
export const addExpense = (
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
export const deleteExpense = (id ='') => ({
    type: 'DELETE-EXPENSE',
    id
})

// EDIT-EXPENSE
export const editExpense = (id, updates) => ({
    type: 'EDIT-EXPENSE',
    id,
    updates
})
