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
        const response = await InPersonTemplate.post(`/inperson/otp/verify`, body);
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
        const response = await InPersonTemplate.post(`/inperson/buy/create`, body);
        return response.data;
    },

    async CreateSell(item) {
        const body = JSON.stringify(item);
        const response = await InPersonTemplate.post(`/inperson/sell/create`, body);
        return response.data
    },

    async InPersonBuy(item) {
        const response = await InPersonTemplate.get(`/inperson/buy/all/${item}`);
        return response.data
    },

    async InPersonSell(item) {
        const response = await InPersonTemplate.get(`/inperson/sell/all/${item}`);
        return response.data
    },

    async SubmitInPersonBuy(item) {
        const body = JSON.stringify({
            status: item.status,
            id: item.id,
            description: item.description
        });
        const response = await InPersonTemplate.post(`/inperson/transaction/changestatus`, body);
        return response.data
    },

    async SubmitConvertTrade(detail) {
        const body = JSON.stringify(detail);
        const response = await InPersonTemplate.post(`/inperson/convert/create`, body);
        return response.data
    },

    async SubmitPayment(paymentForm,id) {
        const body = JSON.stringify(paymentForm);
        const response = await InPersonTemplate.post(`/inperson/convert/payment/${id}`, body);
        return response.data
    },

    async SubmitCounterPayment(paymentForm) {
        const body = JSON.stringify(paymentForm);
        const response = await InPersonTemplate.post(`/inperson/convert/sell`, body);
        return response.data
    },

}


export default InPersonService
