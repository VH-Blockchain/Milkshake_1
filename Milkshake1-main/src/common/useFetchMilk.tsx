import { useState, useEffect } from "react";
import axios from "axios";


function useFetch() {
  const [milk, setMilk] = useState([]);

  useEffect(() => {
    fetchMilk();
  }, []);

  const fetchMilk = async () => {
    try {
      const { data } = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=milkshakeswap&order=market_cap_desc&per_page=10&page=1&sparkline=false"
      );
      setMilk(data[0]);
    } catch (error) {
      console.log(error); 
    }
  };
  return milk;
}

export default useFetch;

