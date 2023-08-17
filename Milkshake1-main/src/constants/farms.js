import CoinGecko from 'coingecko-api'
import BigNumber from 'bignumber.js'
import contracts from './contracts'
import { QuoteToken } from './types'



const fetchPrice = async () => {
  const CoinGeckoClient = new CoinGecko()
  const result = await CoinGeckoClient.coins.fetch('ethereum', {})
  const bn = new BigNumber(result.data?.market_data?.current_price?.usd)
  return bn
}

fetchPrice()

// console.log(fetchPrice(),"usePriceEthBusd")

const farms  = [
  {
    pid: 0,
    risk: 5,
    lpSymbol: 'MILK-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xAb6DEeC8C64aE4964Ba5e153d12b8acD1632a29F',
    },
    tokenSymbol: 'MILK',
    tokenAddresses: {
      97: '',
      56: '0xc9bCF3f71E37579A4A42591B09c9dd93Dfe27965',
    },    
    farmImg: "milk-busd",
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 1,
    risk: 5,
    lpSymbol: 'MILK-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x5d902e649e90a1d60be820DCbd5D055CE7efF174',
    },
    tokenSymbol: 'MILK',
    tokenAddresses: {
      97: '',
      56: '0xc9bCF3f71E37579A4A42591B09c9dd93Dfe27965',
    },    
    farmImg: "milk",
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 2,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'MILK',
    lpAddresses: {
      97: '',
      56: '0xb09f514b3aF45B1E79D3ee025475D98D92882618', // MILK-BUSD LP
    },
    tokenSymbol: 'MILK',
    tokenAddresses: {
      97: '',
      56: '0xc9bCF3f71E37579A4A42591B09c9dd93Dfe27965',
    },
    quoteTokenSymbol: QuoteToken.CAKE,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 3,
    risk: 5,
    lpSymbol: 'MILK-BUSD LP V2',
    lpAddresses: {
      97: '',
      56: '0xb09f514b3aF45B1E79D3ee025475D98D92882618',
    },
    tokenSymbol: 'MILK',
    tokenAddresses: {
      97: '',
      56: '0xc9bCF3f71E37579A4A42591B09c9dd93Dfe27965',
    },
    farmImg: "milk-busd",
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 4,
    risk: 5,
    lpSymbol: 'MILK-BNB LP V2',
    lpAddresses: {
      97: '',
      56: '0xaBCB20886B4749205198d627FF6ccFdffFe97112',
    },
    tokenSymbol: 'MILK',
    tokenAddresses: {
      97: '',
      56: '0xc9bCF3f71E37579A4A42591B09c9dd93Dfe27965',
    },    
    farmImg: "milk-bnb",
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 5,
    risk: 5,
    lpSymbol: 'MILK-BTCB LP V2',
    lpAddresses: {
      97: '',
      56: '0x6b40B89BE82528e2DF935b2956cA8F809dab31a3',
    },
    tokenSymbol: 'MILK',
    tokenAddresses: {
      97: '',
      56: '0xc9bCF3f71E37579A4A42591B09c9dd93Dfe27965',
    },
    farmImg: "milk-btc",
    quoteTokenSymbol: QuoteToken.BTC,
    quoteTokenAdresses: contracts.btcb,
  },
  {
    pid: 6,
    risk: 5,
    lpSymbol: 'MILK-ETH LP V2',
    lpAddresses: {
      97: '',
      56: '0x1183Ea43F5625E5DB4F64DBAD86ddaf4e97eE4B1',
    },
    tokenSymbol: 'MILK',
    tokenAddresses: {
      97: '',
      56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    },
    farmImg: "milk-eth",
    quoteTokenSymbol: QuoteToken.ETH,
    quoteTokenAdresses: contracts.eth,
  },
]

export default farms
