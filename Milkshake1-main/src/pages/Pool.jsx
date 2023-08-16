import React from "react";
import Header from "../common/header/Header";
import SEO from "../common/SEO";
import ColorSwitcher from "../elements/switcher/ColorSwitcher";
import Footer from "../common/footer/Footer";
import PoolTab from "../component/pool/NpoolTab";
import Banner from "../component/banner/Banner";

const Pool = () => {
  return (
    <>
      <SEO title="Farm" />
      <ColorSwitcher />
      <main className="main-wrapper">
        <Header />        
        <Banner />
        <div className="breadcrum-area">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="">
                  <div className="farm-title">FLAVOUR Pool</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mb-250">
          <PoolTab />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Pool;
