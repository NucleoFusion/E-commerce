import React from "react";
import styles from "./CartPage.module.css";

function CartWishlistProdCard(props) {
  return (
    <div className={styles.CartWishlistProdCardContainer}>
      <div className={styles.CartWishlistProdCardImgContainer}>
        <img src={props.imgSrc} />
      </div>
      <div className={styles.CartWishlistProdCardDetails}>
        <h3>Name: {props.name}</h3>
        <h4>Price: {props.price}</h4>
        {props.type === "wishlist" ? <></> : <h4>Qty: {props.qty}</h4>}
        <p style={{ color: "white" }}>{props.descr}</p>
      </div>
    </div>
  );
}

export default CartWishlistProdCard;
