import React, {useCallback, useState, useEffect, useContext } from "react";
import Tilty from "react-tilty"
import { useWeb3React } from '@web3-react/core'
import useGetPriceData from 'hooks/useGetPriceData'
import  { milkContracts, masterChefContracts, lotteryContracts } from "../../common/abicalls"
import img14 from "../../images/others/bubble-14.png"
import img13 from "../../images/others/bubble-13.png"
import img31 from "../../images/others/bubble-31.png"
import img36 from "../../images/others/bubble-36.png"
import img1 from "../../images/others/bubble-1.png"
import milkMoon from "../../images/layout/milk-moon.png"
import milkshakeswap from "../../images/logo/milkshakeswap.png"



const HomeBanner = () => {
  const [userBalance, setUserBalance] = useState(0);
  const [userMilkHarvest, setUserMilkHarvest] = useState(0);
  const { account, activate, deactivate } = useWeb3React()
  const cakePriceUsd = useGetPriceData()
  // console.log(milkContracts(), masterChefContracts(), lotteryContracts(),"milkContracts, masterChefContracts, lotteryContracts ");
  // console.log(objTwo,"objTwo----------")
  const wei = 1000000000000000000;

  const getBalanceButton = async (account) => {
    console.log(account,"account")
    const userBalance1 = await milkContracts().methods.balanceOf(account).call(); 
    setUserBalance(userBalance1 / wei);
  };

  const getMilkHarvest = async (account) => {
    const accounts = "0xba41cEEfb54E016df90f5f7170bFC69E0F65E0bD";
    const response = await masterChefContracts().methods.pendingMILK(4, account).call();
    console.log(response/wei,"response PendingMilk")
    setUserMilkHarvest(response/wei);
  };
  
  // console.log(userBalance,"response PendingMilk")
  useEffect(() => {
    getBalanceButton(account);
  getMilkHarvest(account);
  }, [account]);



// const handleClickOpen = useCallback(() => {
//   getBalanceButton(account);
//   getMilkHarvest(account);
// }, [account])
//   // console.log(userMilkHarvest)

  return (
    <div className="section splash-main-banner">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="banner-content">
              <h3 className="banner-heading">
                Used by millions. Trusted with billions. Be a
                <span className="span-heading ms-4">$MILKER</span>
              </h3>
              {!account ? (
                <div className="row mt-4">
                  <div className="col-lg-12 d-flex">
                    <a
                      href="http://v2exchange.milkshakeswap.finance/#/swap"
                      className="btn-banner"
                    >
                      GET YOUR $MILK
                    </a>
                    <a
                      href="https://milkshakeswap.gitbook.io/milkshake/"
                      className="btn-banner-02 ms-4"
                    >
                      Docs
                    </a>
                  </div>
                </div>
              ) : (
                <div className="row row-cols-2">
                  <div className="col-lg-6">
                    <div className="banner-connect text-center">
                      <div className="text-white header-card-heading">
                        MILK IN WALLET
                      </div>
                      <div className="d-flex justify-content-center text-start">
                        <img
                          className="price-img"
                          src={milkshakeswap}
                          alt="farm"
                        />
                        <div className="white-box">
                          <div className="text-green price-font-banner">
                            {parseFloat(userBalance).toFixed(3)} Milk
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="banner-connect text-center">
                      <div className="text-white header-card-heading">
                        MILK TO HARVEST
                      </div>
                      <div className="d-flex justify-content-center text-start">
                        <img
                          className="price-img"
                          src={milkshakeswap}
                          alt="farm"
                        />
                        <div className="white-box">
                          <div className="text-green price-font-banner">
                            {parseFloat(userMilkHarvest).toFixed(3)} Milk
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-xl-5 col-lg-5 offset-xl-1 animation mpt-50">
            <Tilty glare scale={1.05} maxGlare={0.5}>
              <img src={milkMoon} alt="" />
            </Tilty>
          </div>
        </div>
      </div>

      <ul className="list-unstyled shape-group-20">
        <li className="shape shape-1">
          <img
            src={img36}
            alt="Bubble"
          />
        </li>
        <li className="shape shape-4">
          <img
            src={img14}
            alt="Bubble"
          />
        </li>
        <li className="shape shape-5">
          <img
            src={img13}
            alt="Bubble"
          />
        </li>
        <li className="shape shape-7">
          <img
            src={img31}
            alt="Bubble"
          />
        </li>
        <li className="shape shape-8">
          <img src={img1} alt="Bubble" />
        </li>
      </ul>
    </div>
  );
};

export default HomeBanner;
