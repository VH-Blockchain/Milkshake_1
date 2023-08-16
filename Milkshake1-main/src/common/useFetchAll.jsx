import { useState, useEffect } from "react";
import axios from "axios";


function useFetchAll() {
  const [milk, setMilk] = useState([]);

  useEffect(() => {
    fetchMilk();
  }, []);

  const fetchMilk = async () => {
    try {
      let { data } = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=bnb"
      );
      setMilk(data);
    } catch (error) {
      console.log(error); 
    }
  };
  return milk;
}

export default useFetchAll;

