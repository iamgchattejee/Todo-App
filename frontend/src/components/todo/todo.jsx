import React, { useEffect, useState } from "react";
import "./todo.css";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import TodoCard from "./todoCard";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Update from './update'
import axios from "axios"
import {  useRecoilState, useRecoilValue } from 'recoil';
import { authAtom } from '../../store';
import { useNavigate } from "react-router-dom";

 
let toUpdateTodos = [];
let userid=sessionStorage.getItem("id");
function Todo() {
    const [Todo, setTodo] = useState({ title: "", body: "" });
    const [Todos, setTodos] = useState([]);
    
    const history = useNavigate();
    useEffect(()=>{
        userid=sessionStorage.getItem("id");
        if(userid){
            const fetchTodos = async () =>{ 
                await axios.get(`http://localhost:1000/api/v2/getTask/${userid}`).then((res)=>{
                    if(res.data.list.length>0){
                        setTodos(res.data.list);
                    }
                    // console.log("gettask"+res.data.message);
                });
            }
            fetchTodos();
        }
        else{
            toast.error("Please Signup First");
            setTimeout(()=>{history("/signup");},3000);
        }
    },[]);

    function change(e) {
        const { name, value } = e.target;
        setTodo({ ...Todo, [name]: value});
    }

    async function submit() {
        if(Todo.title=="" || Todo.body==""){
            toast.error("You have entered empty task!!");
        }
        else{
            if(userid){
                await axios.post("http://localhost:1000/api/v2/addTask",
                {title:Todo.title,body:Todo.body,id:userid}).then((res)=>{console.log(res)});
                setTodos([...Todos, Todo]);
                toast.success("Task Added");
            }
            else{
                toast.error("Please Sign Up");
            }
        }
    }

    function showTodo() {
        return Todos.map((todo, index) => {
            return <TodoCard  key={index} cardid={todo._id} title={todo.title} body={todo.body} 
            delid={del} display={disp} updateId={index} toBeUpdate={update}/>
        })
    }

    function update(updateid){
        toUpdateTodos=Todos[updateid];
        console.log(toUpdateTodos);
    }

    async function del(cardid) {
        if(userid){
            await axios.delete(`http://localhost:1000/api/v2/deleteTask/${cardid}`,{data:{id:userid}}).then((res)=>{
                if(res.data.message === "Task Deleted"){
                    toast.success("Task deleted successfully");
                }
                // console.log(res.data);
            }
            );
        }
        else{
            toast.error("Server Error");
        }
    }
    function disp(value){
        document.getElementById("todo-update").style.display= value;
    }
    useEffect(()=>{
        if(userid){
            const fetchTodos = async () =>{ 
                await axios.get(`http://localhost:1000/api/v2/getTask/${userid}`).then((res)=>{
                    if(res.data.list.length>0){
                        setTodos(res.data.list);
                    }
                });
                }
                fetchTodos();
            };
        },[submit]);
    return (
        <div className="todo-root">
            <div className="todo container d-flex justify-content-center align-items-center">
                <ToastContainer autoClose={2000}/>
                <div className="d-flex flex-column todo-inputs">
                    <h1 className="text-center sign-up-heading" style={{ marginTop: '30px'}}>Add Todo</h1>
                    <FloatingLabel
                        controlId="floatingInput1"
                        label="Title"
                        className="mb-4"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Grocery List"
                            name="title"
                            value={Todo.title}
                            onChange={change}
                            style={{ height: '60px', borderRadius: '25px' }}
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingTextarea2" label="Body">
                        <Form.Control
                            as="textarea"
                            placeholder="1. Buy milk"
                            name="body"
                            value={Todo.body}
                            onChange={change}
                            style={{ height: '100px', borderRadius: '15px' }}
                        />
                    </FloatingLabel>
                    <Button variant="dark" className="add-btn" onClick={()=>{submit()}}>Add</Button>
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
                <div className="container"><Update display={disp} update={toUpdateTodos}/>
                </div>
            </div>
        </div>
    )
};
export default Todo;