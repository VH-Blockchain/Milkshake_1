/* eslint-disable jsx-a11y/anchor-is-valid */
import { useWeb3React } from '@web3-react/core'

import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AfterAccount from "./AfterAccount";
import {milkContracts, masterChefContracts, lotteryContracts} from "../../common/abicalls"
import img1 from "../../images/layout/lottery-bg.png"
import img2 from "../../images/layout/lottery-ticket.png"
import img3 from "../../images/logo/milkshakeswap.png"

const TardeTab = () => {
  const [lotteryPrizeAmount, setLotteryPrizeAmount] = useState();
  const [data, setData] = useState();

  const { account, activate, deactivate } = useWeb3React()

  const wei = 1000000000000000000;

  const getLotto = async (userAccount) => {
    const issueIdex = await lotteryContracts().methods.issueIndex().call();
    const a = await lotteryContracts().methods.getTotalRewards(issueIdex).call();
    setLotteryPrizeAmount(a / wei);
  };
  // };

  const [search, setSearch] = useState(2);

  const getLotteryRoundData = async (lotteryNumber) => {
    try {
      const response = await fetch(
        `https://milkshakeswapapifinal.vercel.app/api/singleLottery?lotteryNumber=${lotteryNumber}`
      );
      const data1 = await response.json();

      return data1;
    } catch (error) {
      throw new Error(error);
    }
  };

  const d = async (search1) => {
    const f = await getLotteryRoundData(search1);
    setData(f);
  };

  // console.log(data,"data")

  getLotto();

  useEffect(() => {
    d(search);
  });

  const fourMatchesAmount = +((lotteryPrizeAmount / 100) * 50).toFixed(0);
  const threeMatchesAmount = +((lotteryPrizeAmount / 100) * 20).toFixed(0);
  const twoMatchesAmount = +((lotteryPrizeAmount / 100) * 10).toFixed(0);
  const burnAmount = +((lotteryPrizeAmount / 100) * 20).toFixed(0);

  // console.log(Math.ceil(lotteryPrizeAmount), "lotteryPrizeAmount")

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="trade-tab">
            <div className="lottery">
              <Link className="lottery-link active">NEXT DRAW</Link>
              <Link to="/post-draw" className="lottery-link">
                POST DRAW
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-10 mt-150">
          <div className="row">
            <div className="col-md-5 lotto-card">
              <div className="lotto-card-head p-3 d-flex">
                <img
                  className="pe-4"
                  src={img3}
                  alt="farm"
                  width="70"
                />
                <div className="lotto-price">
                  {Math.ceil(lotteryPrizeAmount)} Milk
                </div>
              </div>
              <hr />
              <div className="lotto-card-body row justify-content-between p-4">
                <div className="col-lg-4 mb-5">
                  <div>No. Matched</div>
                  <div className="mt-3">4</div>
                  <div className="mt-3">3</div>
                  <div className="mt-3">2</div>
                  <div className="mt-5">To burn:</div>
                </div>
                <div className="col-lg-4 text-end">
                  <div>Price Pot</div>
                  <div className="mt-3">{fourMatchesAmount}</div>
                  <div className="mt-3">{threeMatchesAmount}</div>
                  <div className="mt-3">{twoMatchesAmount}</div>
                  <div className="mt-5">{burnAmount}</div>
                </div>
              </div>
            </div>
            <div className="col-md-2"/>
            <div className="col-md-5 lotto-card p-5 text-center ">
              {account ? (
                <AfterAccount />
              ) : (
                <>
                  <img
                    className="pe-4"
                    src={img2}
                    alt="farm"
                  />
                  {/* <button className="btn-connect" onClick={access2}>
                    Unlock Wallet
                  </button> */}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 mt-150">
          <img
            className="pe-4"
            src={img1}
            alt="farm"
          />
        </div>
        <div className="col-md-8 mtb-50">
          <div
            className="link"
            style={{ fontSize: "20px", marginBottom: "15px" }}
          >
            <a href="#">How it works</a>
          </div>
          Spend MILK to buy tickets, contributing to the lottery pot. Win prizes
          if 2, 3, or 4 of your ticket numbers match the winning numbers and
          their exact order!
          <div className="mt-3 text-center">
            <a href="">Read more</a>
          </div>
        </div>
      </div>
      <div className="row justify-content-center mb-250">
        <div
          className="text-center"
          style={{ fontSize: "25px", fontWeight: "700" }}
        >
          Latest Winning Numbers
        </div>
        <div className="col-md-8 text-center">
          {data ? (
            <>
              <span className="lotto-span">{data.lotteryNumbers[0]}</span>
              <span className="lotto-span">{data.lotteryNumbers[1]}</span>
              <span className="lotto-span">{data.lotteryNumbers[2]}</span>
              <span className="lotto-span">{data.lotteryNumbers[3]}</span>
            </>
          ) : (
            "Loading"
          )}
        </div>
        <div className="col-md-8 mtb-50 text-center">
          <div>Tickets matching 4 numbers:0</div>
          <div>Tickets matching 3 numbers:0</div>
          <div>Tickets matching 2 numbers:0</div>
          <a href="https://milkshakeswapapifinal.vercel.app/api/lottery?page=0&pageSize=25">
            Export recent winning numbers
          </a>
        </div>
      </div>
    </>
  );
};

export default TardeTab;
