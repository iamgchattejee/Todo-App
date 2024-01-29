import {React,useState} from "react";
import "./signup.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Heading from "./heading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {ToastContainer,toast} from 'react-toastify';
import { useRecoilState } from 'recoil';
import { authAtom } from '../../store';

function Signin() {
    const history = useNavigate();
    const [Inputs,setInputs] = useState({email:"",username:"",password:""});
    const [auth,setAuthState] = useRecoilState(authAtom);
    function change(e){
        const {name,value} = e.target;
        setInputs({...Inputs,[name]:value});
    }
     async function submit(e){
        
        e.preventDefault();
        await axios.post("http://localhost:1000/api/v1/signin",Inputs).then((res)=>{
            if(res.data.message === "User Signed In"){
                setInputs({email:"",username:"",password:""});
                sessionStorage.setItem("id",res.data.others._id);
                setAuthState({user:res.data.others._id,isLoggedIn:true});
                history("/todo");
            }
            else{
                toast.error(res.data.message);
            }
        });
        
    }
    return (
        <div className="signup">
            <ToastContainer autoClose={2000}/>
            <div className="container">
                <div className="row">
                    <Heading heading={"Login to Continue"}/>
                    <br />
                    <br />
                    <div className="d-flex justify-content-center align-items-center">
                        <Form>
                            <Form.Group className="mb-3" controlId="formGroupEmail1">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Enter Email" onChange={change} value={Inputs.email}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupUsername1">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="Username" name="username" placeholder="Enter Username" onChange={change} value={Inputs.username} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupPassword1">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" placeholder="Enter Password" onChange={change} value={Inputs.password}/>
                            </Form.Group>
                        </Form>

                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <Button variant="dark" className="submit-btn" onClick={submit}>Sign In</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signin;