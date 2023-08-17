/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsFillHeartFill } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs";
import Harvest from "./Harvest";

const FarmCard = (props) => {
  const [show, setShow] = useState(false);
  var [toggle, setToggle] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // console.log(roi1, "roi1");

  return (
    <>
      <div className="col-lg-4 col-md-6">
        <div className="farm-grid">
          <div className="row">
            <div className={`farm-top-${props.farmClass} text-center`}>
              <div className="text-white farm-card-heading">{props.title}</div>
              <div className="d-flex justify-content-center">
              <img
                  className="farms-img"
                  src={require(`../../images/icon/${props.img}.png`)}
                  alt={props.img}
                />
                <div className="red-box">
                  <div className="text-white">
                    <BsFillHeartFill />
                    0
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content">
            <div>
              <div className="row row-cols-2">
                <div className="col-md-6">
                  <div className="earn mt-4">Earn:</div>
                  <div className="deposit mt-4">Deposit Fee:</div>
                </div>
                <div className="col-md-6 mt-3">
                  <div className="blue-box text-white">MILK</div>
                  <div className="blue-box deposit text-white">
                    {props.deposit / 100}%
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="row">
              <div className="col-md-6">
                <div className="earn mt-4  text-center">MILK EARNED</div>
                <div className="blue-box mt-3 text-white">
                  {props.milkEarn}
                </div>
                {props.userAccount ? (
                  <button
                    to="/"
                    className="blue-box text-white"
                    onClick={async () => {
                      await Harvest();
                    }}
                  >
                    Stake
                  </button>
                ) : (
                  <button to="/" className="blue-box text-white" disabled>
                    Stake
                  </button>
                )}
              </div>
              <div className="col-md-6">
              <div className="earn mt-4 text-center">STAKED</div>
                <div className="blue-box mt-3 text-white">
                  {props.stakedBalance}
                </div>
                {props.userAccount ? (
                  <button
                    to="/"
                    className="blue-box text-white"
                    onClick={async () => {
                      await Harvest();
                    }}
                  >
                    Harvest
                  </button>
                ) : (
                  <button to="/" className="blue-box text-white" disabled>
                    Harvest
                  </button>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                {!props.userAccount ? (
                  <button
                    className="blue-box mt-4 text-white"
                    onClick={props.login}
                  >
                    Unlock Wallet
                  </button>
                ) : (
                  ""
                )}
              </div>
                </div> */}
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
                    </div>
                    <div className="col">
                      <div className="mt-3">
                        <a
                          className="btn-link"
                          href={`https://v2exchange.milkshakeswap.finance/#/add/0xe9e7cea3dedca5984780bafc599bd69add087d56/0xc9bCF3f71E37579A4A42591B09c9dd93Dfe27965`}
                          // href="https://v2exchange.milkshakeswap.finance/#/add/0xe9e7cea3dedca5984780bafc599bd69add087d56/0xc9bCF3f71E37579A4A42591B09c9dd93Dfe27965"
                          target="_blank"
                        >
                          {props.title}
                        </a>
                      </div>
                    </div>
                    <div className="mt-4">
                      <a
                        href={`https://bscscan.com/token/${props.lpAddresses}`}
                      >
                        View on BscScan
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FarmCard;
