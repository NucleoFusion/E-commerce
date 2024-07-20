import React from "react";

function TextInput(props){
    return (
    <div className="mb-3">
        <label for="usernameInput" className="form-label">Username</label>
        <input name="username" type="text" className="form-control" id="usernameInput" />
    </div>
    );
}

export default TextInput;