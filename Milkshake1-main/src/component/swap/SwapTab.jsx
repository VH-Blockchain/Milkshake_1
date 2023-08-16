/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import SwapCrad from "./SwapCrad";

const SwapTab = () => {

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="trade-ta">
            <div class="lottery">
              <Link to="/trade" class="lottery-link">SWAP</Link>
              <Link class="lottery-link active">
                LIQUIDITY
              </Link>
              <a href="https://www.bnbchain.org/en/bridge" class="lottery-link">
                BRIDGE
              </a>
            </div>
            <div className="tab-content mt-50" id="pills-tabContent"> 
              <div
                className="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                <SwapCrad
                  title="Liquidity"
                  desc="Add liquidity to receive LP"  
                  img="milk-busd"
                  apr="3.5"
                  deposit="1"
                  milkEarn="0"
                  farmClass="1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SwapTab;
