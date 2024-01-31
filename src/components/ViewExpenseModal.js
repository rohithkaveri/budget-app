import { Button, Stack, Modal } from "react-bootstrap";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext";
import { currencyFormatter } from "../utils";

export default function ViewExpenseModal({ handleClose, budgetId}) {
    
    const {getBudgetExpenses, budgets, deleteBudget, deleteExpense} = useBudgets()
    //get the budget that we want
    const budget = UNCATEGORIZED_BUDGET_ID === budgetId ? 
    {name:"Uncategorized", id:UNCATEGORIZED_BUDGET_ID} :
    budgets.find(b => b.id === budgetId)

    const expenses = getBudgetExpenses(budgetId)

    return (
        <Modal show={budgetId != null} onHide={handleClose}>
            <Modal.Header closeButton >
                <Modal.Title>
                    <Stack direction={'horizontal'} gap={4}>
                        {/*if budget is defined, put its name here (?) */}
                        <div>Expenses - {budget?.name}</div>
                        {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                            <Button variant="outline-danger"
                            onClick={() => {deleteBudget(budget)
                            handleClose()}}>delete</Button>
                        )}
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack direction="vertical" gap={3}>
                    {expenses.map(expense => (
                        <Stack direction="horizontal" gap={2} key={expense.id}>
                            <div className="me-auto fs-5">{expense.description}</div>
                            <div className="ms-auto fs-6">{currencyFormatter.format(expense.amount)}</div>
                            <Button variant="outline-danger" 
                            size="sm"
                            onClick={() => deleteExpense(expense)}>&times;</Button>
                        </Stack>
                    ))}
                </Stack>
            </Modal.Body>
            
        </Modal>
    )
}