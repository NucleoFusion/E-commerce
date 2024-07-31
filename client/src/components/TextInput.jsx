import React from "react";

function TextInput(props){
    return (
    <div className="mb-3 text-input" id={`${props.name}Input`}>
        <label className="form-label">{(props.name === 'AddressName')? 'Address Name' : props.name}</label>
        <input name="username" type="text" className="form-control" id={props.name} />
    </div>
    );
}

export default TextInput;