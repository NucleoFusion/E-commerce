import React, { useState } from "react";

function Dropdown(props){
    
    const [data,setData] = useState(0);

    function showAddress(event){
        props.func(event.target.parentElement.getAttribute('id'));
        setData(data+1);
    }

    let i=0;
    
    return (
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Your Addresses
            </button>
            <ul className="dropdown-menu dropdown-menu-dark">
                {props.arr.map( (obj)=>{
                    return (<li id={`${++i}`} key={`${++i}`}><button data-address={obj.address} className="dropdown-item active" onClick={showAddress}>{obj.address_name}</button></li>);
                })}
            </ul>
        </div>
    );
}

export default Dropdown;