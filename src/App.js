//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container"
import Stack from "react-bootstrap/Stack"
import Button from "react-bootstrap/Button"
import BudgetCard from './components/BudgetCard';
import AddBudgetModal from './components/AddBudgetModal';
import { useState } from 'react';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetsContext';
import AddExpenseModal from './components/AddExpenseModal';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import TotalBudgetCard from './components/TotalBudgetCard';
import ViewExpenseModal from './components/ViewExpenseModal';


function App() {
  //setting the default value to false (not showing this value on start)
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const [viewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState()
  //getting the budget from the use Budgets context (budgetContext)
  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }


  return (
      <>
        <Container className='my-4'>
          <Stack direction='horizontal' gap={2} className='mb-4'>
            <h1 className='me-auto'>Budgets</h1>
            <Button variant='primary' onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
            <Button variant='outline-primary' 
            onClick={openAddExpenseModal}>Add Expense</Button>
          </Stack>
          
          <div style={{ display:"grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
          gap:'1rem', alignItems: 'flex-start'}}>
            {budgets.map(budget => {
              const calc_amount = getBudgetExpenses(budget.id).reduce(
                (total, expense) => total + expense.amount, 0
              )
              return (
                <BudgetCard 
                name={budget.name}
                key= {budget.id}
                amount= {calc_amount}
                max={budget.max}
                onAddExpenseClick={()=> openAddExpenseModal(budget.id)}
                onViewExpenseClick={() => setViewExpenseModalBudgetId(budget.id)}
                />
              )
            })}
            <UncategorizedBudgetCard onAddExpenseClick={()=> openAddExpenseModal(UNCATEGORIZED_BUDGET_ID)}
            onViewExpenseClick={()=>setViewExpenseModalBudgetId(UNCATEGORIZED_BUDGET_ID)}/>
            <TotalBudgetCard hideButtons/>
          </div>
        </Container>
        <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)}/>
        <AddExpenseModal show={showAddExpenseModal} defaultBudgetId={addExpenseModalBudgetId} 
        handleClose={() => setShowAddExpenseModal(false)}/>
        <ViewExpenseModal budgetId={viewExpenseModalBudgetId} 
        handleClose={() => setViewExpenseModalBudgetId()}></ViewExpenseModal>
        
      </>
      
  )
}

export default App;
