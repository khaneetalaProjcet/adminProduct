import QueryTemplate from "../template/api";
import UserTemplate from "../user/api";


const GoldPriceService = {
    async GoldPriceByTime(date) {
        const response = await QueryTemplate.get(`/goldPrice/${date}`);
        return response.data;
    },

    async PriceStatus() {
        const response = await QueryTemplate.get(`/goldPrice/handle`);
        return response.data;
    },

    async SetPriceStatus(price) {
        const body = JSON.stringify({
            'price': price,
        });
        const response = await UserTemplate.post(`/goldPrice/set`, body);
        return response.data;
    },

    async switchPriceStatus() {
        const response = await UserTemplate.post(`/goldPrice/down`);
        return response.data;
    },

    async GetGoldPrice() {
        const response = await QueryTemplate.get(`/admin/goldPrice`);
        return response.data;
    },

};


export default GoldPriceService
