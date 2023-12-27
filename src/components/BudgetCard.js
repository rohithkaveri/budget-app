import { Card, ProgressBar, Stack, Button } from "react-bootstrap"
import {currencyFormatter} from '../utils'
import './BudgetCard.css'

export default function BudgetCard({name, amount, max}) {
    return (
        <Card>
          <Card.Body>
            <Card.Title className='BudgetTitle'>
                <div className="me-3">{name}</div>
                <div className="d-flex align-items-baseline">
                  {currencyFormatter.format(amount)} 
                  <span className="text-muted fs-6 ms-1">/ {currencyFormatter.format(max)} 
                  </span>
                </div>
            </Card.Title>
            <ProgressBar 
            variant={getProgressBarVariant(amount, max)} 
            min={0} 
            max={max}
            now={amount}>
            </ProgressBar>
            <Stack direction="horizontal" gap="2" className="mt-4">
              <Button>Add Expense</Button>
              <Button>View Expenses</Button>
            </Stack>
          </Card.Body>
        </Card>
    );
}

function getProgressBarVariant(amount, max) {
  
  const stat = (amount/max);
  if (stat < 0.5) return "primary"
  else if (stat < 0.75) return "warning"
  else return "danger"
  
}