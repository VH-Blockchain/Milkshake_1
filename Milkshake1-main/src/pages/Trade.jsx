import React from "react";
import Header from "../common/header/Header";
import SEO from "../common/SEO";
import ColorSwitcher from "../elements/switcher/ColorSwitcher";
import Footer from "../common/footer/Footer";
import TradeTab from "../component/trade/TradeTab";
import Banner from "../component/banner/Banner";

const Farm = () => {
  return (
    <>
      <SEO title="Farm" />
      <ColorSwitcher />
      <main className="main-wrapper">
        <Header />        
        <Banner />
        <div className="container mt-150">
          <TradeTab />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Farm;
