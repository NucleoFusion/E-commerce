import React, { useState,useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import $ from 'jquery';
import { useNavigate } from "react-router-dom";
import CartWishlistProdCard from "./CartWishlistProdCard";


function CartPage(){
    const navigate = useNavigate();

    const [cartData, setCartData] = useState([]);

    useEffect(()=>{
        let getWishlist = async () => {
            const result = await axios.get(`https://e-comm-new.onrender.com/get/cart/${Cookies.get('id')}`)
            setCartData(result.data);
        }
        
        if(Cookies.get('auth') !== 'AUTHENTICATED'){
            navigate('/');
        }
        $(".navbar").css('display','block');
        
        getWishlist();
    },[])

    console.log(cartData);

    return (
        <div className="CartPage-container">
            <h1 style={{color:'black', textAlign:'center', width:'100vw'}}>Your Cart</h1>
            {cartData.map( (obj)=>{
                return <CartWishlistProdCard name={obj.name} price={obj.price} descr={obj.description} />
            })}
        </div>
    );
}

export default CartPage;