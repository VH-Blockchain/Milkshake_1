import React from "react";
import Header from "../common/header/Header";
import SEO from "../common/SEO";
import ColorSwitcher from "../elements/switcher/ColorSwitcher";
import Footer from "../common/footer/Footer";
import LotteryTab from "../component/lottery/LotteryTab";
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
                  <div className="lotto-title">
                    “The biggest regret is not winning the lottery, It’s in Not
                    Trying”
                  </div>
                  <div className="lotto-title mt-4">
                    BUY MILK LOTTO TICKET AND FIGHT TO MAKE YOUR DREAMS
                    COMES TRUE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mb-250">
          <LotteryTab />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Lottery;
