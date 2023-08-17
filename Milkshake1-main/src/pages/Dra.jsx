import React from "react";
import Header from "../common/header/Header";
import SEO from "../common/SEO";
import ColorSwitcher from "../elements/switcher/ColorSwitcher";
import Footer from "../common/footer/Footer";
import DraTab from "../component/dra/DraTab";
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
                    “MILKSHAKE Finance Users can use DRA with their referral
                    code below and earn MILK Tokens”
                  </div>
                  <div className="lotto-title mt-4">
                    to trade visit only at: milkshakeswap.finance/dra
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <DraTab />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Lottery;
