import React, { useState, useContext, useEffect } from "react"; 
import { Link } from "react-router-dom";
import useGetPriceData from 'hooks/useGetPriceData'
import { Timeline } from "react-twitter-widgets";
import {milkContracts, masterChefContracts, lotteryContracts} from '../../common/abicalls'
import useFetch from "../../common/useFetchMilk";
import arrow from "../../images/icon/arrow-up.png"


import {MainTvlFetcher} from "../../TVLFetch/MainTvlFetcher"

const Stat = () => {
  console.log("ser");
  const [tSupply, setTotalSupply] = useState(0);
  const [cSupply, setSupply] = useState(0);
  const [mcSupply, setMarketSupply] = useState(0);
  const [bnSupply, setBnSupply] = useState(0);
  const [tvl, setTvl] = useState(0);
  const cakePriceUsd = useGetPriceData()

  const milk = useFetch();

  const getBalanceButton = async () => {
    if (true) {
      const burnedBalance = await milkContracts().methods.balanceOf('0x000000000000000000000000000000000000dEaD').call();
      const burnedBalance2 = burnedBalance.slice('0','5');
      
      const response = await milkContracts().methods.totalSupply().call();
      const fix = Math.ceil(response).toLocaleString();
      const fix2 = response.slice(0,7);

      const circulate = fix2 - burnedBalance2;
      // console.log(circulate, "_+circulate_+")
      
      const marketCap = circulate * milk.current_price;
      
      // 1) total supply transformation
      const TsupplyToStr = (tSupply).toString();
      const _finalTSupply = TsupplyToStr.slice(0, 7)
      const nf = new Intl.NumberFormat('en-IN');
      const finalTSupply = nf.format(_finalTSupply);

      // 2) marketCap transformation
      const marketCapToStr = (marketCap).toString();
      const finalMarketCap = marketCapToStr.slice(0, 6)

      // 3) cSupply transformation
      const CsupplyToStr = (cSupply).toString();
      const finalCSupply = CsupplyToStr.slice(0, 6)


      setTotalSupply(fix2);
      setSupply(circulate);
      setMarketSupply(marketCap);
      setBnSupply(burnedBalance2.toLocaleString())
    }
    const value = await MainTvlFetcher();    
    setTvl(value[0])
    console.log("wallet is not connected")
  };

  getBalanceButton()


  return (
    <>
      <div className="section mt-100">
        <div className="container">
          <div className="row">
            <div className="Box">
              <div className="services-grid  bg-1">
                <div className="content">
                  <h5 className="stat-title">
                    <Link to="/">Market Cap</Link>
                  </h5>
                  <h5 className="title">
                    <Link to="/">${mcSupply.toLocaleString()}</Link>
                  </h5>
                </div>
              </div>
            </div>
            <div className="Box">
              <div className="services-grid bg-2">
                <div className="content">
                  <h5 className="stat-title">
                    <Link to="/">Total Minted</Link>
                  </h5>
                  <h6 className="title text-white">
                    {tSupply.toLocaleString()}
                  </h6>
                </div>
              </div>
            </div>
            <div className="Box">
              <div className="services-grid bg-3">
                <div className="content">
                  <h5 className="stat-title">
                    <Link to="/">Total Burned</Link>
                  </h5>
                  <h5 className="title text-white">
                    {bnSupply}
                  </h5>
                </div>
              </div>
            </div>
            <div className="Box">
              <div className="services-grid bg-1">
                <div className="content">
                  <h5 className="stat-title">
                    <Link to="/">Circulate Supply</Link>
                  </h5>
                  <h5 className="title text-white">
                    {cSupply}
                  </h5>
                </div>
              </div>
            </div>
            <div className="Box">
              <div className="services-grid bg-2">
                <div className="content">
                  <h5 className="stat-title">
                    <Link to="/">New Milk/block</Link>
                  </h5>
                  <h5 className="title">
                    <Link to="/">0.07</Link>
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6 col-md-6">
              <div className="services-grid bg-3">
                <div className="thumbnail">
                  <img
                    src={arrow}
                    alt="icon"
                    className="icon-img"
                  />
                </div>
                <div className="content">
                  <h5 className="stat-title">
                    <Link to="/">Total Value Locked (TVL)</Link>
                  </h5>
                  <h5 className="tvl text-white">
                    <Link to="/">
                      ${parseFloat(tvl).toFixed(2)}
                    </Link>
                  </h5>
                  <h6 className="text-white">
                    Across all Milkings and Flavour Pools
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-md-5">
              <Timeline
                dataSource={{
                  sourceType: "profile",
                  screenName: "milkshakeswap",
                }}
                options={{
                  height: "400",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stat;
