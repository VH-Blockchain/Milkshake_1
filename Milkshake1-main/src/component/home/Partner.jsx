/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from "react";
import { BsChevronCompactDown } from "react-icons/bs";
import Data from "../../data/Partner.json";

const Partner = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <h5 className="partner-heading text-center">Find Us On</h5>
          <div className="col-lg-10 col-sm-12">
            <div className="partner-top" />
            <div className="partner">
              <div className="d-flex">
              {Data.slice(0, 6).map((data, index) => (
                <div className="col-md-2 mbm-5">
                  <a href={data.url} target="_blank">
                    <img
                      src={require(`../../images/partner/${data.img}.png`).default}
                      alt="Demo"
                      className="partner-img"
                    />
                  </a>
                </div>
              ))}
              </div>
              <button
              type="button"
                className="btn-link"
                onClick={() => setToggle(!toggle)}
              >
                <BsChevronCompactDown />
              </button>
              <div
                className="row mt-4 row-cols-6"
              >
                {toggle
                  ? Data.slice(6, 27).map((data,index) => (
                      <div className="col-md-2 mb-5">
                        <a href={data.url} target="_blank">
                          <img
                            src={require(`../../images/partner/${data.img}.png`).default}
                            alt="Demo"
                            className="partner-img"
                          />
                        </a>
                      </div>
                    ))
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Partner;
