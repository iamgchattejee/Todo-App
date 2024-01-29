import React, { useEffect, useState } from "react";
import './todo.css'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ImCancelCircle } from "react-icons/im";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios"
function Update(props) {
    const {display,update} = props;
    const [Input,setInput]=useState({title:"",body:""})
    
    const change = (e)=>{
        const { name, value } = e.target;
        setInput({...Input,[name]:value});
        console.log(Input);
    }

    useEffect(()=>{
        console.log(update.title);
        setInput({title:update.title,body:update.body});
    },[update]);

    const submit = async()=>{
        await axios.put(`http://localhost:1000/api/v2/updateTask/${update._id}`,Input).then((res)=>{
            toast.success("Task updated successfully");
        });
        display("none");
    }

    return (
        <div className="todo container d-flex justify-content-center align-items-center">
             <ToastContainer autoClose={2000}/>
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
                        value = {Input.title}
                        onChange={change}
                        style={{ height: '60px', borderRadius: '25px' }}/>
                </FloatingLabel>

                <FloatingLabel controlId="floatingTextarea2" label="Body">
                    <Form.Control
                        as="textarea"
                        placeholder="1. Buy milk"
                        name="body"
                        value={Input.body}
                        onChange={change}
                        style={{ height: '100px', borderRadius: '15px', marginTop: '10px' }}
                    />
                </FloatingLabel>
                <Button variant="dark" className="add-btn" onClick={()=>submit()}>Update</Button>
            </div>
        </div>
    )
}
export default Update;