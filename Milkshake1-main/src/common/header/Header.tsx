import React, { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import Button from 'react-bootstrap/Button'
import useGetPriceData from 'hooks/useGetPriceData'
import Nav from "./Nav";
import StickyHeader from './StickyHeader'
// import SwitcherHeader from "../../elements/switcher/SwitcherHeader";
import MobileMenu from './MobileMenu'
import useFetch from '../useFetchMilk'
import logo from "../../images/logo/milkshakeswap-logo.png"

// eslint-disable-next-line @typescript-eslint/ban-types
const Header: React.FC<{}> = () => {
  const milk:any = useFetch()

  const sticky = StickyHeader(100)
  const { account, activate, deactivate } = useWeb3React()
  const cakePriceUsd = useGetPriceData()

  const MobileMenuHandler = () => {
    document.querySelector('.mobilemenu-popup').classList.toggle('show')
    document.querySelector('body').classList.toggle('mobilemenu-show')

    const elements = document.querySelectorAll('.mobilemenu-popup .menu-item-has-children > a')

    // for (var i in elements) {
    //   if (elements.hasOwnProperty(i)) {
    //     elements[i].onclick = function () {
    //       this.parentElement
    //         .querySelector(".axil-submenu")
    //         .classList.toggle("active");
    //       this.classList.toggle("open");
    //     };
    //   }
    // }
  }

//   console.log(cakePriceUsd,"account")

  return (
    <>
      <header className="header axil-header header-style-1">
        <div className="axil-mainmenu">
          <div className="container">
            <div className="header-navbar">
              <div className="header-logo">
                <div>
                  <img
                    className="light-version-logo"
                    src={logo}
                    width="250px"
                    alt="logo"
                  />
                </div>
                <div className="header-price">${ cakePriceUsd.toFixed(3)}</div>
                {/* <div className="header-price">${parseFloat(milk.current_price).toFixed(3)}</div> */}
              </div>
              <div className="header-main-nav">
                <Nav />
                </div>
              <div className="header-action">
                <ul className="list-unstyled">
                  <li className="mobile-menu-btn sidemenu-btn d-lg-none d-block">
                    <Button className="btn-wrap" onClick={MobileMenuHandler}> 
                      <span/>
                      <span/>
                      <span/>
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu MobileHandler={MobileMenuHandler} />
    </>
  )
}

export default Header
