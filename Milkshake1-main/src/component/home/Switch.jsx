import React, { useState } from "react";
import Switch from "react-switch";
import FarmCard from "../farm/FarmCrad";

const SwitchApp = () => {
  const [checked, setChecked] = useState(false);
  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };

  return (
    <>
        <Switch
          onChange={handleChange}
          checked={checked}
          className="react-switch"
        />
        <br/>
        {checked ? <FarmCard
          title="MILK-BUSD LP"
          img="milk-busd"
          apr="61.57"
          deposit="1"
          milkEarn="0"
          farmClass="1"
        /> : "off"}
    </>
  );
};

export default SwitchApp;
