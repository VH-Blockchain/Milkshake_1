import React from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import Button from 'react-bootstrap/Button'
import Nav from "./Nav";
import logo from "../../images/logo/milkshakeswap-logo.png"

const MobileMenu = ({ MobileHandler }) => {
  return (
    <div className="mobilemenu-popup">
      <div className="mobilemenu-inner">
        <div className="mobilemenu-header">
          <div className="mobile-nav-logo">
            <Link to="/">
            <img
                className="dark-mode" 
                src={logo}
                alt="Site Logo"
              />
            </Link>
          </div>
          <Button className="mobile-menu-close" onClick={MobileHandler}>
            <FaTimes />
          </Button>
        </div>
        <div className="mobilemenu-body">
          <Nav />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
