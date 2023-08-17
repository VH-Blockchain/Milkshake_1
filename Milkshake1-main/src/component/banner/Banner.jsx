import React from "react"
import img1 from "../../images/others/bubble-36.png"
import img2 from "../../images/others/bubble-14.png"

const HomeBanner = () => {
  return (
    <div className="section main-banner">

      <ul className="list-unstyled shape-group-20">
        <li className="shape shape-1">
          <img
            src={img1}
            alt="Bubble"
          />
        </li>
        <li className="shape shape-4">
          <img
            src={img2} 
            alt="Bubble"
          />
        </li>
      </ul>
    </div>
  );
};

export default HomeBanner;
