import React from 'react'
import Web3 from "web3";
import masterChefAbi from "../../abi/masterchef.json";
import Web3Modal from "web3modal";
import providerOptions from "../../utils/ProviderOption";

const Stake = async (pid) => {

    // const harvestHAndler = async (masterChefContract, pid, account) => {
    const masterChefAddress = "0x9c19eB54c759c9369C788D6554f08Bb6cAdab10d";

    const web3Modal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: false, // optional
        providerOptions, // required
    });

    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0]
    const masterChefContract = new web3.eth.Contract(
        masterChefAbi,
        masterChefAddress
    );
    // console.log("=-=-masterChefContract-=-=", masterChefContract);


    const stakeResponse = masterChefContract.methods
        .deposit(pid, '0')
        .send({ from: account })
        .on('transactionHash', (tx) => {
            return tx.transactionHash
        })
    // console.log("=-=-harvestResponse-=-=", await stakeResponse);
    return await stakeResponse
}
// }

export default Stake
