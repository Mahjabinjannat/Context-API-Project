import React from "react";
import HomeButton from "./HomeButton";
import CartButton from "./CartButton";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "20px",
      }}
    >
      <HomeButton />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "150px",
        }}
      >
        <CartButton />

        <Link to="/myOrders">My Orders</Link>
      </div>
    </div>
  );
};

export default NavigationBar;
