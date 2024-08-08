import React, { useEffect } from "react";
import $ from "jquery";
import Carousel from "./Carousel";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ProductTypeCard from "./ProductTypeCard";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("auth") !== "AUTHENTICATED") {
      navigate("/");
    }
    $(".navbar").css("display", "block");
  }, []);

  return (
    <div className="Home-container">
      <br />
      <br />
      <br />
      <Carousel />
      <br />
      <br />
      <br />
      <div className="HomePage-product-showcase">
        <h1> View Products</h1>
        <br />
        <br />
        <br />
        <ProductTypeCard title="Tech Products" type="tech" />
        <ProductTypeCard title="Furniture Products" type="furniture" />
        <ProductTypeCard title="Tools" type="tools" />
        <ProductTypeCard title="Edible Products" type="food" />
      </div>
    </div>
  );
}

export default Home;
