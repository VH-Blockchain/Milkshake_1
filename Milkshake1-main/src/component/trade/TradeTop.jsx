/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const TradeTop = (props) => {
  const [showSetting, setShowSetting] = useState(false);
  const handleShow = () => setShowSetting(true);

  const [showHistory, setShowHistory] = useState(false);
  const handleShowHistory = () => setShowHistory(true);

  return (
    <div className="row">
      <div className="trade-top">
        <div className="float-start ps-4">
          <div className="text-white trade-card-heading">{props.title}</div>
          <div className="text-white trade-card-desc">{props.desc}</div>
        </div>
        <div className="float-end">
          <Button variant="link" onClick={handleShow}>
            <img
              className="pe-4"
              src={require(`../../images/icon/settings.png`)}
              alt="farm"
              width="65"
            />
          </Button>
          <Button variant="link" onClick={handleShowHistory}>
            <img
              className="pe-2"
              src={require(`../../images/icon/history.png`)}
              alt="farm"
              width="50"
            />
          </Button>
        </div>
      </div>

      {/* modal for setting */}
      <Modal
        show={showSetting}
        size="lg"
        onHide={() => setShowSetting(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        centered
      >
        <Modal.Header closeButton className="model-header-setting">
          <Modal.Title className="model-title-tarde-top">Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="mb-3 modal-top-tag">Recent Transactions</div>
            <div className="col-lg-2 rmp1">
              <input
                placeholder="0.1%"
                className="form-control input-modal-top input-md"
                disabled
              />
            </div>
            <div className="col-lg-2 rmp">
              <input
                placeholder="0.5%"
                className="form-control input-text input-md"
                disabled
              />
            </div>
            <div className="col-lg-2 rmp">
              <input
                placeholder="1%"
                className="form-control input-text input-md"
                disabled
              />
            </div>
            <div className="col-lg-6">
              <input
                type="number"
                placeholder="0.1%"
                className="form-control input-text input-md"
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="mb-3 modal-top-tag">Transaction deadline ?</div>
            <div className="col-lg-6">
              <input
                type="number"
                placeholder="0.1%"
                className="form-control input-text input-md select-input"
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* modal for history */}

      <Modal
        show={showHistory}
        size="lg"
        onHide={() => setShowHistory(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        centered
      >
        <Modal.Header closeButton className="model-header-setting">
          <Modal.Title className="model-title-tarde-top">Recent Transactions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="mb-3 modal-top-tag ms-3">Please connect your wallet to view your recent transactions</div>
          </div>
        </Modal.Body>
      </Modal>

    </div>
  );
};

export default TradeTop;
