/* eslint-disable jsx-a11y/anchor-is-valid */
import { arrayify } from "ethers/lib/utils";
import React, { useState, useEffect, useContext } from "react";
import Switch from "react-switch";
import FarmCard from "./FarmCard";
import Spinner from "react-bootstrap/Spinner";
import fetchFarms from "../../constants/multiCaller";
import { fetchFarmUserAllowances } from "../../constants/fetchFarmUsers/fetchFarmUser";
import FarmRegister from "./FarmRegister";
import { ContextOneApp, ContextTwoApp } from "../../App";
import { MainTvlFetcher } from "../../TVLFetch/MainTvlFetcher";
import fetchFarmUSerDataAsync from "../../constants/Register/fetchFarmUSerDataAsync";
import BigNumber from "bignumber.js";
import { calculateCakeEarnedPerThousandDollars, apyModalRoi } from "./compoundApy";
import fetchToken from "../../common/FetchToken";
// import useFetch from "../useFetchMilk";

const FarmTab = () => {
  const [account, setAccount] = useState(
    "0xba41cEEfb54E016df90f5f7170bFC69E0F65E0bD"
  );
  const [active, setActive] = useState(true);
  const [checked, setChecked] = useState(true);
  const [lpTokens, setLptoken] = React.useState();
  const [userlpTokens, setUserLptoken] = React.useState();
  const [totliquidity, setTotliquidity] = React.useState();
  const [isregistered, setIsregistered] = React.useState(false);
  const [a, setB] = React.useState([]);

  const access = useContext(ContextOneApp);
  const access2 = useContext(ContextTwoApp);
  let wei = 1000000000000000000;

  const { userAccount, objOne, objTwo } = access;

  const isRegister = async (userAccount) => {
    if (userAccount) {
      let response = await objTwo.methods.affinfo(userAccount).call();
      setIsregistered(response.isregistered);
      // setIsregistered(false);
    }
  };

  const dataFunc = async (userAccount) => {
    const a = await fetchFarms();
    setLptoken(a);
    const value = await MainTvlFetcher();
    setTotliquidity(value[2]);
    const lp = await fetchFarmUSerDataAsync(
      "0xba41cEEfb54E016df90f5f7170bFC69E0F65E0bD"
    );
    setUserLptoken(lp);
  };

  // console.log(userlpTokens,"userlpTokens")

  useEffect(() => {
    dataFunc(userAccount);
    isRegister(userAccount);
    apr(lpTokens);
  }, [userAccount, lpTokens, userlpTokens]);


  // console.log(a,"adddddddddd")

  console.log(lpTokens,"bbbbb")

  const apr = async (lpTokens) => {
    // const cakePrice = await useFetch();
    const ethPrice = await fetchToken("ethereum");
    // console.log(parseFloat(ethPrice.toString()), "ethPrice")
    const ethPrice2 = new BigNumber(
      ethPrice.data?.market_data?.current_price?.usd
    );
    const cakePrice5 = await fetchToken("milkshakeswap");
    // console.log(parseFloat(ethPrice.toString()), "ethPrice")
    const cakePrice2 = new BigNumber(
      cakePrice5.data?.market_data?.current_price?.usd
    );
    // console.log(parseFloat(cakePrice2.toString()), "cakePrice2");
    const btcPrice = await fetchToken("bitcoin");
    // console.log(btcPrice3, "btcPrice")
    const btcPrice2 = new BigNumber(
      btcPrice.data?.market_data?.current_price?.usd
    );
    if (lpTokens) {
      lpTokens.map((farm, i) => {
        let cakePrice = new BigNumber(0.322);

        const cakeRewardPerBlock = new BigNumber(farm.eggPerBlock || 1) //0.07 * 0.333 = 0.02331
          .times(new BigNumber(farm.poolWeight))
          .div(new BigNumber(10).pow(18));
        const cakeRewardPerYear = cakeRewardPerBlock.times(10512000); // 0.02331 * 10512000 = 245,034.72

        let apy = cakePrice2.times(cakeRewardPerYear); //0.322 * 245,034.72 = 85027.04784

        let totalValue = new BigNumber(farm.lpTotalInQuoteToken || 0); // 506.691

        if (farm.quoteTokenSymbol === "BNB") {
          totalValue = totalValue.times(670); //506.691 * 670 = 339482.97
        } else if (farm.quoteTokenSymbol === "ETH") {
          totalValue = totalValue.times(ethPrice2); // 85027.04784/339482.97
        } else if (farm.quoteTokenSymbol === "BTC") {
          totalValue = totalValue.times(btcPrice2);
        } else if (farm.quoteTokenSymbol === "CAKE") {
          totalValue = totalValue.times(cakePrice2);
        }

        if (totalValue.comparedTo(0) > 0) {
          apy = apy.div(totalValue); // 85,027.04 / 129366.38 = 0.657
        }

        const farmAPY2 =
          apy &&
          apy.times(new BigNumber(100)).toNumber().toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });

        // let d = apy*100

        // let c42.33

        console.log(parseFloat(apy).toFixed(2), "apy---------------");
        let cakeEarnedPerThousand1D = calculateCakeEarnedPerThousandDollars({
          numberOfDays: 1,
          apy: 42.33,
          cakePrice,
        });
        const oneThousandDollarsWorthOfCake = 1000 / cakePrice.toNumber()
        let f = apyModalRoi({ amountEarned: cakeEarnedPerThousand1D, amountInvested: oneThousandDollarsWorthOfCake })
        // console.log(cakeEarnedPerThousand1D,"cakeEarnedPerThousand1D")
        // console.log(f,"value")
        return parseFloat(farmAPY2).toFixed(2);
      });
    }
  };


  const handleActive = (nextChecked) => {
    setActive(nextChecked);
  };

  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };

  console.log(totliquidity,"helllo")

  return (
    <>
      {userAccount ? (
        isregistered ? ( 
          <>
            user
            <div className="row justify-content-center text-center row-cols-2">
              <div className="col-sm-4 d-flex">
                <div className="active-title">
                  {checked ? "Staked Only" : "Inactive"}
                </div>
                <Switch
                  onChange={handleChange}
                  checked={checked}
                  className="react-switch"
                  onColor="#C600FF"
                  onHandleColor="#000"
                  handleDiameter={35}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  height={50}
                  width={100}
                  id="material-switch"
                />
              </div>
              <div className="col-sm-4 d-flex">
                <div className="active-title">
                  {active ? "Active" : "Inactive"}
                </div>
                <Switch
                  onChange={handleActive}
                  checked={active}
                  className="react-switch"
                  onColor="#C600FF"
                  onHandleColor="#000"
                  handleDiameter={35}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  height={50}
                  width={100}
                  id="material-switch"
                />
              </div>
            </div>
            {active ? (
              <div className="row justify-content-center mt-50">
                {a ? (
                  a.slice(3, 7).map((lpToken, index) => {
                    return (
                      <FarmCard
                        title={lpToken.lpSymbol}
                        apr="3.5"
                        deposit={lpToken.depositFeeBP}
                        milkEarn={parseFloat(lpToken.earnings / wei).toFixed(3)}
                        farmClass="1"
                        multiplier={lpToken.multiplier}
                        farmImg={lpToken.farmImg}
                        key={index}
                        login={access2}
                        userAccount={userAccount}
                        lpAddresses={lpToken.lpAddresses}
                        tot={lpToken.lpTotalInQuoteToken}
                        quoteTokenAdresses={lpToken.quoteTokenAdresses}
                        stakedBalance={parseFloat(
                          lpToken.stakedBalance / wei
                        ).toFixed(3)}
                      />
                    );
                  })
                ) : (
                  <Spinner />
                )}
              </div>
            ) : (
              <div className="row justify-content-center mt-50">
                <FarmCard
                  title="MILK-BUSD LP"
                  img="milk-busd"
                  deposit="0"
                  milkEarn="0"
                  farmClass="1"
                />
                <FarmCard
                  title="MILK-BNB LP"
                  img="milk-bnb"
                  deposit="0"
                  milkEarn="0"
                  farmClass="2"
                />
              </div>
            )}
          </>
        ) : (
          <FarmRegister />
        )
      ) : (
        <>
          <div className="row justify-content-center text-center row-cols-2">
            <div className="col-sm-4 d-flex">
              <div className="active-title">
                {checked ? "Staked Only" : "Inactive"}
              </div>
              <Switch
                onChange={handleChange}
                checked={checked}
                className="react-switch"
                onColor="#C600FF"
                onHandleColor="#000"
                handleDiameter={35}
                uncheckedIcon={false}
                checkedIcon={false}
                height={50}
                width={100}
                id="material-switch"
              />
            </div>
            <div className="col-sm-4 d-flex">
              <div className="active-title">
                {active ? "Active" : "Inactive"}
              </div>
              <Switch
                onChange={handleActive}
                checked={active}
                className="react-switch"
                onColor="#C600FF"
                onHandleColor="#000"
                handleDiameter={35}
                uncheckedIcon={false}
                checkedIcon={false}
                height={50}
                width={100}
                id="material-switch"
              />
            </div>
          </div>

          {active ? (
            <div className="row justify-content-center mt-50">
              {lpTokens ? (
                lpTokens.slice(3, 7).map((lpToken, index) => {
                  return (
                    <FarmCard
                      title={lpToken.lpSymbol}
                      apr="3.5"
                      deposit={lpToken.depositFeeBP}
                      milkEarn="0"
                      farmClass="1"
                      multiplier={lpToken.multiplier}
                      farmImg={lpToken.farmImg}
                      key={index}
                      login={access2}
                      userAccount={userAccount}
                      lpAddresses={lpToken.lpAddresses}
                      tot={lpToken.lpTotalInQuoteToken}
                      quoteTokenAdresses={lpToken.quoteTokenAdresses}
                    />
                  );
                })
              ) : (
                <Spinner />
              )}
            </div>
          ) : (
            <div className="row justify-content-center mt-50">
              <FarmCard
                title="MILK-BUSD LP"
                img="milk-busd"
                deposit="0"
                milkEarn="0"
                farmClass="1"
              />
              <FarmCard
                title="MILK-BNB LP"
                img="milk-bnb"
                deposit="0"
                milkEarn="0"
                farmClass="2"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default FarmTab;
