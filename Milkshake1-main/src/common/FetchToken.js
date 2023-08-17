import axios from "axios";

function FetchToken(token) {
    const fetchBit = async () => {
        const data = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${token}`
        );
        return data
    };
    return fetchBit();
}

export default FetchToken;
