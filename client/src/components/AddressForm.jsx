import React from "react";
import TextInput from "./TextInput";
import axios from "axios";
import $ from 'jquery';
import Cookies from 'js-cookie';

function AddressForm(props){

    async function postAddress(e){
        e.preventDefault();
        if($('#AddressName').val() === '' || $('#Address').val() === ''){
            alert('One or more field is(are) emnpty');
            return;
        }
        $('.Address-para-container').show();
        $('.AddressForm').hide();
        await axios.post(`https://e-comm-new.onrender.com/add/address/${Cookies.get('id')}`,
        {
            AddressName: $('#AddressName').val(),
            Address: $('#Address').val()
        },
        {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        props.addAddress(
            {
            AddressName: $('#AddressName').val(),
            Address: $('#Address').val()
            }
        );
        alert('Added Address');
    }

    return (
        <form className="AddressForm" style={{display:'none'}}>
            <TextInput name='AddressName' />
            <TextInput name='Address' />
            <button type="submit" className="btn btn-primary" onClick={postAddress}>Submit</button>
        </form>
    );
}

export default AddressForm;