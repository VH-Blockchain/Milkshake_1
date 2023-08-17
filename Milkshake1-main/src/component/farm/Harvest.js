import React from 'react'
import { useWeb3React } from '@web3-react/core'
import masterChefAbi from "../../abi/masterchef.json";


const Harvest = async (pid) => {
    const { account, activate, deactivate } = useWeb3React()
    // const harvestHAndler = async (masterChefContract, pid, account) => {
    const masterChefAddress = "0x9c19eB54c759c9369C788D6554f08Bb6cAdab10d";

    const masterChefContract = new web3.eth.Contract(
        masterChefAbi,
        masterChefAddress
    );
    // console.log("=-=-masterChefContract-=-=", masterChefContract);


    const harvestResponse = masterChefContract.methods
        .deposit(pid, '0')
        .send({ from: account })
        .on('transactionHash', (tx) => {
            return tx.transactionHash
        })
    // console.log("=-=-harvestResponse-=-=", await harvestResponse);
    return await harvestResponse
}
// }

export default Harvest
