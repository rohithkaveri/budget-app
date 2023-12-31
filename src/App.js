//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container"
import Stack from "react-bootstrap/Stack"
import Button from "react-bootstrap/Button"
import BudgetCard from './components/BudgetCard';
import AddBudgetModal from './components/AddBudgetModal';


function App() {
  return (
      <>
        <Container className='my-4'>
          <Stack direction='horizontal' gap={2} className='mb-4'>
            <h1 className='me-auto'>Budgets</h1>
            <Button variant='primary'>Add Budget</Button>
            <Button variant='outline-primary'>Add Expense</Button>
          </Stack>
          
          <div style={{ display:"grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
          gap:'1rem', alignItems: 'flex-start'}}>
            <BudgetCard name={'Entertainment'} amount={200} max={1000} gray={true}></BudgetCard>
          </div>
        </Container>
        <AddBudgetModal />
      </>
  )
}

export default App;
