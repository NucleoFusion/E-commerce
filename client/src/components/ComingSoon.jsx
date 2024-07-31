import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import $ from 'jquery';
import Cookies from 'js-cookie';

function ComingSoon(){
    const navigate = useNavigate();

    useEffect(()=>{
        if(Cookies.get('auth') !== 'AUTHENTICATED'){
            navigate('/');
        }
        $(".navbar").css('display','block');
    },[])

    return (
        <>
            <h1>COMING SOON</h1>
        </>
    );
}

export default ComingSoon;