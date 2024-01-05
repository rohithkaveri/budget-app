import { Button, Form, Modal } from "react-bootstrap";

export default function AddBudgetModal(show, handleClose) {
    function handleSubmit() {

    }
    
    return (
        <Modal show={show} onpagehide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Budget Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" required></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="maxSpend">
                        <Form.Label>Maximum Spending</Form.Label>
                        <Form.Control type="number" required step={0.01} min={0}></Form.Control>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}