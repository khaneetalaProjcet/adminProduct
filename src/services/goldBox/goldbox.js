import DashboardTemplate from "../dashboard/api";
import ServerTemplate from "../server/api";
import QueryTemplate from "../template/api";
import VerifyTemplate from "../verify/api";
import GoldBoxTemplate from "./api";



const GoldBoxService = {
    async CartToCartList(item) {
        const response = await QueryTemplate.get(`/buy/transport/${item}`);
        return response.data
    },

    async BuyGoldBox(item) {
        const response = await QueryTemplate.get(`/admin/transactions/buy?type=${item}`);
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
        const response = await QueryTemplate.get(`/admin/transactions/sell?type=${item}`);
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
        const response = await DashboardTemplate.post(`/call/initbuy`, body);
        return response.data
    },

    async SubmitInvoiceTradeBuy(item) {
        const body = JSON.stringify(item);
        const response = await DashboardTemplate.post(`/call/create`, body);
        return response.data
    },

    async CreateInvoiceTradeSell(item) {
        const body = JSON.stringify(item);
        const response = await DashboardTemplate.post(`/call/initsell`, body);
        return response.data
    },

    async SubmitInvoiceTradeSell(item) {
        const body = JSON.stringify(item);
        const response = await DashboardTemplate.post(`/callsell/create`, body);
        return response.data
    },

    async payInfo(item) {
        const response = await DashboardTemplate.put(`/admin/transAction/${item}`);
        return response.data
    },

    async inquiryGoldBoxSender(item) {
        const response = await ServerTemplate.get(`/old/inquiry/${item}`);
        return response.data
    },

    async inquiryGoldBoxReciever(item) {
        const response = await QueryTemplate.get(`/admin/inquiry/${item}`);
        return response.data
    },

    async confirmTransfer(item) {
        const body = JSON.stringify(item);
        console.log(body)
        const response = await ServerTemplate.post(`/old/transmission`, body);
        return response.data
    },

}


export default GoldBoxService
