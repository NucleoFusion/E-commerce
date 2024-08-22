import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

function ProductTypeCard(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const result = await axios.get(
        `http://localhost:3000/get/products/${props.type}`
      );
      setProducts(await result.data);
    };
    getData();
  }, [props]);

  console.log(products);

  return (
    <div className="ProductTypeCard-container">
      <div className="ProductTypeCard-header">
        <h2>{props.title}</h2>
        <button>
          View More
          <img />
        </button>
      </div>
      <div className="ProductTypeCard-showcase">
        {products.map((obj) => {
          return (
            <ProductCard
              data={obj}
              name={obj.name}
              price={obj.price}
              description={obj.description}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ProductTypeCard;
