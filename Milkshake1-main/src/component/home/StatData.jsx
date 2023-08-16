import { Link } from "react-router-dom";
 
const StatData = (props) => {
  return (
    <div className="col-xl-3 col-md-6">
      <div className="services-grid  bg-1">
        <div className="thumbnail">
          <img
            src={require(`../../images/icon/arrow-up.png`)}
            alt="icon"
            className="icon-img"
          />
        </div>
        <div className="content">
          <h5 className="stat-title">
            <Link to="/">{props.title}</Link>
          </h5>
          <h5 className="title">
            {/* <Link to="/">${props.mcSupply.toLocaleString()}</Link> */}
            
          </h5>
        </div>
      </div>
    </div>
  );
};

export default StatData;
