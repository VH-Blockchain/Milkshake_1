import { useState, useEffect } from "react";
import axios from "axios";


function useFetchAll(token,price) {
  const [milk, setMilk] = useState([]);

  // console.log(price,"----------------------------------")

  useEffect(() => {
    fetchMilk();
  }, []);

  const fetchMilk = async () => {
    try {
      let { data } = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=${price}`
      );
      setMilk(data);
    } catch (error) {
      console.log(error); 
    }
  };
  return milk;
}

export default useFetchAll;

