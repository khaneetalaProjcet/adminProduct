import GoldBoxTemplate from "./api";



const GoldBoxService = {
    async BuyGoldBox(item) {
        const response = await GoldBoxTemplate.get(`/transactions/buy?type=${item}`);
        return response.data
    },

    async SubmitGoldboxBuy(info) {
        const body = JSON.stringify({
            'authority': info.authority,
        });
        const response = await GoldBoxTemplate.put(`/transactions/${info.id}`, body);
        return response.data
    },

    async SellGoldBox(item) {
        const response = await GoldBoxTemplate.get(`/transactions/sell?type=${item}`);
        return response.data
    },
}


export default GoldBoxService
