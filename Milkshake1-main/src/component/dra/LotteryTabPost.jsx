/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import Switch from "react-switch";
// import TradeCrad from "./TradeCrad";
// import TradeCradL from "./TradeCradL";

const TardeTab = () => {
  const [active, setActive] = useState(true);
  const [checked, setChecked] = useState(true);
  const handleActive = (nextChecked) => {
    setActive(nextChecked);
  };

  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="trade-tab">
            <div class="lottery">
              <Link to="/next-draw" class="lottery-link">
                NEXT DRAW
              </Link>
              <Link class="lottery-link active">POST DRAW</Link>
            </div>
          </div>
        </div>
        <div class="col-md-10 mt-150">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div class="input-group2 mb-5">
                <input
                  type="text"
                  class="form-control"
                  value="1"
                />
                <span class="btn-banner" id="basic-addon2">
                  Search
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5 lotto-card">
              <div className="post-lotto-title p-4">Round #1</div>
              <div className="d-block ps-4">
                <div className="post-lotto-win">Winning numbers</div>
                <div className="post-lotto-win2">14, 14, 4, 5</div>
              </div>
              <div className="lotto-card-head p-3 d-flex">
                <img
                  className="pe-4"
                  src={require(`../../images/logo/milkshake.svg`)}
                  alt="farm"
                  width="70"
                />
                <div className="lotto-price">60 Milk</div>
              </div>
              <hr />
              <div className="lotto-card-body row justify-content-between p-4">
                <div className="col-md-4 float-start">
                  <div>No. Matched</div>
                  <div className="mt-3">4</div>
                  <div className="mt-3">3</div>
                  <div className="mt-3">2</div>
                  <div className="mt-5">To burn:</div>
                </div>
                <div className="col-md-4 text-center">
                  <div>Winner</div>
                  <div className="mt-3">0</div>
                  <div className="mt-3">0</div>
                  <div className="mt-3">2</div>
                  <div className="mt-5"></div>
                </div>
                <div className="col-md-4 float-end text-end">
                  <div>Price Pot</div>
                  <div className="mt-3">30</div>
                  <div className="mt-3">12</div>
                  <div className="mt-3">6</div>
                  <div className="mt-5">33</div>
                </div>                
              <button className="btn-connect mt-50">Unlock Wallet</button>
              </div>
            </div>
            <div className="col-md-7 lotto-car p-5 text-center ">
              <img
                className=""
                src={require(`../../images/layout/map-line.png`)}
                alt="farm"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 mt-150">
          <img
            className="pe-4"
            src={require(`../../images/layout/lottery-bg.png`)}
            alt="farm"
          />
        </div>
      </div>
    </>
  );
};

export default TardeTab;
