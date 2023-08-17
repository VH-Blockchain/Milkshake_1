// export type IfoStatus = 'coming_soon' | 'live' | 'finished'

// export interface Ifo {
//   id: string
//   isActive: boolean
//   address: string
//   name: string
//   subTitle?: string
//   description?: string
//   launchDate: string
//   launchTime: string
//   saleAmount: string
//   raiseAmount: string
//   cakeToBurn: string
//   projectSiteUrl: string
//   currency: string
//   currencyAddress: string
//   tokenDecimals: number
//   releaseBlockNumber: number
// }

export const QuoteToken = {
  'BNB':'BNB',
  'CAKE' : 'CAKE',
  'SYRUP' : 'SYRUP',
  'BUSD' : 'BUSD',
  'TWT' : 'TWT',
  'UST' : 'UST',
  'MILK' : 'MILK',
  'ETH' : 'ETH',
  'BTC' : 'BTC',
}

export const PoolCategory = {
  'COMMUNITY' : 'Community',
  'CORE' : 'Core',
  'BINANCE' : 'Binance', // Pools using native BNB behave differently than pools using a token
}

export const Address  = {
  97:97,
  56:56
}

// export const FarmConfig  = {
//   pid
//   lpSymbol: string
//   lpAddresses: Address
//   tokenSymbol: string
//   tokenAddresses: Address
//   quoteTokenSymbol: QuoteToken
//   quoteTokenAdresses: Address
//   multiplier?: string
//   isTokenOnly?: boolean
//   isCommunity?: boolean
//   risk: number
//   dual?: {
//     rewardPerBlock: number
//     earnLabel: string
//     endBlock: number
//   }
// }

// export interface PoolConfig {
//   sousId
//   image
//   tokenName: string
//   stakingTokenName: QuoteToken
//   stakingLimit?
//   stakingTokenAddress
//   contractAddress: Address
//   poolCategory: PoolCategory
//   projectLink: string
//   tokenPerBlock: string
//   sortOrder?
//   harvest?: boolean
//   isFinished?: boolean
//   tokenDecimals
// }

// export type Nft = {
//   name
//   description
//   originalImage
//   previewImage
//   blurImage
//   sortOrder 
//   bunnyId 
// }
