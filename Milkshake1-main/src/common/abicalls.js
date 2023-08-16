import Web3 from 'web3'
import cakeAbi from '../abi/cake.json'
import masterChefAbi from '../abi/masterchef.json'
import lotteryAbi from '../abi/lottery.json'
import lpAbi from '../abi/erc20.json'

const milkAddress = '0xc9bCF3f71E37579A4A42591B09c9dd93Dfe27965' 
const masterChefAddress = '0x9c19eB54c759c9369C788D6554f08Bb6cAdab10d'
const lotteryAddress = '0xc4E8Ce0AE31623B6D43Fd9946AE9B75354ad9ba2'

const milkContracts = () =>{
    // const  provider = "https://bsc.getblock.io/90aa5e9f-0310-44c6-b6a4-83e4873d5c24/mainnet/";
    const provider = 'https://bsc-dataseed.binance.org/'
    const web3 = new Web3(provider)
    const milkContract = new web3.eth.Contract(cakeAbi, milkAddress)
    // setObjOne(milkContract)
    return milkContract
}

const masterChefContracts = () =>{
    // const  provider = "https://bsc.getblock.io/90aa5e9f-0310-44c6-b6a4-83e4873d5c24/mainnet/";
    const provider = 'https://bsc-dataseed.binance.org/'
    const web3 = new Web3(provider)
    const masterChefContract = new web3.eth.Contract(masterChefAbi, masterChefAddress)
        // setObjTwo(masterChefContract)
        return masterChefContract
}

const lotteryContracts = () =>{
    // const  provider = "https://bsc.getblock.io/90aa5e9f-0310-44c6-b6a4-83e4873d5c24/mainnet/";
    const provider = 'https://bsc-dataseed.binance.org/'
    const web3 = new Web3(provider)
    const lotteryContract = new web3.eth.Contract(lotteryAbi, lotteryAddress)
    //     setObjThree(lotteryContract)
    return lotteryContract
}

const lpContract = (lpAddress) =>{
    // const  provider = "https://bsc.getblock.io/90aa5e9f-0310-44c6-b6a4-83e4873d5c24/mainnet/";
    const provider = 'https://bsc-dataseed.binance.org/'
    const web3 = new Web3(provider)
    const LpContract = new web3.eth.Contract(lpAbi, lpAddress)
    //     setObjThree(lotteryContract)
    return LpContract
}

export {milkContracts, masterChefContracts, lotteryContracts, lpContract}