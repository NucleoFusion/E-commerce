import React from "react";

function CartWishlistProdCard(props) {
  return (
    <div className="CartWishlistProdCard-container">
      <div className="CartWishlistProdCard-img-container">
        <img src={props.imgSrc} />
      </div>
      <div className="CartWishlistProdCard-details">
        <h3>Name: {props.data.prodData.name}</h3>
        <h4>Price: {props.price}</h4>
        {props.type === "wishlist" ? <></> : <h4>Qty: {props.qty}</h4>}
        <p style={{ color: "white" }}>{props.descr}</p>
      </div>
    </div>
  );
}

export default CartWishlistProdCard;
