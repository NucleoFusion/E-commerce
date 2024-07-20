import React, { useState } from "react";
import PassInput from "./PassInput";
import TextInput from "./TextInput";
import EmailInput from "./EmailInput";
import axios from "axios";
import $ from "jquery";


function LogForm(props){
    const [logDet,setLogDet] = useState({
        name: "Login"
    });

    async function postLogin(e){
        e.preventDefault();
        console.log($("input[name='username']").val());
        if(logDet.name === "Login"){
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
        } else if(logDet.name === "Register"){
            await axios.post('http://localhost:3000/register', {
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
        
    }

    function setStateDet(event){
        event.preventDefault();
        console.log($(".login-heading").text());
        const data  = logDet;
        if(data.name === "Login"){
            setLogDet({
                name:"Register"
            });
            $(".login-heading").text("Register");
            $(".logForm-toggle").text("Login");
            $(".logForm-input-container").attr("Login");
        }
    }
    
    return (
        <div className="logForm-container">
            <div className="logForm-container-element justify-right">
                    <h3 className="login-heading center" >Login</h3>
                    <form className="logForm-input-container">
                        <TextInput className="logForm-input" />
                        <EmailInput className="logForm-input"/>
                        <PassInput className="logForm-input"/>
                        <button onClick={postLogin} className="logForm-submit btn btn-primary">Submit</button>
                    </form>    
            </div>
            <div className="logForm-container-element justify-left center-child">
            <button onClick={setStateDet} name="Register" className="logForm-toggle logForm-submit btn btn-primary">Register</button>
            </div>
        </div>
    );
}

export default LogForm;
