import React,{ useState } from "react";
import { Modal } from "react-bootstrap";

const AfterAccount = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
    <div className="row">
        <p>Your tickets for this round</p>
        <p>0</p>
        <div className="col-6">
            <div>View your tickets</div>
        </div>
        <div className="col-6">
            <button type="button"  className='blue-box text-white'>Approve MILK</button>
        </div>
    </div>
    <div className="row mt-5">
        <div className="col-12">
            <button type="button" onClick={handleShow}>View your tickets</button>
        </div>
    </div>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{fontSize:"18px"}}>My Tickets (Total: My)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          NO Tickets
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AfterAccount