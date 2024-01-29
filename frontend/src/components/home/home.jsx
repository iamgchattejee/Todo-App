import React from "react";
import Button from 'react-bootstrap/Button';
import "./home.css";
import { useNavigate } from "react-router-dom";
function Home(){
    const history = useNavigate();
    return(
        <div className="home d-flex justify-content-center align-items-center">
            <div className="container d-flx justify-content-center align-items-center flex-column">
                <h1>Orgainize your
                <br></br>
                     work and life.</h1>
                <br></br>
                <p>Become focused and organized with the World's #1 Task Manager App</p>
                <Button variant="dark" className="home-btn" onClick={()=>{history("/todo");}} >Make a Todo List</Button>
            </div>
        </div>
    );

}

export default Home;