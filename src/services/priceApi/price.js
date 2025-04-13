import QueryTemplate from "../template/api";
import GoldPriceTemplate from "./api";


const GoldPriceService = {
    async GoldPriceByTime(date) {
        const response = await QueryTemplate.get(`/goldPrice/${date}`);
        return response.data;
    },
};


export default GoldPriceService
