/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import TradeCrad from "./TradeCrad";

const TardeTab = () => {

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="trade-ta">
            <div class="lottery">
              <Link class="lottery-link active">SWAP</Link>
              <Link to="/liqudity" class="lottery-link">
                LIQUIDITY
              </Link>
              <Link to="/post-draw" class="lottery-link">
                BRIDGE
              </Link>
            </div>
            <div className="tab-content mt-50" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                <TradeCrad
                  title="Exchange"
                  desc="Trade Token in an Instant"
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

export default TardeTab;
