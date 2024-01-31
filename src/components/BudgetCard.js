import { Card, ProgressBar, Stack, Button } from "react-bootstrap"
import {currencyFormatter} from '../utils'
import './BudgetCard.css'
/*import 'bootstrap/dist/css/bootstrap.min.css';*/

export default function BudgetCard({name, amount, max, gray, hideButtons, 
onAddExpenseClick, onViewExpenseClick}) {
  const bgClassNames = []
  if(amount > max)
  {
    bgClassNames.push("bg-danger", "bg-opacity-10")
  }
  else if(gray)
  {
    bgClassNames.push("bg-light")
  }
  return (
      <Card className={bgClassNames.join(" ")}>
        <Card.Body>
          <Card.Title className='BudgetTitle'>
              <div className="me-3">{name}</div>
              {/*only display max value if we have one*/}
              <div className="d-flex align-items-baseline">
                {currencyFormatter.format(amount)} 
                
                {max && (<span className="text-muted fs-6 ms-1">/ 
                {currencyFormatter.format(max)} 
                </span>)}
              </div>
          </Card.Title>
          {/*only display progress bar if we have a max*/}
          {max && (<ProgressBar 
          variant={getProgressBarVariant(amount, max)} 
          min={0} 
          max={max}
          now={amount}>
          </ProgressBar>)}
          {!hideButtons && (<Stack direction="horizontal" gap="2" className="mt-4">
            <Button variant="outline-primary" className="ms-auto"
            onClick={onAddExpenseClick}>Add Expense</Button>
            <Button variant="outline-secondary"
            onClick={onViewExpenseClick}>View Expenses</Button>
          </Stack>)}
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