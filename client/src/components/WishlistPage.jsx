import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import Cookies from "js-cookie";
import axios from "axios";
import CartWishlistProdCard from "./CartWishlistProdCard";
import styles from "./CartPage.module.css";

function WishlistPage() {
  const navigate = useNavigate();

  const [wishlistData, setWishlistData] = useState([]);

  useEffect(() => {
    let getWishlist = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}get/wishlist/${Cookies.get("id")}`
      );
      console.log(result);

      if (result.data === "NA") {
        setWishlistData([]);
      } else {
        setWishlistData(result.data);
      }
    };

    if (Cookies.get("auth") !== "AUTHENTICATED") {
      navigate("/");
    }
    $(".navbar").css("display", "block");

    getWishlist();
  }, []);

  return (
    <div className={styles.WishlistPageContainer}>
      <h1 style={{ color: "black", textAlign: "center", width: "100vw" }}>
        Your Wishlist
      </h1>
      {wishlistData.map((obj) => {
        return (
          <CartWishlistProdCard
            type="wishlist"
            data={obj}
            name={obj.name ? obj.name : "loading"}
            price={obj.price ? obj.price : "loading"}
            descr={obj.description ? obj.description : "loading"}
          />
        );
      })}
    </div>
  );
}

export default WishlistPage;
