import React, { useState } from "react";
import "./todo.css";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Heading from "../sign/heading";
import TodoCard from "./todoCard";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Update from './update'

function Todo() {
    const [Todo, setTodo] = useState({ title: "", body: "" });
    const [Todos, setTodos] = useState([]);


    function change(e) {
        const { name, value } = e.target;
        setTodo({ ...Todo, [name]: value});
    }
    function submit() {
        if(Todo.title=="" && Todo.body==""){
            toast.error("You have entered empty task!!");
        }
        else{
            setTodos([...Todos, Todo]);
            // setTodo({ title: "", body: "" });
            toast.success("Task Added");
            toast.error("Your Task is not saved !! Please Sign Up");
        }
    }
    function showTodo() {
        return Todos.map((todo, index) => {
            return <TodoCard  key={index} id={index} title={todo.title} body={todo.body} delid={del} display={disp}/>
        })
    }
    function del(id) {
        Todos.splice(id,1);
        setTodos([...Todos]);
    }
    function disp(value){
        console.log(value);
        document.getElementById("todo-update").style.display= value;
    }
    return (
        <div className="todo-root">
            <div className="todo container d-flex justify-content-center align-items-center">
                <ToastContainer autoClose={2000}/>
                <div className="d-flex flex-column todo-inputs">
                    <h1 className="text-center sign-up-heading">Add Todo</h1>
                    <FloatingLabel
                        controlId="floatingInput1"
                        label="Title"
                        className="mb-4"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Grocery List"
                            name="title"
                            onChange={change}
                            style={{ height: '60px', borderRadius: '25px' }}
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingTextarea2" label="Body">
                        <Form.Control
                            as="textarea"
                            placeholder="1. Buy milk"
                            name="body"
                            onChange={change}
                            style={{ height: '100px', borderRadius: '15px', marginTop: '10px' }}
                        />
                    </FloatingLabel>
                    <Button variant="dark" className="add-btn" onClick={submit}>Add</Button>
                </div>
            </div>
            <div className="todo-body">
                <div className="container-fluid">
                    <div className="row">
                            {showTodo()}
                    </div>
                </div>
            </div>
            <div className="todo-update" id="todo-update">
                <div className="container"><Update display={disp}/>
                </div>
            </div>
        </div>
    )
};
export default Todo;