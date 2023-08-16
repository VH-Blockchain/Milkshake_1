import React from 'react';
import { Link } from 'react-router-dom';


const Logo: React.FC<{}> = () => {
    return (
        <Link to={"/"}>
            <img className="light-version-logo" src={require("../logo/milkshakeswap-logo.png").default} width="250px" alt="logo" />
        </Link>
    )
}


export default Logo;