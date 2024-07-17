import React from "react";

function TextInput(props){
    return <input type="text" name="password" placeholder={props.placeholder} />;
}

export default TextInput;