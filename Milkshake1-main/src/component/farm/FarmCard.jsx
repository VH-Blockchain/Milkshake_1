import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useWeb3React } from '@web3-react/core'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Web3 from "web3";
import { ethers } from "ethers";
import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs";
import BigNumber from "bignumber.js";
import cakeabi from "../../abi/cake.json";
import masterChefAbi from "../../abi/masterchef.json";
import {milkContracts, masterChefContracts, lotteryContracts, lpContract} from "../../common/abicalls"


// lp address
// 0xaBCB20886B4749205198d627FF6ccFdffFe97112

const FarmCard = ({lpAddresses,apr,roiFunction,
  pid,
  farmClass,
  title,
  farmImg,
  multiplier,
  deposit,
  userAccount,
  milkEarn,
  login,
  stakedBalance,
  quoteTokenAdresses,
  totliquidity}) => {
  const [show, setShow] = useState(false);
  const [showStack, setShowStack] = useState(false);
  const [showUnStack, setShowUnStack] = useState(false);
  const [roi1, setRoi1] = useState({});
  const [roi2, setRoi2] = useState({});
  const [roi3, setRoi3] = useState({});
  const [roi4, setRoi4] = useState({});
  const [allowanceRes, setAllowanceRes] = useState(0);
  const [toggle, setToggle] = useState(true);
  const [stackValue, setStackValue] = useState(0);
  const [stackValueN, setStackValueN] = useState(0);

  const [unStackValue, setUnStackValue] = useState(0);
  const [unStackValueN, setUnStackValueN] = useState(0);

  const handleClose = () => setShow(false);
  const handleCloseStack = () => setShowStack(false);
  const handleCloseUnStack = () => setShowUnStack(false);
  const handleShow = () => setShow(true);
  const handleShowStack = () => setShowStack(true);
  const handleShowUnStack = () => setShowUnStack(true);



  const wei = 1000000000000000000;

  const { account, activate, deactivate } = useWeb3React()

  // const LpAddress = "0xAb6DEeC8C64aE4964Ba5e153d12b8acD1632a29F";
  const masterChefContractAddress =
    "0x9c19eB54c759c9369C788D6554f08Bb6cAdab10d";

  const cal = async (LpAddress) => {
    if (account) {

      const data = await lpContract(LpAddress).methods
        .approve(masterChefContractAddress, ethers.constants.MaxUint256)
        .send({ from: account });

      // console.log(data.status, "data");
    } else {


      const data = await lpContract(LpAddress).methods
        .approve(masterChefContractAddress, ethers.constants.MaxUint256)
        .send({ from: account });

      // console.log(data.status, "data");
    }
  };

  const allowanceHandler = async (_lpContractAddress) => {
    const masterChefContractAddress1 =
      "0x9c19eB54c759c9369C788D6554f08Bb6cAdab10d";


    const allowanceRes1 = await lpContract(_lpContractAddress).methods
      .allowance(account, masterChefContractAddress1)
      .call();
    setAllowanceRes(allowanceRes1);
    // return allowanceRes;
  };


  const Harvest = async (pid, amount) => {
    if (account) {
      console.log("IF");
      const masterChefAddress = "0x9c19eB54c759c9369C788D6554f08Bb6cAdab10d";

      const harvestResponse = masterChefContracts().methods
        .deposit(pid, "0")
        .send({ from: account });

      console.log(await harvestResponse, "harvestResponse");
    } else {
      console.log("ELSE");
      // const harvestHAndler = async (masterChefContract, pid, account) => {
      const masterChefAddress = "0x9c19eB54c759c9369C788D6554f08Bb6cAdab10d";

      const harvestResponse = masterChefContracts().methods
        .deposit(pid, "0")
        .send({ from: account })
        .on("transactionHash", (tx) => {
          return tx.transactionHash;
        });
    }
  };

  // stake

  const stackHandler = async (pid, amount) => {
    // web3.eth.setProvider(Web3.givenProvider);
    if (account) {
      console.log("IF");
      console.log(amount, "stackValue");
      console.log(pid, "pid");

      const LpAddress = "0xaBCB20886B4749205198d627FF6ccFdffFe97112";
      const masterChefContractAddres1s =
        "0x9c19eB54c759c9369C788D6554f08Bb6cAdab10d";

      // stake
      // const stk = await masterChefContract.methods
      //   .deposit(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
      //   .send({ from: account })
      const stk = await masterChefContracts().methods
        .deposit(
          pid,
          new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()
        )
        .send({ from: account });
      console.log(stk, "stk");
    } else {
      console.log("ELSE");
      // 0xaBCB20886B4749205198d627FF6ccFdffFe97112
      const LpAddress = "0xaBCB20886B4749205198d627FF6ccFdffFe97112";

      // stake
      const stk = await masterChefContracts().methods
        .deposit(
          pid,
          new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()
        )
        .send({ from: account });
      console.log(stk, "stk");
    }
  };

  const unStakeHandler = async (pid, amount) => {
    if (account) {

      const unstakeResEst = await masterChefContracts().methods
        .withdraw(
          pid,
          new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()
        )
        .estimateGas({ from: account });
      console.log(await unstakeResEst, "unstakeRes");

      const unstakeRes = await masterChefContracts().methods
        .withdraw(
          pid,
          new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()
        )
        .send({ from: account });
      console.log(await unstakeRes, "unstakeRes");
    } else {
      console.log("ELSE");
      console.log("PID amount", pid, amount);

      const masterChefAddress = "0x9c19eB54c759c9369C788D6554f08Bb6cAdab10d";

      const unstakeRes = await masterChefContracts().methods
        .withdraw(
          pid,
          new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()
        )
        .send({ from: account });
      console.log(await unstakeRes, "unstakeRes");
    }
  };

  const fetchMaxBal = async () => {
    if (account) {

      const BalanceRes = await masterChefContracts().methods
        .balanceOf(account)
        .call();
      console.log((await BalanceRes) / wei, "BalanceRes");
      const convertedVal = (await BalanceRes) / wei;
      setStackValueN(convertedVal);
    } else {
      // console.log("ELSE");
      // console.log("lpAddress", lpAddresses[56]);
    
      const BalanceRes = await masterChefContracts().methods
        .balanceOf(account)
        .call();
      console.log(await BalanceRes, "BalanceRes");
      console.log((await BalanceRes) / wei, "BalanceRes");
      const convertedVal = (await BalanceRes) / wei;
      setStackValueN(convertedVal);
    }
  };
  const fetchMaxBalUnstake = async () => {
    if (account) {

      const BalanceRes = await masterChefContracts().methods
        .balanceOf(account)
        .call();
      console.log((await BalanceRes) / wei, "BalanceRes");
      const convertedVal = (await BalanceRes) / wei;
      setStackValueN(convertedVal);
    } else {
      console.log("ELSE");
      console.log("lpAddress", lpAddresses[56]);

      const BalanceRes = await masterChefContracts().methods
        .balanceOf(account)
        .call();
      console.log(await BalanceRes, "BalanceRes");
      console.log((await BalanceRes) / wei, "BalanceRes");
      const convertedVal = (await BalanceRes) / wei;
      setStackValueN(convertedVal);
    }
  };

  const maxUnStack = () => {
    setUnStackValue(stakedBalance);
  }

  const d = async (a, c) => {
    if (a === 1) {
      const b = await roiFunction(a, c);
      setRoi1(b);
    } else if (a === 7) {
      const b = await roiFunction(a, c);
      setRoi2(b);
    } else if (a === 30) {
      const b = await roiFunction(a, c);
      setRoi3(b);
    } else if (a === 365) {
      const b = await roiFunction(a, c);
      setRoi4(b);
    }
  };

  useEffect(() => {
    d(1, apr);
    d(7, apr);
    d(30, apr);
    d(365, apr);
    allowanceHandler(lpAddresses[56]);
    fetchMaxBal();
  });

  const pids = pid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const done = await stackHandler(pids, stackValue);
    console.log(done, "stackValue");
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    const done = await unStakeHandler(pids, stackValue);
    console.log(done, "stackValue");
  };

  // console.log(allowanceRes, "roi1");

  return (
    <>
      <div className="col-lg-4 col-md-6">
        <div className="farm-grid">
          <div className="row">
            <div className={`farm-top-${farmClass} text-center`}>
              <div className="text-white farm-card-heading">{title}</div>
              <div className="d-flex justify-content-center">
                <img
                  className="farms-img"
                  src={require(`../../images/icon/${farmImg}.png`)}
                  alt="farm"
                />
                <div className="red-box">
                  <div className="text-white">
                    {/* <BsFillHeartFill /> */}
                    cal
                    {multiplier}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content">
            <div>
              <div className="row row-cols-2">
                <div className="col-md-6">
                  <div className="earn mt-5">APR:</div>
                  <div className="earn mt-4">Earn:</div>
                  <div className="deposit mt-4">Deposit Fee:</div>
                </div>
                <div className="col-md-6 mt-5">
                  <div className="blue-box text-white">
                    <Button variant="link" onClick={handleShow}>
                      <img
                        src={require(`../../images/icon/calculator.png`)}
                        alt="farm"
                        width="17px"
                      />
                    </Button>
                    <span>{apr}%</span>
                  </div>
                  <div className="blue-box text-white">MILK</div>
                  <div className="blue-box deposit text-white">
                    {deposit / 100}%
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="earn mt-4">MILK EARNED</div>
                <div className="mt-2">{milkEarn}</div>
              </div>
              <div className="col-md-6 mt-5">
                {account ? (
                  milkEarn > 0 ? (
                    <button
                      to="/"
                      className="blue-box text-white"
                      onClick={async () => {
                        await Harvest(pid, milkEarn);
                      }}
                    >
                      Harvest
                    </button>
                  ) : (
                    <button to="/" className="blue-box text-white" disabled>
                      Harvest
                    </button>
                  )
                ) : (
                  <button to="/" className="blue-box text-white" disabled>
                    Harvest
                  </button>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                {!account ? (
                  <button
                    className="blue-box mt-4 text-white"
                  >
                    Unlock Wallet
                  </button>
                ) : allowanceRes > 0 ? (
                  <div className="row">
                    <div className="col-md-6">
                      <div className="earn mt-4">STAKED</div>
                      <div className="mt-2">{stakedBalance}</div>
                    </div>
                    <div className="col-md-6 mt-5">
                      <div className="row">
                        <div className="col-md-6">
                          <button
                            to="/"
                            className="blue-box text-white"
                            onClick={handleShowStack}
                          >
                            <BsFillPlusCircleFill />
                          </button>
                        </div>
                        <div className="col-md-6">
                          <button
                            to="/"
                            className="blue-box text-white"
                            onClick={handleShowUnStack}
                          >
                            <BsFillDashCircleFill />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    className="blue-box mt-4 text-white"
                    onClick={() => {
                      cal(lpAddresses[56]);
                    }}
                  >
                    Approve Contract
                  </button>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 text-center mt-3">
                <hr />
                <button
                  className="btn-farm-link"
                  onClick={() => setToggle((toggle) => !toggle)}
                >
                  {toggle ? (
                    <>
                      Deatils <BsChevronCompactDown />
                    </>
                  ) : (
                    <>
                      Hide <BsChevronCompactUp />
                    </>
                  )}
                </button>
                {toggle ? (
                  ""
                ) : (
                  <div className="row d-flex">
                    <div className="col">
                      <div className="earn mt-3">Deposit:</div>
                      <div className="earn mt-4">Total Liquidity:</div>
                    </div>
                    <div className="col">
                      <div className="mt-3">
                        <a
                          className="btn-link"
                          href={`https://v2exchange.milkshakeswap.finance/#/add/${quoteTokenAdresses[56]}/0xc9bCF3f71E37579A4A42591B09c9dd93Dfe27965`}
                          // href="https://v2exchange.milkshakeswap.finance/#/add/0xe9e7cea3dedca5984780bafc599bd69add087d56/0xc9bCF3f71E37579A4A42591B09c9dd93Dfe27965"
                          target="_blank"
                        >
                          {title}
                        </a>
                      </div>
                      <div className="earn mt-4">
                        ${Math.floor(totliquidity)}
                      </div>
                    </div>
                    <div className="mt-4">
                      <a
                        href={`https://bscscan.com/token/${lpAddresses[56]}`}
                      >
                        View on BscScan
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Modal show={show} onHide={handleClose} className="h">
              <Modal.Header closeButton>
                <Modal.Title>ROI</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row justify-content-center text-center">
                  <table className="striped bordered hover">
                    <tr>
                      <th>TIMEFRAME</th>
                      <th>ROI</th>
                      <th>MILK PER $1000</th>
                    </tr>
                    <tr>
                      <br />
                    </tr>
                    <tr>
                      <td>1d</td>
                      <td>{roi1.roi}%</td>
                      <td>{roi1.per}</td>
                    </tr>
                    <tr>
                      <td>7d</td>
                      <td>{roi2.roi}%</td>
                      <td>{roi2.per}</td>
                    </tr>
                    <tr>
                      <td>30d</td>
                      <td>{roi3.roi}%</td>
                      <td>{roi3.per}</td>
                    </tr>
                    <tr>
                      <td>365d</td>
                      <td>{roi4.roi}%</td>
                      <td>{roi4.per}</td>
                    </tr>
                  </table>
                  <p>
                    Calculated based on current rates. Compounding once daily.
                    Rates are estimates provided for your convenience only, and
                    by no means represent guaranteed returns.
                  </p>
                  <a
                    to="https://pancakeswap.finance/swap#/add/0xe9e7cea3dedca5984780bafc599bd69add087d56/0xc9bCF3f71E37579A4A42591B09c9dd93Dfe27965"
                    className="btn btn-default"
                  >
                    Get {title}
                  </a>
                </div>
              </Modal.Body>
            </Modal>

            <Modal show={showStack} onHide={handleCloseStack} size="lg">
              <Modal.Header closeButton>
                <div>Deposit {title} Tokens</div>
              </Modal.Header>
              <form onSubmit={handleSubmit}>
                <Modal.Body>
                  <div className="row">
                    <div className="float-end">
                      {stackValueN} {title} Available
                    </div>
                    <div
                      className="d-flex justify-content-between"
                      style={{ marginTop: "20px" }}
                    >
                      <input
                        type="number"
                        class="form-control"
                        placeholder="0"
                        value={stackValue}
                        onChange={(e) => {
                          setStackValue(e.target.value);
                        }}
                        style={{ width: "40%", marginLeft: "10px" }}
                      />
                      {title}
                      <span
                        className="blue-box text-white"
                        onClick={() => {
                          setStackValue(stackValueN);
                        }}
                        style={{
                          width: "10%",
                          cursor: "pointer",
                          marginRight: "30px",
                        }}
                      >
                        Max
                      </span>
                    </div>
                    <div className="float-end mb-2 mt-3">
                      {new BigNumber(stackValue || 0)
                        .times(deposit / 10000)
                        .toString()}{" "}
                      {title}
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <button to="/" className="blue-box text-white">
                    Confirm
                  </button>
                </Modal.Footer>
              </form>
            </Modal>

            <Modal show={showUnStack} onHide={handleCloseUnStack} size="lg">
              <Modal.Header closeButton>
                <div>Deposit {title} Tokens Unstake</div>
              </Modal.Header>
              <form onSubmit={handleSubmit2}>
                <Modal.Body>
                  <div className="row">
                    <div className="float-end">
                      {stakedBalance} {title} Available
                    </div>
                    <div
                      className="d-flex justify-content-between"
                      style={{ marginTop: "20px" }}
                    >
                      <input
                        type="number"
                        class="form-control"
                        placeholder="0"
                        value={unStackValue}
                        onChange={(e) => {
                          setUnStackValue(e.target.value);
                        }}
                        style={{ width: "40%", marginLeft: "10px" }}
                      />
                      {title}
                      <span
                        className="blue-box text-white"
                        onClick={maxUnStack}
                        style={{
                          width: "10%",
                          cursor: "pointer",
                          marginRight: "30px",
                        }}
                      >
                        Max
                      </span>
                    </div>
                    <div className="float-end mb-2 mt-3">
                      {new BigNumber(unStackValue || 0)
                        .times(deposit / 10000)
                        .toString()}{" "}
                      {title}
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <button to="/" className="blue-box text-white">
                    Confirm
                  </button>
                </Modal.Footer>
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default FarmCard;
