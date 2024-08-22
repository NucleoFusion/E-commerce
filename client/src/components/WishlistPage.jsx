import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import Cookies from "js-cookie";
import axios from "axios";
import CartWishlistProdCard from "./CartWishlistProdCard";

function WishlistPage() {
  const navigate = useNavigate();

  const [wishlistData, setWishlistData] = useState([]);

  useEffect(() => {
    let getWishlist = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}get/wishlist/${Cookies.get("id")}`
      );
      setWishlistData(result.data);
    };

    if (Cookies.get("auth") !== "AUTHENTICATED") {
      navigate("/");
    }
    $(".navbar").css("display", "block");

    getWishlist();
  }, []);

  return (
    <div className="WishlistPage-container">
      <h1 style={{ color: "black", textAlign: "center", width: "100vw" }}>
        Your Wishlist
      </h1>
      {wishlistData.map((obj) => {
        return (
          <CartWishlistProdCard
            name={obj.name}
            price={obj.price}
            descr={obj.description}
          />
        );
      })}
    </div>
  );
}

export default WishlistPage;
