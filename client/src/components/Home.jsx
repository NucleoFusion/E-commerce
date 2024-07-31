import React, { useEffect } from "react";
import $ from 'jquery';
import Carousel from "./Carousel";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

function Home(){
    const navigate = useNavigate();

    useEffect( ()=>{
        if(Cookies.get('auth') !== 'AUTHENTICATED'){
            navigate('/');
        }
        $(".navbar").css('display','block');
    },[])

    return (
        <div className="Home-container">
            <Carousel />
        </div>
    );
}

export default Home;