import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { Link } from "react-router-dom";

function ProductTypeCard(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}get/products/${props.type}`
      );
      setProducts(await result.data);
    };
    getData();
  }, [props]);

  return (
    <div className="ProductTypeCard-container">
      <div className="ProductTypeCard-header">
        <h2>{props.title}</h2>
        <Link to={`/search/${props.type}`}>
          <button>
            View More
            <img />
          </button>
        </Link>
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
