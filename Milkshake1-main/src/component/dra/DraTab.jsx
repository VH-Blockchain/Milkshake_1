/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import { BsArrowRightCircle } from "react-icons/bs";

const TardeTab = () => {

  return (
    <>
      <div className="row justify-content-center">
        <div class="col-md-10 mt-50">
          <div className="dra-img">
            <div className="w-50 m-auto dra-input">
              <input className="dra-input-box me-4" type="text" />
              <button type="submit" className="blue-box text-white w-25">
                <BsArrowRightCircle style={{ fontWeight: "900", fontSize:"40"  }} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 mt-50">
          <img
            className="pe-4"
            src={require(`../../images/layout/dra-down.gif`)}
            alt="farm"
          />
        </div>
      </div>
    </>
  );
};

export default TardeTab;
