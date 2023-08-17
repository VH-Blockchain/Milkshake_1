import CoinGecko from "coingecko-api";
import BigNumber from "bignumber.js";

export const apr = async (lpTokens) => {
  // const cakePrice = await useFetch();
  const CoinGeckoClient = new CoinGecko();
  // ethPrice
  const ethresult = await CoinGeckoClient.coins.fetch("ethereum", {});
  let ethPrice = new BigNumber(ethresult.data?.market_data?.current_price?.usd);
  // btcPrice

  const btcresult = await CoinGeckoClient.coins.fetch("bitcoin", {});
  let btcPrice = new BigNumber(btcresult.data?.market_data?.current_price?.usd);
  // btcPrice

  const cakeresult = await CoinGeckoClient.coins.fetch("milkshakeswap", {});
  let cakePrice = new BigNumber(
    cakeresult.data?.market_data?.current_price?.usd
  );

  let fg = {};

  if (lpTokens) {
    lpTokens.map((farm, i) => {
      let cakePrice = new BigNumber(0.355);

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
      }

    });

    return fg;
  }
};
