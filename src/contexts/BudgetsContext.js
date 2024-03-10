import React, { useContext, useEffect, useState } from 'react'
import {v4 as uuidV4} from 'uuid'
//import useLocalStorage from '../hooks/useLocalStorage'
import { collection, doc, getDocs, addDoc, deleteDoc } from "firebase/firestore"; 
import {db} from "../config/firestore"

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
    const [budgets, setBudgets] = useState([])
    //useLocalStorage("budgets", [])
    const [expenses, setExpenses] = useState([])
    //useLocalStorage("expenses", [])

    async function getBudgets() {
        const querySnapshot = await getDocs(collection(db, "budgets"));
        const budget_items = await querySnapshot.docs.map(doc => ({id:doc.id, ...doc.data()}))
        setBudgets(budget_items)
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        })
        
    }
    useEffect(() => {getBudgets()}, [])

    async function getExpenses() {
        const querySnapshot = await getDocs(collection(db, "expenses"));
        const expense_items = await querySnapshot.docs.map(doc => ({id:doc.id, ...doc.data()}))
        setExpenses(expense_items)
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        })
        
    }
    useEffect(() => {getExpenses()}, [])

    
    

    function getBudgetExpenses(budgetId) {
        return expenses.filter(expenses => expenses.budgetId === budgetId)
    }

    // function addExpense({ budgetId, amount, description }) {
    //     setExpenses(prevExpenses => {
    //         //taking our current expenses
    //         return [...prevExpenses, {id: uuidV4(), budgetId, amount, description}]
    //         //keeping whatever prev expenses we had, and adding another
    //         //with new uuid, name, and max
    //     })
    // }

    async function addExpense({ budgetId, amount, description }) {
        try {
            const docRef = await addDoc(collection(db, "expenses"), {
              budgetId: budgetId,
              amount: amount,
              description: description
            });
            console.log("Document written with ID: ", docRef.id);
            setExpenses(prevExpenses => {
                return [...prevExpenses, {id: docRef.id, budgetId, amount, description}]
            })
            getExpenses()
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        
    }
    
    // function addBudget2({ name, max }) {
    //     setBudgets(prevBudgets => {
    //         if(prevBudgets.find(budget => budget.name === name)) {
    //             return prevBudgets
    //         }
    //         //taking our current budgets
    //         return [...prevBudgets, {id: uuidV4(), name, max}]
    //         //keeping whatever prev budgets we had, and adding another
    //         //with new uuid, name, and max
    //     })
    // }

    async function addBudget({ name, max }) {
        try {
            
            if(budgets.indexOf(name) < 0) {
                const docRef = await addDoc(collection(db, "budgets"), {
                    name: name,
                    max: max
                });
                setBudgets(prevBudgets => {
                    return [...prevBudgets, { id:docRef.id, name, max }]
                })
                
                console.log("Document written with ID: ", docRef.id);
                getBudgets()
            }
            
            
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    /*deletes by passing in the object/array itself, not the id */
    async function deleteBudget({ id }) {
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
        await deleteDoc(doc(db, "budgets", id));
    }

    async function deleteExpense({ id }) {
        setExpenses(prevExpenses => {
            //return prevBudgets.pop(prevBudgets.find(id))
            return prevExpenses.filter(expense => expense.id !== id)
        })
        await deleteDoc(doc(db, "expenses", id));
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