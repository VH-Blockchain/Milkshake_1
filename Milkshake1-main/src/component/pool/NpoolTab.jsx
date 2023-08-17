/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext } from "react";
import Switch from "react-switch";
import PoolCard from "./PoolCrad";
import Spinner from "react-bootstrap/Spinner";
import fetchFarms from "../../constants/multiCaller";
import FarmRegister from "../farm/FarmRegister";
import { ContextOneApp, ContextTwoApp } from "../../App";
import { MainTvlFetcher } from "../../TVLFetch/MainTvlFetcher";
import fetchFarmUSerDataAsync from "../../constants/Register/fetchFarmUSerDataAsync";
import {
  calculateCakeEarnedPerThousandDollars,
  apyModalRoi,
} from "../farm/compoundApy";
// import {apr} from "./lpToken"
import CoinGecko from "coingecko-api";
import BigNumber from "bignumber.js";

const FarmTab = () => {
  const [active, setActive] = useState(true);
  const [checked, setChecked] = useState(true);
  const [lpTokens, setLptoken] = React.useState();
  const [aprV, setAprV] = React.useState({});
  const [userlpTokens, setUserLptoken] = React.useState();
  const [totliquidity, setTotliquidity] = React.useState();
  const [isregistered, setIsregistered] = React.useState(false);

  const access = useContext(ContextOneApp);
  const access2 = useContext(ContextTwoApp);
  let wei = 1000000000000000000;

  const { userAccount, objOne, objTwo } = access;

  const isRegister = async (userAccount) => {
    if (userAccount) {
      let response = await objTwo.methods.affinfo(userAccount).call();
      setIsregistered(response.isregistered);
    }
  };

  let a = [];

  const dataFunc = async (userAccount) => {
    const a = await fetchFarms();
    setLptoken(a);
    const value = await MainTvlFetcher();
    setTotliquidity(value[1]);

    const lp = await fetchFarmUSerDataAsync(
      userAccount
    );
    setUserLptoken(lp);
  };

  const apr = async (lpTokens) => {
    // const cakePrice = await useFetch();
    const CoinGeckoClient = new CoinGecko();
    // ethPrice
    const ethresult = await CoinGeckoClient.coins.fetch("ethereum", {});
    let ethPrice = new BigNumber(
      ethresult.data?.market_data?.current_price?.usd
    );
    // btcPrice

    const btcresult = await CoinGeckoClient.coins.fetch("bitcoin", {});
    let btcPrice = new BigNumber(
      btcresult.data?.market_data?.current_price?.usd
    );
    // btcPrice

    const cakeresult = await CoinGeckoClient.coins.fetch("milkshakeswap", {});
    let cakePrice = new BigNumber(
      cakeresult.data?.market_data?.current_price?.usd
    );

    let fg = {};

    if (lpTokens) {
      lpTokens.map((farm, i) => {
        // let cakePrice = new BigNumber(0.345 + 0.0006);

        const cakeRewardPerBlock = new BigNumber(farm.eggPerBlock || 1) //0.07 * 0.333 = 0.02331
          .times(new BigNumber(farm.poolWeight))
          .div(new BigNumber(10).pow(18));
        const cakeRewardPerYear = cakeRewardPerBlock.times(10512000); // 0.02331 * 10512000 = 245,034.72

        let apy = cakePrice.times(cakeRewardPerYear); //0.347 * 245,034.72 = 85,027.04784

        let totalValue = new BigNumber(farm.lpTotalInQuoteToken || 0); // 527.058

        if (farm.quoteTokenSymbol === "BNB") {
          totalValue = totalValue.times(670); //527.058 * 245.45 = 129366.386
          if (totalValue.comparedTo(0) > 0) {
            apy = apy.div(totalValue); // 85,027.04 / 129366.38 = 0.657
          }
          const farmAPY =
            apy &&
            apy.times(new BigNumber(100)).toNumber().toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
          fg["bnb"] = parseFloat(farmAPY).toFixed(2);
        } else if (farm.quoteTokenSymbol === "ETH") {
          totalValue = totalValue.times(ethPrice);
          if (totalValue.comparedTo(0) > 0) {
            apy = apy.div(totalValue); // 85,027.04 / 129366.38 = 0.657
          }
          const farmAPY =
            apy &&
            apy.times(new BigNumber(100)).toNumber().toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
          fg["eth"] = parseFloat(farmAPY).toFixed(2);
        } else if (farm.quoteTokenSymbol === "BTC") {
          totalValue = totalValue.times(btcPrice);
          if (totalValue.comparedTo(0) > 0) {
            apy = apy.div(totalValue); // 85,027.04 / 129366.38 = 0.657
          }
          const farmAPY =
            apy &&
            apy.times(new BigNumber(100)).toNumber().toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
          fg["btc"] = parseFloat(farmAPY).toFixed(2);
        } else if (farm.quoteTokenSymbol === "CAKE") {
          totalValue = totalValue.times(1);
          if (totalValue.comparedTo(0) > 0) {
            apy = apy.div(totalValue); // 85,027.04 / 129366.38 = 0.657
          }
          const farmAPY =
            apy &&
            apy.times(new BigNumber(100)).toNumber().toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
          fg["milk"] = parseFloat(farmAPY).toFixed(2);
        } else {
          if (totalValue.comparedTo(0) > 0) {
            apy = apy.div(totalValue); // 85,027.04 / 129366.38 = 0.657
          }

          const farmAPY =
            apy &&
            apy.times(new BigNumber(100)).toNumber().toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
          fg["busd"] = parseFloat(farmAPY).toFixed(2);
        }
      });

      return fg;
    }
  };

  async function d(lpTokens) {
    let c = await apr(lpTokens);
    setAprV(c);
  }

  const roiFunction = async (numberOfDays, apyValue) => {
    const g = {};
    const CoinGeckoClient = new CoinGecko();
    const cakeresult = await CoinGeckoClient.coins.fetch("milkshakeswap", {});
    let cakePrice = new BigNumber(
      cakeresult.data?.market_data?.current_price?.usd
    );
    let cakeEarnedPerThousand1D = calculateCakeEarnedPerThousandDollars({
      numberOfDays,
      apyValue,
      cakePrice,
    });
    const oneThousandDollarsWorthOfCake = 1000 / cakePrice.toNumber();
    let f = apyModalRoi({
      amountEarned: cakeEarnedPerThousand1D,
      amountInvested: oneThousandDollarsWorthOfCake,
    });
    g["roi"] = f;
    g["per"] = cakeEarnedPerThousand1D;
    return g;
  };

  //   console.log(v,"v")

  useEffect(() => {
    dataFunc(userAccount);
    isRegister(userAccount);
    d(lpTokens);
    // roiFunction(1,41.81)
  }, [userAccount, lpTokens, userlpTokens]);

  const handleActive = (nextChecked) => {
    setActive(nextChecked);
  };

  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };

  // console.log(userlpTokens, "helllo");

  if (lpTokens) {
    const priceToBnb = (tokenName, tokenPrice, quoteToken) => {
      const tokenPriceBN = new BigNumber(tokenPrice);
      if (tokenName === "BNB") {
        return new BigNumber(1);
      }
      if (tokenPrice && quoteToken === "BUSD") {
        return tokenPriceBN.div(670); ///  0.32398806426654400175 /670
      }

      return tokenPriceBN;
    };

    const isBnbPool = "Binance"; // bnb

    // /!\ Assume that the farm quote price is BNB
    const stakingTokenPriceInBNB = isBnbPool
      ? new BigNumber(1)
      : new BigNumber(lpTokens[2].tokenPriceVsQuote); // 0.32398806426654400175
    const rewardTokenPriceInBNB = priceToBnb(
      "MILK", // milk
      lpTokens[2]?.tokenPriceVsQuote, // 0.32398806426654400175
      lpTokens[2]?.quoteTokenSymbol // BUSD
    );

    const totalRewardPricePerYear = rewardTokenPriceInBNB
      .times(1)
      .times(10512000);
    // console.log(parseFloat(totalRewardPricePerYear), "totalRewardPricePerYear");
    const totalStakingTokenInPool = stakingTokenPriceInBNB.times(
      lpTokens[2].tokenPriceVsQuote
    );
    const apy = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100);

    // console.log(parseFloat(apy), "apy2");
  }

  //  console.log(lpTokens,"lpTokens")
  //  console.log(aprV,"aprV2")

  return (
    <>
      {userAccount ? (
        isregistered ? (
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
                {lpTokens && userlpTokens ? (
                  <>
                    <PoolCard
                    title={lpTokens[2].lpSymbol}
                    apr={aprV ? aprV.milk : 0}
                    deposit={lpTokens[2].depositFeeBP}
                    milkEarn={parseFloat(userlpTokens[2].earnings / wei).toFixed(3)}
                    farmClass="1"
                    multiplier={lpTokens[2].multiplier}
                    farmImg={lpTokens[2].farmImg}
                    login={access2}
                    userAccount={userAccount}
                    lpAddresses={lpTokens[2].lpAddresses}
                    tot={lpTokens[2].lpTotalInQuoteToken}
                    quoteTokenAdresses={lpTokens[2].quoteTokenAdresses}
                    totliquidity={totliquidity ? totliquidity.busd : 0}
                    stakedBalance={parseFloat(
                      userlpTokens[2].stakedBalance / wei
                    ).toFixed(3)}                   
                    roiFunction={roiFunction}
                    pid={lpTokens[2].pid}
                  />
                  </>
                ) : (
                  <Spinner />
                )}
              </div>
            ) : (
              <div className="row justify-content-center mt-50">none</div>
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
                <>
                  <PoolCard
                    title={lpTokens[2].lpSymbol}
                    apr={aprV ? aprV.milk : 0}
                    deposit={lpTokens[2].depositFeeBP}
                    milkEarn="0"
                    farmClass="1"
                    multiplier={lpTokens[2].multiplier}
                    farmImg={lpTokens[2].farmImg}
                    login={access2}
                    userAccount={userAccount}
                    lpAddresses={lpTokens[2].lpAddresses}
                    tot={lpTokens[2].lpTotalInQuoteToken}
                    quoteTokenAdresses={lpTokens[2].quoteTokenAdresses}
                    stakedBalance="0"
                    roiFunction={roiFunction}
                  />
                </>
              ) : (
                <Spinner />
              )}
            </div>
          ) : (
            <div className="row justify-content-center mt-50">none</div>
          )}
        </>
      )}
    </>
  );
};

export default FarmTab;
