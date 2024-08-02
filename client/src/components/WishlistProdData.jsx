import React from "react";

function WishlistProdData(props){
    return (
        <div className="WishlistProdData-container">
            <div className="WishlistProdData-img-container">
                <img src='./img/icons8-heart-100.png' />
            </div>
            <div className="WishlistProdData-details">
                <h1 className="bebas-neue-regular">{props.name}</h1>
                <h1>{props.price}</h1>
                <p className="montserrat">{props.descr}</p>
            </div>            
        </div>
    );
}

export default WishlistProdData;