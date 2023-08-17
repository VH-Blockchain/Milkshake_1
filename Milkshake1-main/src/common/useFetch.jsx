import { useState, useEffect } from "react";
import axios from "axios";


function useFetch(add) {
  const [milk, setMilk] = useState([]);



  useEffect(() => {
    fetchMilk(add);
  }, []);

  const fetchMilk = async (add) => {
    try {
      let { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/binance-smart-chain/contract/${add}`
      );
      setMilk(data);
    } catch (error) {
      console.log(error); 
    }
  };
  return milk;
}

export default useFetch;

