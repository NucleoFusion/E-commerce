import React, { useEffect } from "react";
import $ from 'jquery';

function Home(){

    useEffect( ()=>{
        $(".navbar").show();
    },[])
    return (
        <h1>HOME</h1>
    );
}

export default Home;