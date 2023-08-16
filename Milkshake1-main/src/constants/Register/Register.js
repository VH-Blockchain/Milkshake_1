import Web3 from "web3";
import { useWeb3React } from '@web3-react/core'
import masterChefAbi from "../../abi/masterchef.json";
import fetchFarmUSerDataAsync from "./fetchFarmUSerDataAsync";
import {milkContracts, masterChefContracts, lotteryContracts} from "../../common/abicalls"

const Register = async () => {
  const { account, activate, deactivate } = useWeb3React()

  const affrom = "0x7727B3359b35Da11AF5232Ea128c8E9B59914D77"; 

  const RegisterResponse = await masterChefContracts().methods
    .register(affrom)
    .send({ from: account })
    .on("transactionHash", (tx) => {
      return tx.transactionHash;
    });
  console.log("call");
  console.log("=-=-RegisterResponse-=-=", RegisterResponse);

  //called fetchFarmUSerDataAsync as in old project
  fetchFarmUSerDataAsync(account);

  return RegisterResponse;
};

export default Register;
