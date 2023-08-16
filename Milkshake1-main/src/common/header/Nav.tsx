import React from "react";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";

// eslint-disable-next-line @typescript-eslint/ban-types
const Nav: React.FC<{}> = () => {

  return (
    <nav className="mainmenu-nav">
      <ul className="mainmenu">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li className="menu-item-has-children">
          <div>
            Trade <FaAngleDown />
          </div>
          <ul className="axil-submenu">
            <li>
              <Link to="/swap">Swap</Link>
            </li>
            <li>
              <Link to="/pool">Pool</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/milk">Milking</Link>
        </li>
        <li>
          <Link to="/pool">Flavour Pool</Link>
        </li>
        <li>
          <Link to="/lotto">Lotto</Link>
        </li>
        <li>
          {/* <Connect/> */}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
