import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export default function ProductPage() {
  const { id } = useParams();

  const [prodData, setProdData] = useState({});

  useEffect(() => {
    const getData = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}get/products/byId/${id}`
      );
      //   console.log(result.data);
      setProdData(result.data);
    };
    getData();
  }, []);

  console.log(prodData);

  async function addToWishlist() {
    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}add/toWishlist/${id}`,
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

  async function addToCart() {
    await axios.post(
      `${process.env.REACT_APP_BASE_URL}add/toCart/${id}`,
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

  return (
    <div className="productPageCont">
      <div>
        <h2>{prodData.name ? prodData.name : "Loading..."}</h2>
      </div>
      <div>
        <h2>ID: {id ? id : "Loading..."}</h2>
      </div>
      <div>
        <img src="/img/prod_img.jpg"></img>
      </div>
      <div>
        <h2>
          {prodData.product_type
            ? prodData.product_type[0].toUpperCase() +
              prodData.product_type.substring(1)
            : `Loading...`}
        </h2>
      </div>
      <div>
        <h2>{prodData.price ? prodData.price : "Loading..."}</h2>
      </div>
      <div>
        <button onClick={addToCart}>Add To Cart</button>
        <button onClick={addToWishlist}>Wishlist Product</button>
      </div>
      <div>
        <p>{prodData.description ? prodData.description : "Loading..."}</p>
      </div>
    </div>
  );
}
