import React from "react";
import LogForm from "./LogForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Layout from "./Layout";
import ProfilePage from "./ProfilePage";
import ComingSoon from "./ComingSoon";
import WishlistPage from "./WishlistPage";
import CartPage from "./CartPage";
import SearchPage from "./SearchPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogForm name="Login" />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/comingsoon" element={<ComingSoon />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search/:type" element={<SearchPage type={true} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
