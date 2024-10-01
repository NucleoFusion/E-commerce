import React, { useEffect } from "react";
import $ from "jquery";
import Carousel from "./Carousel";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ProductTypeCard from "./ProductTypeCard";
import styles from "./Home.module.css";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("auth") !== "AUTHENTICATED") {
      navigate("/");
    }
    $(".navbar").css("display", "block");
  }, []);

  return (
    <div className={styles.HomeContainer}>
      <br />
      <br />
      <br />
      <Carousel />
      <br />
      <br />
      <br />
      <div className={styles.HomePageProductShowcase}>
        <h1> View Products</h1>
        <ProductTypeCard title="Tech Products" type="tech" />
        <ProductTypeCard title="Furniture Products" type="furniture" />
        <ProductTypeCard title="Tools" type="tools" />
        <ProductTypeCard title="Edible Products" type="food" />
      </div>
    </div>
  );
}

export default Home;
