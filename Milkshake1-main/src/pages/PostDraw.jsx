import React from "react";
import Header from "../common/header/Header";
import SEO from "../common/SEO";
import ColorSwitcher from "../elements/switcher/ColorSwitcher";
import Footer from "../common/footer/Footer";
import LotteryTab from "../component/lottery/LotteryTabPost";
import Banner from "../component/banner/Banner";

const Lottery = () => {
  return (
    <>
      <SEO title="Lottery" />
      <ColorSwitcher />
      <main className="main-wrapper">
        <Header />        
        <Banner />
        <div className="breadcrum-area">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="">
                  <div className="lotto-title">The MILK Lotto</div>
                  <div className="lotto-title mt-4">
                    Buy tickets with MILK Win if 2, 3, or 4 of your ticket
                    numbers match!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <LotteryTab />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Lottery;
