/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import bnb from "../../images/icon/bnb.png";
import Button from "react-bootstrap/Button";

import Modal from "react-bootstrap/Modal";

const TradeCardSec = (props) => {
  const [show, setShow] = useState(false);
  const [arrow, setArrow] = useState(true);

  const [Tokon1, setTokon1] = useState();
  const [Tokon2, setTokon2] = useState();

  const handleShow = () => setShow(true);

  return (
    <div>
      <div className="input-box mt-50">
        <div className="input-group select-group">
          <input
            type="text"
            class="form-control input-text input-md select-input"
            placeholder="0.0"
            value={Tokon2}
            onChange={(e) => {
              setTokon2(e.target.value);
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
          </div>
        </div>
      </div>
      <div className="text-center mt-50"> 
        <BsFillArrowUpCircleFill
          className="chnageArrow"
          onClick={props.arrowHandleDown}
        />
      </div>      
      <div className="input-box mt-50">
        <div className="input-group select-group">
          <input
            type="text"
            className="form-control input-text input-md select-input"
            placeholder="0.0"
            value={Tokon1}
            onChange={(e) => {
              setTokon1(e.target.value);
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
          </div>
        </div>
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
