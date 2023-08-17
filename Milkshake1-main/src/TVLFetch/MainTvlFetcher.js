import BigNumber from 'bignumber.js'
import { QuoteToken } from '../constants/types'
import fetchFarms from '../constants/multiCaller'
import fetchToken from '../common/FetchToken'



const farmFetcher = async () => {
    const fetchFarmsData= await fetchFarms();
    return  fetchFarmsData
}


const ZERO = new BigNumber(0)



// Prices

export const UsePriceBnbBusd = () => {

    return new BigNumber(670)
}


const usePoolFromPidData = (farms) => {
    const pid = 3 // EGG-BUSD LP
    let data ;
    for (let i = 0; i < farms.length; i++) {
        if (farms[i].pid === pid) {
            // console.log(farms[i], "farms[i]");
            data =  farms[i];
        }
    }
    return data
}

export const UsePriceCakeBusd = async () => {
    const pid = 3 // EGG-BUSD LP
    // const farm = useFarmFromPid(pid)
    const farm = usePoolFromPidData(await farmFetcher())
    // console.log(farm, "raw farm data");
    return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO

    // return new BigNumber(3.136)
}

export const MainTvlFetcher = async () => {
    // const farms = UseFarms()
    const farms = await farmFetcher()
    // console.log(farms, "farmsss")
    const bnbPrice =await UsePriceBnbBusd()
    // console.log(parseFloat(bnbPrice.toString()), "bnbPrice")
    const cakePrice = await UsePriceCakeBusd()
    // const ethPrice = await fetchEther()
    const ethPrice = await fetchToken("ethereum")
    // console.log(parseFloat(ethPrice.toString()), "ethPrice")
    const ethPrice2 = new BigNumber(ethPrice.data?.market_data?.current_price?.usd)
    const btcPrice = await fetchToken("bitcoin") 
    // console.log(btcPrice3, "btcPrice")
    const btcPrice2 = new BigNumber(btcPrice.data?.market_data?.current_price?.usd)

    let value = new BigNumber(0)
    let finale = 0
    const d = []
    const v = {}
    for (let i = 0; i < farms.length; i++) {
        const farm = farms[i]
        if (farm.lpTotalInQuoteToken) {
            let val
            if (farm.quoteTokenSymbol === QuoteToken.BNB) {
                val = bnbPrice.times(farm.lpTotalInQuoteToken);
                v.bnb = parseFloat(val.toString())
            } else if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
                val = cakePrice.times(farm.lpTotalInQuoteToken)
                v.cake = parseFloat(val.toString())
            } else if (farm.quoteTokenSymbol === QuoteToken.ETH) {
                val = ethPrice2.times(farm.lpTotalInQuoteToken)
                // console.log(parseFloat(val.toString()),"val2")
                v.eth = parseFloat(val.toString())
            } else if (farm.quoteTokenSymbol === QuoteToken.BTC) {
                val = btcPrice2.times(farm.lpTotalInQuoteToken)
                // console.log(parseFloat(val.toString()),"val3")
                v.btc = parseFloat(val.toString())
            } else {
                val = farm.lpTotalInQuoteToken
                // console.log(val,"extra block")
                v.busd = parseFloat(val.toString())
            }
            value = value.plus(val)
            // console.log(value, "vvv")
            finale = parseFloat(value.toString()) + 400000;

            // console.log(v,"v")
            finale = [finale, v, d]

            // console.log(finale,"finale")
        }
    }
    return finale
}
