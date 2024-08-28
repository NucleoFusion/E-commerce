import React from "react";

export default function SearchCard(props) {
  return (
    <div className="SearchCard">
      <h1>{props.data.name}</h1>
      <h2>Price: {props.data.price}</h2>
      <p>{props.data.description}</p>
      <div>
        <button>View Page</button>
        <button>Add To Cart</button>
      </div>
    </div>
  );
}
