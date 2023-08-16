import React from "react";
import img36 from "../images/others/bubble-36.png"
import img14 from "../images/others/bubble-14.png"
import img13 from "../images/others/bubble-13.png"
import img31 from "../images/others/bubble-31.png"
import img1 from "../images/others/bubble-1.png"

const HomeBanner = () => {
  return (
    <div className="section main-banner">

      <ul className="list-unstyled shape-group-20">
      <li className="shape shape-1">
          <img
            src={img36}
            alt="Bubble"
          />
        </li>
        
      <li className="shape shape-4">
          <img
            src={img14}
            alt="Bubble"
          />
        </li>
        <li className="shape shape-5">
          <img
            src={img13}
            alt="Bubble"
          />
        </li>
        <li className="shape shape-7">
          <img
            src={img31}
            alt="Bubble"
          />
        </li>
        <li className="shape shape-8">
          <img src={img1} alt="Bubble" />
        </li>
      </ul>
    </div>
  );
};

export default HomeBanner;
