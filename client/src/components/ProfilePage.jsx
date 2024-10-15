import React, { useEffect, useState } from "react";
import $ from "jquery";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Dropdown from "./Dropdown";
import AddressForm from "./AddressForm";
import styles from './ProfilePage.module.css';

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
    <div className={styles.container}>
      <div className={styles.imgCont}>
        <img alt="profile icon"/>
      </div>
      <div className={styles.headingCont}>
      <h2>{`Hello, ${userData.userData.username}!`}</h2>
      </div>
      <div className={styles.headingCont}>
      <h2>{`email: ${userData.userData.email}`}</h2>
      </div>
      <div className={styles.buttonCont}>
        <Link to='/wishlist'>
        <button>Wishlist</button>
        </Link>
        <Link to='/cart'>
        <button>Cart</button>
        </Link>
      </div>
      <div className={styles.addressSelectorCont}>
          <Dropdown arr={userData.address} func={showAddress} />
          <button> Add Address </button>
      </div>
      <div className={styles.addressCont}>

      </div>
      {/* <div className="address-selector-container">
        <div className="Address-para-container">
          
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
      </div> */}
    </div>
  );
}

export default ProfilePage;
