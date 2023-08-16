import React from "react";
import Header from "../common/header/Header";
import SEO from "../common/SEO";
import ColorSwitcher from "../elements/switcher/ColorSwitcher";
import Footer from "../common/footer/Footer";
import FarmTab from "../component/farm/NfarmTab";
import Banner from "../component/banner/Banner"; 
import img1 from "../images/others/bubble-14.png"
import img2 from "../images/others/bubble-13.png"
import img3 from "../images/others/bubble-31.png"
import img4 from "../images/others/bubble-1.png"

const Farm = () => {
  return (
    <>
      <SEO title="Farm" />
      <ColorSwitcher />
        <Banner />
        <div className="breadcrum-area">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center">
                <div className="">
                  <div className="farm-title">
                    Stake LP tokens to earn MILK Deposit Fee will be used to
                    buyback MILK
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mb-250">
          <FarmTab />

          <div className="section main-banner">
            <ul className="list-unstyled shape-group-20">
              <li className="shape shape-4">
                <img
                  src={img1}
                  alt="Bubble"
                />
              </li>
              <li className="shape shape-5">
                <img
                  src={img2}
                  alt="Bubble"
                />
              </li>
              <li className="shape shape-7">
                <img
                  src={img3}
                  alt="Bubble"
                />
              </li>
              <li className="shape shape-8">
                <img
                  src={img4}
                  alt="Bubble"
                />
              </li>
            </ul>
          </div>
        </div>
    </>
  );
};

export default Farm;
