import React from "react";
import dice from "../../images/layout/dice.png"
import globe from "../../images/layout/globe.png"

const Coin = () => {
  return (
    <>
      <div className="container-fulid coin"> 
        {/* <div className="coin"/> */}
        <div className="row justify-content-center row-cols-2">
          <div className="col-lg-5 mt-150 ps-5 animation">
            <img 
              src={dice}
              alt=""
              width="600"
            />
          </div>
          <div className="col-xl-4 col-lg-4 pe-5 animation2">
            <img
              src={globe}
              alt=""
              width="300"
            />
            <div className="coin-heading mt-100">
              A Tasty yield MILKING on Binance Smart Chain
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coin;
