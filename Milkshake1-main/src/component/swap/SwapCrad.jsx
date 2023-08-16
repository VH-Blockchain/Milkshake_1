/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SwapTop from "./SwapTop";

import TradeCardSec from "./TradeCardSec";

const TradeCard = (props) => {
  const [show, setShow] = useState(true);

  const swapHandle = () => {
    setShow(false);
  };

  return (
    <>
      <div className="col-lg-12 col-md-12">
        <div className="trade-grid">
          <SwapTop
            title={props.title}
            desc={props.desc}
            img={props.img}
            apr={props.apr}
            deposit={props.deposit}
            milkEarn={props.milkEarn}
            farmClass={props.farmClass}
          />
          {show?(
          <div className="content">
            <div className="input-box mt-4">
              <button className="btn-banner" onClick={swapHandle}>
                Add Liquidity
              </button>
              <div class=" mt-50">Your Liquidity</div>
            </div>
            <div className="row mt-50 p-4">
              <Link to="/">Import</Link>
              <div className="liq-para">
                Or, if you staked your LP tokens in a farm, unstake them to see 
                them here.
              </div>
            </div>
          </div>):<TradeCardSec /> }
        </div>

        <div className="row justify-content-center">
          <div className="col-md-6 poweredBy-box">
            <div className="poweredBy-name"> Powered by PancakeSwap</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TradeCard;
