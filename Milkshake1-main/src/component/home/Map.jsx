import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { ProgressBar } from "react-bootstrap";

const Info = () => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    fetchMilk(days);
  }, [days]);

  const fetchMilk = async (days = 365) => {
    try {
      let { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/milkshakeswap/market_chart?vs_currency=usd&days=${days}`
      );
      setFlag(true);
      setHistoricData(data.prices);
    } catch (error) {
      console.log(error);
    }
  };

  const chartDays = [
    {
      label: "24 Hours",
      value: 24,
    },
    {
      label: "12 Hours",
      value: 12,
    },
    {
      label: "4 Hours",
      value: 4,
    },
    {
      label: "1 Hours",
      value: 1,
    },
  ];

  return (
    <>
      <div className="container-fulid info2">
        {/* <div className="text-end">
       <img src={require("../../images/layout/jet.png")} alt="" width="500" />
       </div> */}
        <div className="d-flex justify-content-center">
          <div className="col-md-12">
            <div className="block-text text-center mt-150">
              <div className="heading">
                <span
                  class="icon-milkshake"
                  style={{ fontSize: "30px" }}
                ></span>{" "}
                Milkshake Price ( Past {days} Days ) in USD
              </div>
            </div>
            <div className="row justify-content-center mb-29">
              <div className="col-md-6 card  pb-20" style={{background:"transparent"}}>
                {!historicData | (flag === false) ? (
                  <ProgressBar />
                ) : (
                  <>
                    <Line
                      data={{
                        labels: historicData.map((coin) => {
                          let date = new Date(coin[0]);
                          let time =
                            date.getHours() > 12
                              ? `${
                                  date.getHours() - 12
                                }:${date.getMinutes()} PM`
                              : `${date.getHours()}:${date.getMinutes()} AM`;
                          return days === 1 ? time : date.toLocaleDateString();
                        }),

                        datasets: [
                          {
                            data: historicData.map((coin) => coin[1]),
                            label: `Price ( Past ${days} Days ) in usd`,
                            borderColor: "#fff",
                          },
                        ],
                      }}
                      options={{
                        elements: {
                          point: {
                            radius: 1,
                          },
                        },
                      }}
                    />
                  </>
                )}
                <div
                  style={{
                    display: "flex",
                    marginTop: 20,
                    justifyContent: "space-around",
                    width: "100%",
                  }}
                >
                  {chartDays.map((day) => (
                    <button
                      key={day.value}
                      onClick={() => {
                        setDays(day.value);
                        setFlag(false);
                      }}
                      className="btn-connect"
                    >
                      {day.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Info;
