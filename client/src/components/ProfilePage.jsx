import React, { useEffect, useState } from "react";
import $ from "jquery";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import HorizontalCard from "./HorizontalCard";
import Dropdown from "./Dropdown";
import AddressForm from "./AddressForm";

function ProfilePage() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({ userData: "", address: [] });

  useEffect(() => {
    if (Cookies.get("auth") !== "AUTHENTICATED") {
      navigate("/");
    }
    $(".navbar").css("display", "block");
    let getUser = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}get/user/${Cookies.get("id")}`
      );
      setUserData(result.data);
    };
    getUser();
  }, []);

  let addAddress = (obj) => {
    const currUserData = userData;
    var currAddress = userData.address;
    setUserData({
      ...currUserData,
      address: currAddress.push({
        address_name: obj.AddressName,
        address: obj.Address,
      }),
    });
  };

  function showAddress(id) {
    $(".Address-para").text(`${$(`#${id} button`).attr("data-address")}`);
  }

  function showForm() {
    $(".ProfilePage-AddressForm-container").removeClass("span-col-2");
    $(".button-define .span-col-2").removeClass("span-col-2");
    $(".Address-para-container").hide();
    $(".AddressForm").show();
    $(".close-button").show();
    $(".addAddress-button").css("transform", "translateX(-25vw)");
  }

  function toggleDropdown() {
    $(".ProfilePage-AddressForm-container").addClass("span-col-2");
    $(".Address-para-container").show();
    $(".close-button").hide();
    $(".AddressForm").hide();
    $(".addAddress-button").css("transform", "translateX(0vw)");
  }

  return (
    <div className="ProfilePage-container">
      <h2>{`Hello, ${userData.userData.username}!`}</h2>
      <h3>{`Email: ${userData.userData.email}`}</h3>
      <div className="ProfilePage-card-container">
        <HorizontalCard
          title="Wishlist"
          srcImg="./img/icons8-heart-100.png"
          route="/wishlist"
          descr="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias e"
        />
        <HorizontalCard
          title="Cart"
          srcImg="\img\icons8-shopping-cart-64.png"
          route="/cart"
          descr="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias e"
        />
      </div>
      <div className="address-selector-container">
        <div className="Address-para-container">
          <Dropdown arr={userData.address} func={showAddress} />
          <p className="text-center Address-para">Select address to see</p>
        </div>
        <div className="ProfilePage-AddressForm-container span-col-2">
          <div className="ProfilePage-button-container">
            <button
              type="button"
              className="btn btn-primary button-define span-col-2 addAddress-button"
              onClick={showForm}
            >
              Add Address
            </button>
            <button
              type="button"
              className="btn btn-primary close-button button-define"
              onClick={toggleDropdown}
              style={{ display: "none" }}
            >
              Close
            </button>
          </div>
          <AddressForm addAddress={addAddress} />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
