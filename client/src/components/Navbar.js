import React from "react";
import logo from "../assets/logo.png";

const Navbar = ({ userName, hundleLogout }) => {
  return (
    <div className="nav-container">
      <ul>
        <li>
          <img src={logo} href="" />
        </li>
        <li>Welcome {userName} !!</li>
        <li onClick={() => hundleLogout()} id="logout">
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
