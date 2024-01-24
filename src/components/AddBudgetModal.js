import { Button, Form, Modal } from "react-bootstrap";
import { useRef } from "react";
import { useBudgets } from "../contexts/BudgetsContext";

export default function AddBudgetModal({show, handleClose}) {
    const nameRef = useRef()
    const maxRef = useRef()
    const {addBudget} = useBudgets()
    function handleSubmit(e) {
        //prevent program from submitting the form
        e.preventDefault() 
        addBudget({
            name: nameRef.current.value,
            max: parseFloat(maxRef.current.value),
        })
        handleClose()
    }
    
    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton >
                    <Modal.Title>New Budget Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control ref={nameRef} type="text" required></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="maxSpend">
                        <Form.Label>Maximum Spending</Form.Label>
                        <Form.Control ref={maxRef} type="number" required step={0.01} min={0}></Form.Control>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}