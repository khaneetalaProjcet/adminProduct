import InPersonTemplate from "./api";

const InPersonService = {
    async sendOtp(item) {
        const body = JSON.stringify({
            'phoneNumber': item,
        });
        const response = await InPersonTemplate.post(`/otp`, body);
        return response.data
    },

    async submitOtp(item) {
        const body = JSON.stringify(item);
        const response = await InPersonTemplate.post(`/otp/verify`, body);
        return response.data
    },

    async identityUser(item) {
        const body = JSON.stringify({
            phoneNumber: item.phoneNumber,
            nationalCode: item.nationalCode,
            birthDate: item.birthDate,
            id: item.id,
        });
        const response = await InPersonTemplate.post(`/user/identity`, body);
        return response.data
    },


    async CreateBuy(item) {
        const body = JSON.stringify(item);
        const response = await InPersonTemplate.post(`/buy/create`, body);
        return response.data;
    },


    async CreateSell(item) {
        const body = JSON.stringify(item);
        const response = await InPersonTemplate.post(`/sell/create`, body);
        return response.data
    },

    async InPersonBuy(item) {
        const response = await InPersonTemplate.get(`/buy/all/${item}`);
        return response.data
    },

    async InPersonSell(item) {
        const response = await InPersonTemplate.get(`/sell/all/${item}`);
        return response.data
    },

    async SubmitInPersonBuy(item) {
        const body = JSON.stringify({
            status: item.status,
            id: item.id,
            description: item.description
        });
        const response = await InPersonTemplate.post(`/transaction/changestatus`, body);
        return response.data
    },

}


export default InPersonService
