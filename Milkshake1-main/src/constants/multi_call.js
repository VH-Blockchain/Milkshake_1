import Web3 from "web3";
import { AbiItem } from 'web3-utils'
import { Interface } from '@ethersproject/abi'
// import { getWeb3 } from 'utils/web3'
import MultiCallAbi from './abis/Multicall.json'
// import { getMulticallAddress } from 'utils/addressHelpers'

const mulltiCallAddresses = {
    56: '0x1ee38d535d541c55c9dae27b12edf090c608e6fb',
    97: '0x67ADCB4dF3931b0C5Da724058ADC2174a9844412',
}

const multicall = async (abi, calls) => {
    //   const web3 = getWeb3()
    // setting web3 object
    // let provider = "https://bsc.getblock.io/90aa5e9f-0310-44c6-b6a4-83e4873d5c24/mainnet/";
    // let provider = "https://bsc-dataseed.binance.org/";
    // let provider2 = "https://bsc-dataseed1.defibit.io";
    // const web3 = new Web3(provider);
    const web3 = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/"))

    const multi = new web3.eth.Contract(MultiCallAbi, mulltiCallAddresses[56])
    const itf = new Interface(abi)

    const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
    const { returnData } = await multi.methods.aggregate(calldata).call()
    const res = returnData.map((call, i) => itf.decodeFunctionResult(calls[i].name, call))

    return res
}

export default multicall
