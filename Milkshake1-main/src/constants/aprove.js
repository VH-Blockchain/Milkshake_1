import React from 'react'
import Web3 from "web3";
import Web3Modal from "web3modal";
import BigNumber from "bignumber.js"
import providerOptions from "../../src/utils/ProviderOption";
import LpAbi from "../abi/cake.json"
import msAbi from "../abi/masterchef.json"

// function approve(address spender, uint256 amount) external returns (bool);
export const approve = async (lpContract, masterChefContract, amount, account) => {
    return lpContract.methods
        .approve(masterChefContract, amount)
        .send({ from: account })
}

const stackHandler = (pid, amount) => {
    
    const LpAddress = "0xAb6DEeC8C64aE4964Ba5e153d12b8acD1632a29F"
    const masterChefContractAddress = "0x9c19eB54c759c9369C788D6554f08Bb6cAdab10d"

    const cal = async (pid, amount) => {
        const web3Modal = new Web3Modal({
            network: "mainnet", // optional
            cacheProvider: false, // optional
            providerOptions, // required
        });

        const provider = await web3Modal.connect();
        // console.log(provider, "-==-=-=-=-provider=-=-=-=-=-")
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        // localStorage.setItem("userAccountsAddress", accounts[0]);
        const lpContract = new web3.eth.Contract(
            LpAbi,
            LpAddress
        );

        const masterChefContract = new web3.eth.Contract(
            msAbi,
            masterChefContractAddress
        );

        // stake 
        const stk = await masterChefContract.methods
        .deposit(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()) 
        .send({ from: account })
        console.log(stk,"stk")
        return stk;

    }

    cal(pid, amount)
}

const unStake = async (pid, amount) => {

    const web3Modal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: false, // optional
        providerOptions, // required
    });
    const provider = await web3Modal.connect();

    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    let account = accounts[0]
    const masterChefAddress = "0x9c19eB54c759c9369C788D6554f08Bb6cAdab10d";

    const masterChefContract = new web3.eth.Contract(
        msAbi,
        masterChefAddress
    );
}

export  {stackHandler,unStake}
        // const data = lpContract.methods
        //     .approve(masterChefContractAddress, 10)
        //     .send({ from: account });

        // console.log(data)
