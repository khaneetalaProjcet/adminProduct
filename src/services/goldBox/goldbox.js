import DashboardTemplate from "../dashboard/api";
import VerifyTemplate from "../verify/api";
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

    async AuthNumberTradeGoldbox(item) {
        const body = JSON.stringify({
            'phoneNumber': item
        });
        const response = await VerifyTemplate.post(`/old/identity/status`, body);
        return response.data
    },

    async AuthIdentityOldUser(item) {
        const body = JSON.stringify({
            'phoneNumber': item.phoneNumber,
            'birthDate': item.birthDate,
            'nationalCode': item.nationalCode,
        });
        const response = await VerifyTemplate.post(`/old/approve/${item.id}`, body);
        return response.data
    },

    async AuthIdentityNewUser(item) {
        const body = JSON.stringify({
            'phoneNumber': item.phoneNumber,
            'birthDate': item.birthDate,
            'nationalCode': item.nationalCode,
        });
        const response = await VerifyTemplate.post(`/old/approvenew`, body);
        return response.data
    },

    async CreateInvoiceTradeBuy(item) {
        const body = JSON.stringify(item);
        const response = await DashboardTemplate.post(`/call/create`, body);
        return response.data
    },


}


export default GoldBoxService
