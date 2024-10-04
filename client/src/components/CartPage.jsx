import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import CartWishlistProdCard from "./CartWishlistProdCard";
import styles from "./CartPage.module.css";

function CartPage() {
  const navigate = useNavigate();

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    let getWishlist = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}get/cart/${Cookies.get("id")}`
      );
      setCartData(result.data);
    };

    if (Cookies.get("auth") !== "AUTHENTICATED") {
      navigate("/");
    }
    $(".navbar").css("display", "block");

    getWishlist();
  }, []);

  var total = 0;
  for (let i = 0; i < cartData.length; i++) {
    total = total + Number(cartData[i].prodData.price) * cartData[i].qty;
  }

  console.log(cartData);

  return (
    <div className={styles.CartPageContainer}>
      <h1 style={{ color: "black", textAlign: "center", width: "100vw" }}>
        Your Cart
      </h1>
      <div className={styles.prodContainerCart}>
        {cartData.map((obj) => {
          return (
            <CartWishlistProdCard
              data={obj}
              name={obj.prodData.name}
              price={obj.prodData.price}
              qty={obj.qty}
              descr={obj.prodData.description}
            />
          );
        })}
      </div>
      <div className={styles.cartDetails}>
        <div>
          <div className={styles.productsCart}>
            <h2>Product</h2>
            <h2>Quantity</h2>
            {cartData.map((obj) => {
              return (
                <>
                  <h2>{obj.prodData.name}</h2>
                  <h2>{obj.qty}</h2>
                </>
              );
            })}
          </div>
          <h1 style={{ textAlign: "center", gridColumn: "span 2" }}>
            Total: {total}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
