import React from "react";
import './todo.css'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ImCancelCircle } from "react-icons/im";
function Update(props) {
    const {display} = props;
    return (
        <div className="todo container d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column todo-inputs">
            <div className="card-icons-cancel" onClick={()=>display("none")}>
                    <ImCancelCircle />
                </div>
                <h1 className="text-center sign-up-heading">Update Todo</h1>
                
                <FloatingLabel
                    controlId="floatingInput2"
                    label="Title"
                    className="mb-4 mt-3">
                    <Form.Control
                        type="text"
                        placeholder="Grocery List"
                        name="title"
                        // onChange
                        style={{ height: '60px', borderRadius: '25px' }}/>
                </FloatingLabel>

                <FloatingLabel controlId="floatingTextarea2" label="Body">
                    <Form.Control
                        as="textarea"
                        placeholder="1. Buy milk"
                        name="body"
                        // onChange
                        style={{ height: '100px', borderRadius: '15px', marginTop: '10px' }}
                    />
                </FloatingLabel>
                <Button variant="dark" className="add-btn">Update</Button>
            </div>
        </div>
    )
}
export default Update;