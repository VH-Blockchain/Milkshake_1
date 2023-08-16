import BigNumber from 'bignumber.js'
import erc20ABI from '../abis/erc20.json'
import masterchefABI from '../abis/masterchef.json'
import multicall from '../multi_call'
import farmsConfig from '../farms'
// import { getMasterChefAddress } from 'utils/addressHelpers'

const CHAIN_ID = "56"
const mulltiCallAddresses = {
    56: '0x1ee38d535d541c55c9dae27b12edf090c608e6fb',
    97: '0x67ADCB4dF3931b0C5Da724058ADC2174a9844412',
}

export const fetchFarmUserAllowances = async (account) => {
    const masterChefAdress = mulltiCallAddresses[56]

    const calls = farmsConfig.map((farm) => {
        const lpContractAddress = farm.isTokenOnly ? farm.tokenAddresses[CHAIN_ID] : farm.lpAddresses[CHAIN_ID]
        return { address: lpContractAddress, name: 'allowance', params: [account, masterChefAdress] }
    })

    const rawLpAllowances = await multicall(erc20ABI, calls)
    const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
        return new BigNumber(lpBalance).toJSON()
    })
    return parsedLpAllowances
}

export const fetchFarmUserTokenBalances = async (account) => {
    const calls = farmsConfig.map((farm) => {
        const lpContractAddress = farm.isTokenOnly ? farm.tokenAddresses[CHAIN_ID] : farm.lpAddresses[CHAIN_ID]
        return {
            address: lpContractAddress,
            name: 'balanceOf',
            params: [account],
        }
    })

    const rawTokenBalances = await multicall(erc20ABI, calls)
    const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
        return new BigNumber(tokenBalance).toJSON()
    })
    return parsedTokenBalances
}

export const fetchFarmUserStakedBalances = async (account) => {
    const masterChefAdress = mulltiCallAddresses[56]

    const calls = farmsConfig.map((farm) => {
        return {
            address: masterChefAdress,
            name: 'userInfo',
            params: [farm.pid, account],
        }
    })

    const rawStakedBalances = await multicall(masterchefABI, calls)
    const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
        return new BigNumber(stakedBalance[0]._hex).toJSON()
    })
    return parsedStakedBalances
}

export const fetchFarmUserEarnings = async (account) => {
    const masterChefAdress = mulltiCallAddresses[56]

    const calls = farmsConfig.map((farm) => {
        return {
            address: masterChefAdress,
            name: 'pendingMILK',
            params: [farm.pid, account],
        }
    })

    const rawEarnings = await multicall(masterchefABI, calls)
    const parsedEarnings = rawEarnings.map((earnings) => {
        return new BigNumber(earnings).toJSON()
    })
    return parsedEarnings
}
