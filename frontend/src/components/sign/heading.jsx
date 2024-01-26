import React from "react";
import "./signup.css";

function Heading(props) {

    return (<div className="d-flex justify-content-center align-items-center">
        <h1 className="text-center sign-up-heading">{props.heading}</h1>
    </div>
    );
};
export default Heading;