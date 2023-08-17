import React from "react";
// import Header from "../common/header/Header.jsx";
import SEO from "../common/SEO";
import HomeBanner from "../component/banner/HomeBanner";
// import ColorSwitcher from "../elements/switcher/ColorSwitcher.js";
import Partner from "../component/home/Partner";
import Stat from "../component/home/Stat";
import Coin from "../component/home/Coin";
import Info from "../component/home/Info";
import Referral from "../component/home/Referral";
// import Map from "../component/home/Map";
import World from "../component/home/World";
// import Footer from "../common/footer/Footer"; 

const Home = () => {
  return (
    <>
      <SEO title="Home" />
      {/* <ColorSwitcher />  */}
      <main className="main-wrapper">
      <HomeBanner />
        <Partner/>
        <World/>
        <Stat/>  
        <Coin/>
        <Info/>
        <Referral/> 
      </main>
    </>
  );
};

export default Home;
