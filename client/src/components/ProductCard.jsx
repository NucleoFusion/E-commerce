import axios from "axios";
import React from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function ProductCard(props) {
  async function addToCart() {
    await axios.post(
      `${process.env.REACT_APP_BASE_URL}add/toCart/${props.data.id}`,
      {
        cust_id: Cookies.get("id"),
      },
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      }
    );
    alert("Added");
  }

  async function addToWishlist() {
    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}add/toWishlist/${props.data.id}`,
      {
        cust_id: Cookies.get("id"),
      },
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      }
    );
    if (result.data.message) {
      alert(result.data.message);
    } else {
      alert("Added");
    }
  }

  return (
    <div className={styles.ProductCardContainer}>
      <div className={styles.ProductCardImg}>
        <img
          src="./img/prod_img.jpg"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className={styles.ProductCardDetails}>
        <h4>{props.name}</h4>
        <h5>$ {props.price}</h5>
        <p>{props.description}</p>
        <div>
          <span>
            <Link to={`/product/${props.data.id}`}>
              <button>View Product</button>
            </Link>
          </span>
          <span style={{ marginLeft: "1vw" }}>
            <button onClick={addToCart}>
              {/* <img
                src="./img/icons8-shopping-cart-64.png"
                alt="cart"
                style={{ width: "1vw", height: "1vw" }}
              /> */}
              Add To Cart
            </button>
          </span>
        </div>
      </div>
      <div className={styles.wishlistButtonContainer}>
        <button className={styles.wishlistButton} onClick={addToWishlist}>
          <img
            src="./img/icons8-heart-50 (1).png"
            className={styles.wishlistHeart}
            alt="heart"
          />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
