import React from "react";
import PassInput from "./PassInput";
import TextInput from "./TextInput";
import EmailInput from "./EmailInput";
import axios from "axios";
import $ from "jquery";

async function postLogin(e){
    e.preventDefault();
    console.log($("input[name='username']").val());
    await axios.post('http://localhost:3000/login', {
        username: $("input[name='username']").val(),
        password: $("input[name='password']").val(),
        email: $("input[name='email']").val()
    },
        {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
    })
}

function LogForm(props){
    return (
        <div className="logForm-container">
            <form className="LoginForm">
                <h3>{props.name}</h3>
                <input type="password" name="password" placeholder="Enter Password" />
                <input type="text" name="username" placeholder="Enter Username" />
                <input type="email" name="email" placeholder="Enter Username" />
                <button onClick={postLogin}>Submit</button>
            </form>
        </div>
    );
}

export default LogForm;
export {postLogin};