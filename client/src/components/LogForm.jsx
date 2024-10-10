import React, { useEffect, useState } from "react";
import PassInput from "./PassInput";
import TextInput from "./TextInput";
import EmailInput from "./EmailInput";
import axios from "axios";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import styles from "./LogForm.module.css";

function LogForm(props) {
  const [logDet, setLogDet] = useState({
    name: props.name,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("auth") === "AUTHENTICATED") {
      navigate("/home");
    }
  }, []);

  async function postLogin(e) {
    e.preventDefault();
    if (logDet.name === "Login") {
      if ($("#Password").val() === "" || $("#Email").val() === "") {
        alert("One or more field is empty");
        return;
      }
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}login`,
        {
          password: $("#Password").val(),
          email: $("#Email").val(),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (result.data.auth === "AUTHENTICATED") {
        alert("Logged In");
        Cookies.set("id", result.data.id);
        Cookies.set("admin", result.data.admin);
        Cookies.set("auth", result.data.auth);
        navigate("/home");
      } else if (result.data.auth === "USER NOT FOUND") {
        alert("User was not found");
      } else if (result.data.auth === "WRONG PASSWORD") {
        alert("Wrong Password was entered");
      }
    } else if (logDet.name === "Register") {
      if (
        $("#Password").val() === "" ||
        $("#Email").val() === "" ||
        $("#Username").val() === ""
      ) {
        alert("One or more field is empty");
        return;
      }
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}register`,
        {
          username: $("#Username").val(),
          password: $("#Password").val(),
          email: $("#Email").val(),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (result.data.auth === "USERNAME EXISTS") {
        alert("The User already Exists");
      } else if (result.data.auth === "AUTHENTICATED") {
        alert("Logged In");
        Cookies.set("id", result.data.id);
        Cookies.set("auth", result.data.auth);
        navigate("/home");
      }
    }
  }

  function setStateDet(event) {
    event.preventDefault();
    console.log($(".login-heading").text());
    const data = logDet;
    if (data.name === "Login") {
      setLogDet({
        name: "Register",
      });
      $(".text-input").toggle();
      $(".login-heading").text("Register");
      $(".logForm-toggle").text("Login");
      $(".logForm-input-container").attr("Login");
    } else if (data.name === "Register") {
      setLogDet({
        name: "Login",
      });
      $(".text-input").toggle();
      $(".login-heading").text("Login");
      $(".logForm-toggle").text("Register");
      $(".logForm-input-container").attr("Login");
    }
  }

  return (
    <div className="logForm-container">
      <div className="logForm-container-element">
        <form className="logForm-form">
          <h3 className="login-heading text-center">Login</h3>
          <TextInput className="logForm-input" name="Username" />
          <EmailInput className="logForm-input" name="Email" />
          <PassInput className="logForm-input" name="Password" />
          <button
            onClick={postLogin}
            className="logForm-submit btn btn-primary"
          >
            Submit
          </button>
        </form>
        <div className="logForm-toggle-container">
          <button
            onClick={setStateDet}
            name="Register"
            className="logForm-toggle logForm-submit btn btn-primary"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogForm;
