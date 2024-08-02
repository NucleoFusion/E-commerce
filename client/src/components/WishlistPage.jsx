import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import $ from 'jquery';
import Cookies from 'js-cookie';
import axios from "axios";
import WishlistProdData from "./WishlistProdData";

function WishlistPage(){
    const navigate = useNavigate();
    
    const [wishlistData,setWishlistData] = useState([]);

    useEffect(()=>{
        let getWishlist = async () => {
            const result = await axios.get(`http://localhost:3000/get/wishlist/${Cookies.get('id')}`)
            setWishlistData(result.data);
        }
        
        if(Cookies.get('auth') !== 'AUTHENTICATED'){
            navigate('/');
        }
        $(".navbar").css('display','block');
        
        getWishlist();
    },[])
    

    return (
        <div className="WishlistPage-container">
            {wishlistData.map( (obj)=>{
                return <WishlistProdData name={obj.name} price={obj.price} descr={obj.description} />
            })}
        </div>
    );
}

export default WishlistPage;