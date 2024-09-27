import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/profile">
          <img
            width="50"
            height="50"
            src="https://img.icons8.com/ios/50/FFFFFF/user-male-circle--v1.png"
            alt="user-male-circle--v1"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" id="nav-ul">
            <li className="nav-item">
              <Link to="/home">
                <button
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  Home
                </button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/search">
                <button className="nav-link" href="/search">
                  View Products
                </button>
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/wishlist">
                Wishlist
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/cart">
                Cart
              </a>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success search-button"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
