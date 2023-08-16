/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowRightCircle } from "react-icons/bs";
import TradeTop from "./TradeTop";
import TradeCardSec from "./TradeCardSec";
import TradeCardSec2 from "./TradeCardSec2";

const TradeCard = (props) => {
  const [arrow, setArrow] = useState(true);

  const arrowHandleDown = () => {
    setArrow(!arrow);
  };

  const arrowHandleUp = () => {
    setArrow(true);
  };

  return (
    <>
      <div className="col-lg-12 col-md-12">
        <div className="trade-grid">
          <TradeTop
            title="Exchange"
            desc="Trade Token in an Instant"
            img="milk-busd"
            apr="3.5"
            deposit="1"
            milkEarn="0"
            farmClass="1"
          />
          <div className="content">
            {arrow ? (
              <TradeCardSec arrowHandleDown={arrowHandleDown} />   
            ) : (
              <TradeCardSec2 arrowHandleDown={arrowHandleDown} />  
            )}
            <div className="row">
              <div className="col-md-9">
                <Link to="/" className="trade-blue-box mt-5 text-white"> 
                  Unlock Wallet
                </Link>
              </div>
              <div className="col-md-3">
                <Link to="/" className="trade-blue-box mt-5 text-white">
                  <BsArrowRightCircle style={{ fontWeight: "900" }} />
                </Link>
              </div>
            </div>
          </div>
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
