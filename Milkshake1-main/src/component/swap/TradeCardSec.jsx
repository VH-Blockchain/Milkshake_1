/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext } from "react";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import bnb from "../../images/icon/bnb.png";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ContextOneApp, ContextTwoApp, ContextLogout, ContextContractCreation } from "../../App";
import axios from 'axios';
// importing abi of pancake and others
import pancakeFactoryABI from "../../new_abi/Factory.json"
import pancakeRouterABI from "../../new_abi/Router.json"
import pancakePairABI from "../../new_abi/Pair.json"
import token1ABI from "../../new_abi/Token1.json"
import token2ABI from "../../new_abi/Token2.json"

import tk11 from "./abi/tkn1.json"



const TradeCardSec = (props) => {
  const [show, setShow] = useState(false);
  const [arrow, setArrow] = useState(true);

  const [Token1, setToken1] = useState();
  const [Token2, setToken2] = useState();

  const [Token1Bal, setToken1Bal] = useState();
  const [Token2Bal, setToken2Bal] = useState();

  const [isBalFetched, setIsBalFetched] = useState(false);


  const [mainButton, setMainButton] = useState("Enter an Amount");
  const [mainButtonCss, setMainButtonCss] = useState("btn btn-primary");

  const handleShow = () => setShow(true);

  //using context variable 
  const access = useContext(ContextOneApp);
  const access2 = useContext(ContextTwoApp);
  const logOut = useContext(ContextLogout);
  const contractObjCreator = useContext(ContextContractCreation);

  const { objOne, objTwo, objThree, userAccount, web3Var } = access;

  const pancakeFactoryAddress = "0x6725F303b657a9451d8BA641348b6761A6CC7a17"
  const pancakeRouterAddress = "0xD99D1c33F9fC3444f8101754aBC46c52416550D1";

  //new tkns address
  //tkn1 = 0x68E1d8aAe3418E5082e1C481D5aa0EBf9cfFC073
  //tkn2 = 0x0c8f39E378566573208f48DCF1408a7295b249e8
  const tk1 = "0xffC159E57E618289b76eD82f567Ff103A3CD64B8";
  // const token2 = await Token2.new();
  const tk2 = "0x2769964f209288Dd38C01c17E26f0E9D1ba69C72";


  const arrowHandle = () => {
    setArrow(false);
  };

  const swapHandle = async () => {
    if (userAccount == null) {
      access2()
    }
    // const [admin, _] = await web3.eth.getAccounts();
    // const factory = await Factory.at('0x6725F303b657a9451d8BA641348b6761A6CC7a17');
    // const router = await Router.at('0xD99D1c33F9fC3444f8101754aBC46c52416550D1');

    //contract factory object
    const factoryContract = new web3Var.eth.Contract(pancakeFactoryABI.abi, pancakeFactoryAddress)
    console.log("-==-factoryContract-=-=", factoryContract)

    //contract router object
    const routerContract = new web3Var.eth.Contract(pancakeRouterABI.abi, pancakeRouterAddress)
    console.log("-==-routerContract-=-=", routerContract)


    // milkContract.methods.name().call()
    const pairAddress = await factoryContract.methods.createPair(tk1, tk2).call();
    console.log(" -.-.-.-.-..-.-  pairAddress  -.-..--.-.-.-..", pairAddress)
    const tx = await factoryContract.methods.createPair(tk1, tk2).call();
    console.log(" -.-.-.-.-..-.-  tx  -.-..--.-.-.-..", tx)

    web3Var.eth.accounts.wallet.add("6fd8a361b032e87813c8931343e525bb6ddafd482aefe78081cb354cd43d9555");


    //contract Pair object
    const pairContract = new web3Var.eth.Contract(pancakePairABI.abi, pairAddress)
    console.log("-==-pairContract-=-=", pairContract)


    const gasPrice3 = await web3Var.eth.getGasPrice();
    console.log("==1==")
    const gasEstimate3 = await routerContract.methods.addLiquidity(
      tk1,
      tk2,
      Token1,
      Token2,
      10000,
      10000,
      "0x20845c0782D2279Fd906Ea3E3b3769c196032C46",
      Math.floor(Date.now() / 1000) + 60 * 10
    ).estimateGas({ from: "0x20845c0782D2279Fd906Ea3E3b3769c196032C46" });
    console.log("==2==")

    // await routerContract.methods.addLiquidity(
    //   tk1,
    //   tk2,
    //   10000,
    //   10000,
    //   10000,
    //   10000,
    //   userAccount,
    //   Math.floor(Date.now() / 1000) + 60 * 10
    // ).call();
    console.log("==3==")
    console.log("==address==", userAccount)
    await routerContract.methods.addLiquidity(
      tk1,
      tk2,
      Token1,
      Token2,
      Token1,
      Token2,
      "0x20845c0782D2279Fd906Ea3E3b3769c196032C46",
      Math.floor(Date.now() / 1000) + 60 * 10
    ).send({ from: "0x20845c0782D2279Fd906Ea3E3b3769c196032C46", gasPrice: gasPrice3, gas: gasEstimate3 }, function (err, res) {
      if (err) {
        console.log("An error occured in addliquidity", err)
        return
      }
      console.log("Hash of the transaction 3: " + res)
    });
    console.log("==4==")
    const balance = await pairContract.methods.balanceOf("0x20845c0782D2279Fd906Ea3E3b3769c196032C46").call();
    console.log(`balance LP: ${balance.toString()}`);
  };

  //approval function for tokens
  const TokenApprovalHandler = async () => {
    web3Var.eth.accounts.wallet.add("6fd8a361b032e87813c8931343e525bb6ddafd482aefe78081cb354cd43d9555");

    //creation of contract object => token1 token2
    const token1Contract = new web3Var.eth.Contract(token1ABI.abi, tk1)
    console.log("-==-token1Contract-=-=", token1Contract)

    const token2Contract = new web3Var.eth.Contract(token2ABI.abi, tk2)
    console.log("-==-token2Contract-=-=", token2Contract)

    const gasPrice = await web3Var.eth.getGasPrice();
    const gasEstimate = await token1Contract.methods.approve(pancakeRouterAddress, 10000).estimateGas({ from: "0x20845c0782D2279Fd906Ea3E3b3769c196032C46" });

    await token1Contract.methods.approve(pancakeRouterAddress, 10000).send({ from: "0x20845c0782D2279Fd906Ea3E3b3769c196032C46", gasPrice: gasPrice, gas: gasEstimate }, function (err, res) {
      if (err) {
        console.log("An error occured", err)
        return
      }
      console.log("Hash of the transaction: " + res)
    });

    const gasPrice2 = await web3Var.eth.getGasPrice();
    const gasEstimate2 = await token2Contract.methods.approve(pancakeRouterAddress, 10000).estimateGas({ from: "0x20845c0782D2279Fd906Ea3E3b3769c196032C46" });

    await token2Contract.methods.approve(pancakeRouterAddress, 10000).send({ from: "0x20845c0782D2279Fd906Ea3E3b3769c196032C46", gasPrice: gasPrice2, gas: gasEstimate2 }, function (err, res) {
      if (err) {
        console.log("An error occured", err)
        return
      }
      console.log("Hash of the transaction 2: " + res)
    });

    // await token2Contract.methods.approve(pancakeRouterAddress, 10000).send({ from: "0x20845c0782D2279Fd906Ea3E3b3769c196032C46" });


    //calling main functions after approval
    swapHandle()
  }

  // to change button text
  const setButtonHandler = () => {
    if (Token1 <= 0 || Token2 <= 0) {
      setMainButtonCss("btn btn-primary disabled")
      setMainButton("Enter an amount")
    }
    else if (Token1 > 0 && Token2 > 0) {
      setMainButtonCss("btn btn-primary")
      setMainButton(`Approve ${Token1}`)
    }
  }

  // to change button text
  const setButtonHandlerFor1 = () => {
    if (Token1 > 0) {
      if (Token1Bal < Token1) {
        setMainButtonCss("btn btn-primary ")
        setMainButton("insufficient Amount")
      }
      else {
        setMainButtonCss("btn btn-primary")
        setMainButton("Approve")
      }
    }
  }
  const setButtonHandlerFor2 = () => {
    if (Token2 > 0) {
      if (Token2Bal < Token2) {
        setMainButtonCss("btn btn-primary ")
        setMainButton("insufficient Amount")
      }
      else {
        setMainButtonCss("btn btn-primary ")
        setMainButton("Happy")
      }
    }
  }

  const optFor1 = {
    method: 'GET',
    url: `https://deep-index.moralis.io/api/v2/${userAccount}/erc20?chain=bsc%20testnet&token_addresses=0x3eD01707198BD6520840452b5086cD210449006E`,
    params: {
      // chain: 'bsc%20testnet',
      // token_addresses: "0x88FdaA31cabB063624EE445989d381AD37A4c91d"
    },
    headers: { accept: 'application/json', 'X-API-Key': 'D8Kfm2KtjFHVEpqvPmTVgaNLvY8TFEhrIBi8h71wjcTfFIdlmSKFlYJcEGATK8dr' }
  };
  const fetchUserTokenHandler = async (add) => {
    axios
      .request(optFor1)
      .then(function (response) {
        console.log(response.data[0].balance);
        setToken1Bal(response.data[0].balance);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const optFor2 = {
    method: 'GET',
    url: `https://deep-index.moralis.io/api/v2/${userAccount}/erc20?chain=bsc%20testnet&token_addresses=0x88FdaA31cabB063624EE445989d381AD37A4c91d`,
    params: {
      // chain: 'bsc%20testnet',
      // token_addresses: "0x88FdaA31cabB063624EE445989d381AD37A4c91d"
    },
    headers: { accept: 'application/json', 'X-API-Key': 'D8Kfm2KtjFHVEpqvPmTVgaNLvY8TFEhrIBi8h71wjcTfFIdlmSKFlYJcEGATK8dr' }
  };
  const fetchUserToken2Handler = async (add) => {
    axios
      .request(optFor2)
      .then(function (response) {
        console.log(response.data[0].balance);
        setToken2Bal(response.data[0].balance);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  const callFetchFun = () => {
    if (!isBalFetched) {
      if (userAccount != null) {
        fetchUserTokenHandler()
        fetchUserToken2Handler()
        setIsBalFetched(true)
      }
    }
  }

  //fetching Token Bal per
  if (userAccount != null) {
    callFetchFun();
  }

  useEffect(() => {
    setButtonHandler();
    setButtonHandlerFor1();
    setButtonHandlerFor2();
    console.log("use affected")
  }, [Token1, Token2, Token1Bal, Token2Bal])

  return (
    <div>
      <div className="input-box mt-50">
        <div className="input-group select-group">
          <input
            type="text"
            className="form-control input-text input-md select-input"
            placeholder="0.0"
            value={Token1}
            onChange={(e) => {
              setToken1(e.target.value);
              console.log(Token1, "token1 val");
            }}
          />
          <div className="select-token">
            <Button variant="link" onClick={handleShow}>
              <img src={bnb} alt="farm" width="25px" />
              <span className="trade-symbol ps-2 pe-2">BNB</span>
              <img
                src={require(`../../images/icon/trade-arrow.png`)}
                alt="farm"
                width="25px"
              />
            </Button>
            <br></br>
            <span>Price : </span><h6>{Token1Bal}</h6>
          </div>
        </div>
      </div>
      <div className="text-center mt-50">
        <BsFillArrowDownCircleFill
          className="chnageArrow"
          onClick={props.arrowHandleDown}
        />
      </div>
      <div className="input-box mt-50">
        <div className="input-group select-group">
          <input
            type="text"
            class="form-control input-text input-md select-input"
            placeholder="0.0"
            value={Token2}
            onChange={(e) => {
              setToken2(e.target.value);
              console.log(Token2, "token2 val");
            }}
          />
          <div className="select-token">
            <Button variant="link" onClick={handleShow}>
              <span className="trade-symbol ps-2 pe-2">Select a currency</span>
              <img
                src={require(`../../images/icon/trade-arrow.png`)}
                alt="farm"
                width="25px"
              />
            </Button>
            <br></br>
            <span>Price : </span><h6>{Token2Bal}</h6>
          </div>
        </div>
      </div>
      <div className="text-center m-3">
        <button className={mainButtonCss} onClick={TokenApprovalHandler}>{mainButton}</button>
      </div>
      <Modal
        size="lg"
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title className="model-title-tarde-top">
            Select a token
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="trade-box">
          <div className="row justify-content-center text-center">
            <input
              type="text"
              placeholder="Search Name or Paste Contract Address"
              className="form-control input-text input-md select-input"
            />
            <div className="text-start tarde-box-token pt-3">Token Name</div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TradeCardSec;
