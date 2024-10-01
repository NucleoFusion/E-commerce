import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export default function SearchCard(props) {
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
  return (
    <div className="SearchCard">
      <h1>{props.data.name}</h1>
      <h2>Price: {props.data.price}</h2>
      <p>{props.data.description}</p>
      <div>
        <Link to={`/product/${props.data.id}`}>
          <button>View Page</button>
        </Link>
        <button onClick={addToCart}>Add To Cart</button>
      </div>
    </div>
  );
}
