import React from "react";
import img14 from "../../images/others/bubble-14.png"
import img31 from "../../images/others/bubble-31.png"
import img38 from "../../images/others/bubble-38.png" 
import UnlockButton from "common/Unlock";

const World = () => {
  return (
    <>
      <div className="container mt-150">
        <div className="text-center world-heading">$MILK IS IN EVERY AIR</div>
        <UnlockButton/>
        <div className="world animation" />
        <div className="section man-banner">
          <ul className="list-unstyled shape-group-20"> 
            <li className="shape shape-4">
              <img
                src={img14}
                alt="Bubble"
              />
            </li>
            <li className="shape shape-5">
              <img
                src={img38}
                alt="Bubble"
              />
            </li>
            <li className="shape shape-7">
              <img
                src={img31}
                alt="Bubble"
              />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default World;
