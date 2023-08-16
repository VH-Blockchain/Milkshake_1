import Sky from "react-sky";

// you can pass imported images to Sky
import bnb from "../images/icon/bnb.png";
import btc1 from "../images/icon/icon-1.png";
import btc2 from "../images/icon/icon-2.png";
import btc3 from "../images/icon/icon-3.png";

const ReactSky = () => {
  return (
    <div>
      <Sky
        images={{
          /* FORMAT AS FOLLOWS */
          0: bnb,
          1: btc1,
          2: btc2,
          3: btc3,
        }}
        how={
          130
        } /* Pass the number of images Sky will render chosing randomly */
        time={40} /* time of animation */
        size={"100px"} /* size of the rendered images */
        background={"palettedvioletred"} /* color of background */
      />
    </div>
  );
};

export default ReactSky;
