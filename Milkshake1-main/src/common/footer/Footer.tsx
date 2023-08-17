/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import useGetPriceData from 'hooks/useGetPriceData'

// import {useSelector} from "react-redux";
import {
  BsTwitter,
  BsInstagram,
  BsMedium,
  BsTelegram,
  BsDiscord,
} from "react-icons/bs";
import useFetch from "../useFetchMilk";
import Logo from "../../images/logo/milkshakeswap-logo.png"

const Footer = () => {
  // const milk = useSelector((state) => state.milk.milkToken);
  const cakePriceUsd = useGetPriceData() 
  const milk:any = useFetch();

  return (
    <footer className="footer">
      <div className="container-fluid white-bg">
        <div className="row justify-content-center text-center pt-100">
          <div className="row justify-content-center text-center mt-150">
            <div className="col-xl-3">
              <ul className="d-flex justify-content-between text-center">
                <li>
                  <a href="">FAQ</a> 
                </li>
                <li>/</li>
                <li>
                  <a href="">Tokenomics</a>
                </li>
                <li>/</li>
                <li>
                  <a href="https://milkshakeswap.gitbook.io/milkshake/">Docs</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row mt-50 row-cols-1 text-center justify-content-center">
            <div className="col-xl-4 col-md-12 mt-5">
              <div className="info">
                <Link to="/" className="logo">
                  <img
                    id="site-logo" 
                    src={Logo}
                    alt="logo"
                    width="300"
                  />
                </Link>
              </div>
            </div>
            <div className="col-xl-4 col-md-12 mt-5"> 
              <ul className="d-flex social">
                <li>
                  <a href="">
                    <BsTelegram className="icon" />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/milkshakeswap">
                    <BsTwitter className="icon" />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/milkshakeswap.finance/">
                    <BsInstagram className="icon" />
                  </a>
                </li>
                <li>
                  <a href="https://milkshakeswap.medium.com/">
                    <BsMedium className="icon" />
                  </a>
                </li>
                <li>
                  <a href="https://discord.com/channels/1034058598784978964/1034058599804190741">
                    <BsDiscord className="icon" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-xl-3 col-md-12 mt-5">
              <div className="copyright text-center">
                ©2022 MilkShake Finance.
                <br /> All rights reserved.
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center footer-price mt-50">
          <div className="col-md-3 text-center mtf-150 mt-100">
            <a href="" className="btn-price">
              {/* <div className="footer-price-text">${cakePriceUsd.toFixed(3)}</div> */}
              <div className="footer-price-text">${parseFloat(milk.current_price).toFixed(3)}</div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
