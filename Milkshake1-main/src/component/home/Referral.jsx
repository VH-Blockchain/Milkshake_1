
import React,{useState} from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard"; 
import useGetPriceData from 'hooks/useGetPriceData'
import { useWeb3React } from '@web3-react/core'
import {milkContracts, masterChefContracts, lotteryContracts} from "../../common/abicalls"
import img1 from "../../images/layout/referral.png"
// import { useWallet } from "@binance-chain/bsc-use-wallet";

const Footer = () => {
  const [isregistered, setIsregistered] = React.useState(false);

  const { account, activate, deactivate } = useWeb3React()
  const cakePriceUsd = useGetPriceData()



  const isRegister = async (userAccount) => {
    if (userAccount) {
      const response = await masterChefContracts().methods.affinfo(userAccount).call();
      setIsregistered(response.isregistered);
      // setIsregistered(false);
    }
  };

  React.useEffect(() => {
    isRegister(account);
  }, [account])
  

  return (
    <footer className="footer">
      <div className="container-fluid white-bg-ref">
        <div className="row justify-content-around">
          <div className="col-xl-5 col-md-5">
            <div className="ref-heading mt-100 mpt-150 mt-250">
              MilkshakeSwap.finance users, earn a passive income with the help
              of unique algoric creation named DRA (Decentralized referral
              algorithm)
            </div>
            <Link className="btn-connect mt-5 me-5" to="/dra">
              Chekout DRA
            </Link>
            <CopyToClipboard
              text={`https://milkshakeswap.finance/?ref=${isregistered ? account : 'false'}`}
              onCopy={() => alert("Copy")}
            >
              <button type="button" className="btn-banner">Copy Link</button>
            </CopyToClipboard>
          </div>
          <div className="col-xl-5 col-md-5">
            <div className="mt-250 mpt-150 text-start animation">
              <img src={img1} alt="" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
