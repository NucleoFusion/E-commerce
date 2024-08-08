import React from "react";

function ProductCard(props) {
  return (
    <div className="ProductCard-container">
      <div className="ProductCard-img">
        <img
          src="./img/prod_img.jpg"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="ProductCard-details">
        <h3>{props.name}</h3>
        <h5>{props.price}</h5>
        <p>{props.description}</p>
      </div>
    </div>
  );
}

export default ProductCard;
