import React, { useContext, useState } from 'react'
import {v4 as uuidV4} from 'uuid'
import useLocalStorage from '../hooks/useLocalStorage'

const BudgetsContext = React.createContext()
export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export function useBudgets() {
    return useContext(BudgetsContext)
}

// Budgets
// {
//     id:
//     name:
//     max:
// }

// Expenses
// {
//     id:
//     budgetId:
//     amount:
//     description:
// }

//create budget context so that these props can be accessed by any
//children in the code, this provider is used to wrap the app
export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useLocalStorage("budgets", [])
    const [expenses, setExpenses] = useLocalStorage("expenses", [])

    function getBudgetExpenses(budgetId) {
        return expenses.filter(expenses => expenses.budgetId === budgetId)
    }

    function addExpense({ budgetId, amount, description }) {
        setExpenses(prevExpenses => {
            //taking our current expenses
            return [...prevExpenses, {id: uuidV4(), budgetId, amount, description}]
            //keeping whatever prev expenses we had, and adding another
            //with new uuid, name, and max
        })
    }
    
    function addBudget({ name, max }) {
        setBudgets(prevBudgets => {
            if(prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets
            }
            //taking our current budgets
            return [...prevBudgets, {id: uuidV4(), name, max}]
            //keeping whatever prev budgets we had, and adding another
            //with new uuid, name, and max
        })
    }
    /*deletes by passing in the object/array itself, not the id */
    function deleteBudget({ id }) {
        // TODO: deal with uncategorized expenses -
        // when deleting an expense category, we want to move the 
        // budget inputs to the uncategorized section
        setExpenses(prevExpenses => {
            return prevExpenses.map(expense => {
                if(expense.budgetId !== id) return expense
                else{
                    return {...expense, budgetId:UNCATEGORIZED_BUDGET_ID}
                }
            })
        })
        setBudgets(prevBudgets => {
            //return prevBudgets.pop(prevBudgets.find(id))
            return prevBudgets.filter(budget => budget.id !== id)
        })
    }

    function deleteExpense({ id }) {
        setExpenses(prevExpenses => {
            //return prevBudgets.pop(prevBudgets.find(id))
            return prevExpenses.filter(expense => expense.id !== id)
        })
    }
    
    return (
        <BudgetsContext.Provider value={{
            budgets, 
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteBudget,
            deleteExpense
        }}>{ children }</BudgetsContext.Provider>
    )
}