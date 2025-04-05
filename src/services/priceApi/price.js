import GoldPriceTemplate from "./api";


const GoldPriceService = {
    async GoldPriceByTime(date) {
        const response = await GoldPriceTemplate.get(`/goldPrice/${date}`);
        return response.data;
    },
};


export default GoldPriceService
