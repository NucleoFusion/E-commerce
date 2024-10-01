import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

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
    <div className={styles.ProductTypeCardContainer}>
      <div className={styles.ProductTypeCardHeader}>
        <h2>{props.title}</h2>
        <div>
          <Link to={`/search/${props.type}`}>
            <button>
              View More
              <img />
            </button>
          </Link>
        </div>
      </div>
      <div className={styles.ProductTypeCardShowcase}>
        {products.slice(0, 5).map((obj) => {
          return (
            <div>
              <ProductCard
                data={obj}
                name={obj.name}
                price={obj.price}
                description={obj.description}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductTypeCard;
