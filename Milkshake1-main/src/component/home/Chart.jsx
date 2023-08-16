import axios from "axios";
import React,{ useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { ProgressBar } from "react-bootstrap";
// import SelectButton from "./SelectButton";

const HomeChart = () => {
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
      value: 1,
    },
    {
      label: "30 Days",
      value: 30,
    },
    {
      label: "3 Months",
      value: 90,
    },
    {
      label: "1 Year",
      value: 365,
    },
  ];

  return (
    <section className="mt-37 mb-37">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="block-text text-center pb-20">
              <div className="heading"><span class="icon-milkshake" style={{fontSize:"30px"}}></span> Milkshake Price ( Past  {days} Days ) in USD</div>
            </div>
            <div className="row justify-content-center mb-29">
              <div className="col-md-8 card  pb-20">
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
    </section>
  );
};

export default HomeChart;
